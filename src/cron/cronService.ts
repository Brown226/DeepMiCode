/** Cron task CRUD service - persists to JSON file */

import { randomBytes } from "node:crypto";
import { mkdir, readFile, rename, unlink, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import type { CronTask, CronTasksFile, TaskRun, TaskRunsFile } from "./types.js";

const TASKS_FILE = "scheduled_tasks.json";
const RUNS_FILE = "scheduled_tasks_log.json";
const MAX_RUNS_PER_TASK = 100;

export class CronService {
  private tasksPath: string;
  private runsPath: string;
  private tasks: CronTask[] = [];
  private runs: TaskRun[] = [];

  constructor(dataDir: string) {
    this.tasksPath = join(dataDir, TASKS_FILE);
    this.runsPath = join(dataDir, RUNS_FILE);
  }

  async init(): Promise<void> {
    await mkdir(dirname(this.tasksPath), { recursive: true });
    await this.loadTasks();
    await this.loadRuns();
  }

  private async loadTasks(): Promise<void> {
    try {
      const content = await readFile(this.tasksPath, "utf-8");
      const data: CronTasksFile = JSON.parse(content);
      this.tasks = data.tasks ?? [];
    } catch {
      this.tasks = [];
    }
  }

  private async loadRuns(): Promise<void> {
    try {
      const content = await readFile(this.runsPath, "utf-8");
      const data: TaskRunsFile = JSON.parse(content);
      this.runs = data.runs ?? [];
    } catch {
      this.runs = [];
    }
  }

  private async saveTasks(): Promise<void> {
    const data: CronTasksFile = { tasks: this.tasks };
    const json = JSON.stringify(data, null, 2);
    const tmpPath = `${this.tasksPath}.tmp`;
    await writeFile(tmpPath, json, "utf-8");
    await rename(tmpPath, this.tasksPath);
  }

  private async saveRuns(): Promise<void> {
    // Keep only last MAX_RUNS_PER_TASK runs per task
    const taskRunCounts = new Map<string, number>();
    const filteredRuns: TaskRun[] = [];

    for (const run of [...this.runs].reverse()) {
      const count = taskRunCounts.get(run.taskId) ?? 0;
      if (count < MAX_RUNS_PER_TASK) {
        filteredRuns.unshift(run);
        taskRunCounts.set(run.taskId, count + 1);
      }
    }

    this.runs = filteredRuns;
    const data: TaskRunsFile = { runs: this.runs };
    const json = JSON.stringify(data, null, 2);
    const tmpPath = `${this.runsPath}.tmp`;
    await writeFile(tmpPath, json, "utf-8");
    await rename(tmpPath, this.runsPath);
  }

  private generateId(): string {
    return randomBytes(4).toString("hex");
  }

  async listTasks(): Promise<CronTask[]> {
    return [...this.tasks];
  }

  async getTask(id: string): Promise<CronTask | undefined> {
    return this.tasks.find((t) => t.id === id);
  }

  async createTask(input: Omit<CronTask, "id" | "createdAt" | "enabled">): Promise<CronTask> {
    const task: CronTask = {
      id: this.generateId(),
      name: input.name,
      cron: input.cron,
      prompt: input.prompt,
      recurring: input.recurring,
      enabled: true,
      model: input.model,
      createdAt: new Date().toISOString(),
    };
    this.tasks.push(task);
    await this.saveTasks();
    return task;
  }

  async updateTask(id: string, patch: Partial<CronTask>): Promise<CronTask | null> {
    const idx = this.tasks.findIndex((t) => t.id === id);
    if (idx === -1) return null;

    const existing = this.tasks[idx]!;
    this.tasks[idx] = {
      ...existing,
      ...patch,
      id: existing.id, // prevent id change
      createdAt: existing.createdAt, // prevent createdAt change
    };
    await this.saveTasks();
    return this.tasks[idx]!;
  }

  async deleteTask(id: string): Promise<boolean> {
    const idx = this.tasks.findIndex((t) => t.id === id);
    if (idx === -1) return false;
    this.tasks.splice(idx, 1);
    await this.saveTasks();
    return true;
  }

  async recordFired(id: string): Promise<void> {
    const task = this.tasks.find((t) => t.id === id);
    if (task) {
      task.lastFiredAt = new Date().toISOString();
      await this.saveTasks();
    }
  }

  async addRun(run: TaskRun): Promise<void> {
    this.runs.push(run);
    await this.saveRuns();
  }

  async updateRun(runId: string, patch: Partial<TaskRun>): Promise<void> {
    const idx = this.runs.findIndex((r) => r.runId === runId);
    if (idx !== -1) {
      this.runs[idx] = { ...this.runs[idx]!, ...patch };
      await this.saveRuns();
    }
  }

  async getTaskRuns(taskId?: string): Promise<TaskRun[]> {
    if (taskId) {
      return this.runs.filter((r) => r.taskId === taskId);
    }
    return [...this.runs];
  }

  async cleanupStaleRuns(timeoutMs: number): Promise<void> {
    const now = Date.now();
    for (const run of this.runs) {
      if (run.status === "running") {
        const started = new Date(run.startedAt).getTime();
        if (now - started > timeoutMs + 60000) {
          run.status = "failed";
          run.error = "Task timed out";
          run.finishedAt = new Date().toISOString();
        }
      }
    }
    await this.saveRuns();
  }
}
