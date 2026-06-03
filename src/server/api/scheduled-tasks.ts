/** Scheduled tasks API endpoints */

import type { DashboardContext } from "../context.js";
import type { ApiResult } from "../router.js";

export async function handleScheduledTasks(
  method: string,
  pathParts: string[],
  body: string,
  ctx: DashboardContext,
): Promise<ApiResult> {
  const cronService = ctx.cronService;
  if (!cronService) {
    return { status: 503, body: { error: "Cron service not available" } };
  }

  // GET /api/scheduled-tasks
  if (method === "GET" && pathParts.length === 0) {
    const tasks = await cronService.listTasks();
    return { status: 200, body: { tasks } };
  }

  // POST /api/scheduled-tasks
  if (method === "POST" && pathParts.length === 0) {
    try {
      const input = JSON.parse(body);
      const task = await cronService.createTask({
        name: input.name ?? "",
        cron: input.cron,
        prompt: input.prompt,
        recurring: input.recurring ?? true,
        model: input.model,
      });
      return { status: 201, body: { task } };
    } catch (err) {
      return { status: 400, body: { error: String(err) } };
    }
  }

  // GET /api/scheduled-tasks/runs
  if (method === "GET" && pathParts.length === 1 && pathParts[0] === "runs") {
    const runs = await cronService.getTaskRuns();
    return { status: 200, body: { runs } };
  }

  // GET /api/scheduled-tasks/:id
  if (method === "GET" && pathParts.length === 1) {
    const task = await cronService.getTask(pathParts[0]!);
    if (!task) {
      return { status: 404, body: { error: "Task not found" } };
    }
    return { status: 200, body: { task } };
  }

  // PUT /api/scheduled-tasks/:id
  if (method === "PUT" && pathParts.length === 1) {
    try {
      const patch = JSON.parse(body);
      const task = await cronService.updateTask(pathParts[0]!, patch);
      if (!task) {
        return { status: 404, body: { error: "Task not found" } };
      }
      return { status: 200, body: { task } };
    } catch (err) {
      return { status: 400, body: { error: String(err) } };
    }
  }

  // DELETE /api/scheduled-tasks/:id
  if (method === "DELETE" && pathParts.length === 1) {
    const deleted = await cronService.deleteTask(pathParts[0]!);
    if (!deleted) {
      return { status: 404, body: { error: "Task not found" } };
    }
    return { status: 200, body: { ok: true } };
  }

  // POST /api/scheduled-tasks/:id/run
  if (method === "POST" && pathParts.length === 2 && pathParts[1] === "run") {
    const task = await cronService.getTask(pathParts[0]!);
    if (!task) {
      return { status: 404, body: { error: "Task not found" } };
    }

    const scheduler = ctx.cronScheduler;
    if (!scheduler) {
      return { status: 503, body: { error: "Scheduler not available" } };
    }

    // Execute immediately (fire-and-forget)
    scheduler.executeTaskNow(task).catch(console.error);
    return { status: 202, body: { accepted: true } };
  }

  // GET /api/scheduled-tasks/:id/runs
  if (method === "GET" && pathParts.length === 2 && pathParts[1] === "runs") {
    const runs = await cronService.getTaskRuns(pathParts[0]!);
    return { status: 200, body: { runs } };
  }

  return { status: 404, body: { error: "Not found" } };
}
