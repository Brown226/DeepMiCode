/** Cron scheduler - runs tasks based on cron expressions */

import { randomBytes } from "node:crypto";
import { spawn } from "node:child_process";
import { cronMatches } from "./cronParser.js";
import type { CronService } from "./cronService.js";
import type { CronTask, TaskRun } from "./types.js";

const TASK_TIMEOUT_MS = 10 * 60 * 1000; // 10 minutes
const CHECK_INTERVAL_MS = 60 * 1000; // 1 minute

export class CronScheduler {
  private service: CronService;
  private timer: ReturnType<typeof setInterval> | null = null;
  private runningTasks = new Map<string, string>(); // taskId -> runId
  private lastFiredMinuteKey = new Map<string, string>(); // taskId -> minuteKey
  private executeTaskFn?: (task: CronTask) => Promise<void>;

  constructor(service: CronService) {
    this.service = service;
  }

  /** Set custom task execution function (for testing or custom execution) */
  setExecutor(fn: (task: CronTask) => Promise<void>): void {
    this.executeTaskFn = fn;
  }

  start(): void {
    if (this.timer) return;

    // Clean up stale runs on startup
    this.service.cleanupStaleRuns(TASK_TIMEOUT_MS).catch(console.error);

    // Check immediately, then every minute
    this.tick();
    this.timer = setInterval(() => this.tick(), CHECK_INTERVAL_MS);
  }

  stop(): void {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  private async tick(): Promise<void> {
    try {
      const tasks = await this.service.listTasks();
      const now = new Date();
      const currentMinuteKey = `${now.getFullYear()}-${now.getMonth()}-${now.getDate()}-${now.getHours()}-${now.getMinutes()}`;

      for (const task of tasks) {
        if (!task.enabled) continue;

        // Skip if already running
        if (this.runningTasks.has(task.id)) continue;

        // Skip if already fired this minute (in-memory check)
        if (this.lastFiredMinuteKey.get(task.id) === currentMinuteKey) continue;

        // Skip if already fired this minute (file-based check for cross-process dedup)
        if (task.lastFiredAt) {
          const lastFired = new Date(task.lastFiredAt);
          const lastMinuteKey = `${lastFired.getFullYear()}-${lastFired.getMonth()}-${lastFired.getDate()}-${lastFired.getHours()}-${lastFired.getMinutes()}`;
          if (lastMinuteKey === currentMinuteKey) continue;
        }

        // Check cron match
        if (cronMatches(task.cron, now)) {
          this.lastFiredMinuteKey.set(task.id, currentMinuteKey);
          this.executeTask(task).catch(console.error);
        }
      }
    } catch (err) {
      console.error("[CronScheduler] tick error:", err);
    }
  }

  private async executeTask(task: CronTask): Promise<void> {
    const runId = randomBytes(4).toString("hex");
    this.runningTasks.set(task.id, runId);

    const run: TaskRun = {
      runId,
      taskId: task.id,
      status: "running",
      startedAt: new Date().toISOString(),
    };

    await this.service.addRun(run);
    await this.service.recordFired(task.id);

    try {
      if (this.executeTaskFn) {
        await this.executeTaskFn(task);
      } else {
        await this.executeTaskDefault(task);
      }

      await this.service.updateRun(runId, {
        status: "completed",
        finishedAt: new Date().toISOString(),
      });
    } catch (err) {
      console.error(`[CronScheduler] task ${task.id} failed:`, err);
      await this.service.updateRun(runId, {
        status: "failed",
        error: String(err),
        finishedAt: new Date().toISOString(),
      });
    } finally {
      this.runningTasks.delete(task.id);

      // Disable non-recurring tasks after execution
      if (!task.recurring) {
        await this.service.updateTask(task.id, { enabled: false });
      }
    }
  }

  private executeTaskDefault(task: CronTask): Promise<void> {
    return new Promise((resolve, reject) => {
      const args = [
        "--print",
        "--verbose",
        "--input-format", "stream-json",
        "--output-format", "stream-json",
      ];

      if (task.model) {
        args.push("--model", task.model);
      }

      // Spawn deepmicode process
      const child = spawn("deepmicode", args, {
        stdio: ["pipe", "pipe", "pipe"],
        env: {
          ...process.env,
          CLAUDE_CODE_ENABLE_TASKS: "1",
        },
      });

      let stdout = "";
      let stderr = "";
      let killed = false;

      const timeout = setTimeout(() => {
        killed = true;
        child.kill("SIGTERM");
        // Force kill after 5 seconds
        setTimeout(() => {
          if (!child.killed) {
            child.kill("SIGKILL");
          }
        }, 5000);
      }, TASK_TIMEOUT_MS);

      child.stdout.on("data", (data: Buffer) => {
        stdout += data.toString();
      });

      child.stderr.on("data", (data: Buffer) => {
        stderr += data.toString();
      });

      child.on("close", (code) => {
        clearTimeout(timeout);

        if (killed) {
          reject(new Error("Task timed out"));
          return;
        }

        // Try to extract assistant text from stream-json output
        const result = this.extractAssistantText(stdout);
        if (result) {
          console.log(`[CronScheduler] task ${task.id} completed with result`);
        }

        if (code === 0) {
          resolve();
        } else {
          reject(new Error(`Process exited with code ${code}: ${stderr.slice(0, 500)}`));
        }
      });

      child.on("error", (err) => {
        clearTimeout(timeout);
        reject(err);
      });

      // Send prompt via stdin in stream-json format
      const inputMessage = JSON.stringify({
        type: "user",
        message: task.prompt,
      }) + "\n";

      child.stdin.write(inputMessage);
      child.stdin.end();
    });
  }

  private extractAssistantText(output: string): string | null {
    const lines = output.split("\n");
    const texts: string[] = [];

    for (const line of lines) {
      try {
        const msg = JSON.parse(line);
        if (msg.type === "assistant" && msg.message?.content) {
          for (const block of msg.message.content) {
            if (block.type === "text") {
              texts.push(block.text);
            }
          }
        }
      } catch {
        // Ignore parse errors
      }
    }

    return texts.length > 0 ? texts.join("\n") : null;
  }

  /** Check if a task is currently running */
  isRunning(taskId: string): boolean {
    return this.runningTasks.has(taskId);
  }

  /** Get the run ID for a running task */
  getRunningRunId(taskId: string): string | undefined {
    return this.runningTasks.get(taskId);
  }

  /** Execute a task immediately (for manual trigger) */
  async executeTaskNow(task: CronTask): Promise<void> {
    if (this.runningTasks.has(task.id)) {
      console.log(`[CronScheduler] task ${task.id} already running`);
      return;
    }
    await this.executeTask(task);
  }
}
