/** Cron task types */

export interface CronTask {
  id: string;
  name: string;
  cron: string;
  prompt: string;
  recurring: boolean;
  enabled: boolean;
  lastFiredAt?: string;
  createdAt: string;
  model?: string;
}

export interface TaskRun {
  runId: string;
  taskId: string;
  status: "running" | "completed" | "failed";
  startedAt: string;
  finishedAt?: string;
  result?: string;
  error?: string;
}

export interface CronTasksFile {
  tasks: CronTask[];
}

export interface TaskRunsFile {
  runs: TaskRun[];
}
