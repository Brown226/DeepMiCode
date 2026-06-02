import { useEffect, useState } from "react";
import { t, useLang } from "../i18n";
import { I } from "../icons";

export type CronTask = {
  id: string;
  name: string;
  cron: string;
  prompt: string;
  recurring: boolean;
  enabled: boolean;
  lastFiredAt?: string;
  createdAt: string;
  model?: string;
};

export type TaskRun = {
  runId: string;
  taskId: string;
  status: "running" | "completed" | "failed";
  startedAt: string;
  finishedAt?: string;
  result?: string;
  error?: string;
};

type ScheduledTasksState = {
  tasks: CronTask[];
  runs: TaskRun[];
  loading: boolean;
  error: string | null;
};

const CRON_PRESETS = [
  { label: "Every minute", value: "* * * * *" },
  { label: "Every 5 minutes", value: "*/5 * * * *" },
  { label: "Every 15 minutes", value: "*/15 * * * *" },
  { label: "Every 30 minutes", value: "*/30 * * * *" },
  { label: "Every hour", value: "0 * * * *" },
  { label: "Every 6 hours", value: "0 */6 * * *" },
  { label: "Every day at midnight", value: "0 0 * * *" },
  { label: "Every day at 9am", value: "0 9 * * *" },
  { label: "Every Monday at 9am", value: "0 9 * * 1" },
];

function parseCronDescription(cron: string): string {
  const parts = cron.split(" ");
  if (parts.length !== 5) return cron;

  const [min, hour, dom, month, dow] = parts;

  if (min === "*" && hour === "*") return "Every minute";
  if (min?.startsWith("*/") && hour === "*") return `Every ${min.slice(2)} minutes`;
  if (min === "0" && hour?.startsWith("*/")) return `Every ${hour.slice(2)} hours`;
  if (min === "0" && hour === "0" && dom === "*" && month === "*" && dow === "*") return "Every day at midnight";
  if (min === "0" && hour && dom === "*" && month === "*" && dow === "*") return `Every day at ${hour}:00`;
  if (min === "0" && hour && dom === "*" && month === "*" && dow === "1") return `Every Monday at ${hour}:00`;

  return cron;
}

function formatTime(dateStr?: string): string {
  if (!dateStr) return "—";
  const d = new Date(dateStr);
  if (!Number.isFinite(d.getTime())) return "—";
  return d.toLocaleString();
}

export function ScheduledTasksModal({ onClose }: { onClose: () => void }) {
  const [state, setState] = useState<ScheduledTasksState>({
    tasks: [],
    runs: [],
    loading: true,
    error: null,
  });
  const [showCreate, setShowCreate] = useState(false);
  const [editingTask, setEditingTask] = useState<CronTask | null>(null);

  useLang();

  useEffect(() => {
    loadTasks();
    const interval = setInterval(loadTasks, 30000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  async function loadTasks() {
    try {
      const resp = await fetch("/api/scheduled-tasks");
      if (resp.ok) {
        const data = await resp.json();
        setState((s) => ({ ...s, tasks: data.tasks ?? [], loading: false, error: null }));
      }
    } catch (err) {
      setState((s) => ({ ...s, loading: false, error: String(err) }));
    }
  }

  async function createTask(task: Omit<CronTask, "id" | "createdAt" | "enabled">) {
    try {
      const resp = await fetch("/api/scheduled-tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(task),
      });
      if (resp.ok) {
        setShowCreate(false);
        await loadTasks();
      }
    } catch (err) {
      setState((s) => ({ ...s, error: String(err) }));
    }
  }

  async function updateTask(id: string, patch: Partial<CronTask>) {
    try {
      const resp = await fetch(`/api/scheduled-tasks/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(patch),
      });
      if (resp.ok) {
        setEditingTask(null);
        await loadTasks();
      }
    } catch (err) {
      setState((s) => ({ ...s, error: String(err) }));
    }
  }

  async function deleteTask(id: string) {
    try {
      const resp = await fetch(`/api/scheduled-tasks/${id}`, { method: "DELETE" });
      if (resp.ok) await loadTasks();
    } catch (err) {
      setState((s) => ({ ...s, error: String(err) }));
    }
  }

  async function toggleTask(id: string, enabled: boolean) {
    await updateTask(id, { enabled });
  }

  async function runTaskNow(id: string) {
    try {
      await fetch(`/api/scheduled-tasks/${id}/run`, { method: "POST" });
    } catch (err) {
      setState((s) => ({ ...s, error: String(err) }));
    }
  }

  return (
    <div className="settings-mask" onClick={onClose}>
      <div className="settings" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 720 }}>
        <nav className="settings-side">
          <div className="sg">{t("scheduledTasks.title")}</div>
          <div className="row" data-active>
            <span className="ico"><I.cpu size={13} /></span>
            <span>{t("scheduledTasks.allTasks")}</span>
          </div>
        </nav>
        <div className="settings-main">
          <div className="settings-head">
            <div>
              <h2>{t("scheduledTasks.title")}</h2>
              <div className="desc">{t("scheduledTasks.desc")}</div>
            </div>
            <span className="grow" />
            <button
              type="button"
              className="btn primary"
              onClick={() => { setEditingTask(null); setShowCreate(true); }}
            >
              <I.plus size={12} /> {t("scheduledTasks.create")}
            </button>
            <button type="button" className="close-btn" onClick={onClose}>
              <I.x size={14} />
            </button>
          </div>
          <div className="settings-body">
            {state.loading ? (
              <div className="muted-card">{t("scheduledTasks.loading")}</div>
            ) : state.error ? (
              <div className="muted-card" style={{ color: "var(--danger)" }}>{state.error}</div>
            ) : state.tasks.length === 0 ? (
              <div className="muted-card">{t("scheduledTasks.empty")}</div>
            ) : (
              <div className="task-list">
                {state.tasks.map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onToggle={(enabled) => toggleTask(task.id, enabled)}
                    onRun={() => runTaskNow(task.id)}
                    onEdit={() => { setEditingTask(task); setShowCreate(true); }}
                    onDelete={() => deleteTask(task.id)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      {showCreate && (
        <TaskCreateModal
          task={editingTask}
          onCreate={createTask}
          onUpdate={(patch) => editingTask && updateTask(editingTask.id, patch)}
          onClose={() => { setShowCreate(false); setEditingTask(null); }}
        />
      )}
    </div>
  );
}

function TaskCard({
  task,
  onToggle,
  onRun,
  onEdit,
  onDelete,
}: {
  task: CronTask;
  onToggle: (enabled: boolean) => void;
  onRun: () => void;
  onEdit: () => void;
  onDelete: () => void;
}) {
  return (
    <div className="task-card">
      <div className="task-header">
        <div className="task-info">
          <div className="task-name">{task.name || t("scheduledTasks.unnamed")}</div>
          <div className="task-cron">
            <span className="ico"><I.cpu size={11} /></span>
            {parseCronDescription(task.cron)}
            <span className="mono">{task.cron}</span>
          </div>
          <div className="task-prompt">{task.prompt}</div>
        </div>
        <div className="task-actions">
          <button
            type="button"
            className="icon-btn"
            title={task.enabled ? t("scheduledTasks.disable") : t("scheduledTasks.enable")}
            onClick={() => onToggle(!task.enabled)}
          >
            {task.enabled ? <I.check size={14} /> : <I.x size={14} />}
          </button>
          <button
            type="button"
            className="icon-btn"
            title={t("scheduledTasks.runNow")}
            onClick={onRun}
          >
            <I.zap size={14} />
          </button>
          <button
            type="button"
            className="icon-btn"
            title={t("scheduledTasks.edit")}
            onClick={onEdit}
          >
            <I.pencil size={14} />
          </button>
          <button
            type="button"
            className="icon-btn"
            title={t("scheduledTasks.delete")}
            onClick={onDelete}
          >
            <I.x size={14} />
          </button>
        </div>
      </div>
      <div className="task-meta">
        <span>{t("scheduledTasks.status")}: {task.enabled ? t("scheduledTasks.enabled") : t("scheduledTasks.disabled")}</span>
        {task.lastFiredAt && <span>{t("scheduledTasks.lastRun")}: {formatTime(task.lastFiredAt)}</span>}
        <span>{t("scheduledTasks.created")}: {formatTime(task.createdAt)}</span>
        {task.model && <span>{t("scheduledTasks.model")}: {task.model}</span>}
      </div>
    </div>
  );
}

function TaskCreateModal({
  task,
  onCreate,
  onUpdate,
  onClose,
}: {
  task: CronTask | null;
  onCreate: (task: Omit<CronTask, "id" | "createdAt" | "enabled">) => void;
  onUpdate: (patch: Partial<CronTask>) => void;
  onClose: () => void;
}) {
  const [name, setName] = useState(task?.name ?? "");
  const [cron, setCron] = useState(task?.cron ?? "0 * * * *");
  const [prompt, setPrompt] = useState(task?.prompt ?? "");
  const [recurring, setRecurring] = useState(task?.recurring ?? true);
  const [model, setModel] = useState(task?.model ?? "");

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const isEdit = !!task;
  const canSubmit = cron.trim() && prompt.trim();

  const submit = () => {
    if (!canSubmit) return;
    const data = {
      name: name.trim() || t("scheduledTasks.unnamed"),
      cron: cron.trim(),
      prompt: prompt.trim(),
      recurring,
      model: model.trim() || undefined,
    };
    if (isEdit) {
      onUpdate(data);
    } else {
      onCreate(data);
    }
  };

  return (
    <div className="settings-mask" onClick={onClose}>
      <div
        className="settings"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: 520, maxHeight: "80vh" }}
      >
        <div className="settings-main">
          <div className="settings-head">
            <h2>{isEdit ? t("scheduledTasks.editTask") : t("scheduledTasks.newTask")}</h2>
            <span className="grow" />
            <button type="button" className="close-btn" onClick={onClose}>
              <I.x size={14} />
            </button>
          </div>
          <div className="settings-body">
            <section className="section">
              <div className="setting-row">
                <div className="l">
                  <div className="n">{t("scheduledTasks.taskName")}</div>
                </div>
                <input
                  className="field"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={t("scheduledTasks.taskNamePlaceholder")}
                />
              </div>

              <div className="setting-row">
                <div className="l">
                  <div className="n">{t("scheduledTasks.schedule")}</div>
                  <div className="h">{t("scheduledTasks.scheduleHint")}</div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 6, width: "100%" }}>
                  <input
                    className="field mono"
                    value={cron}
                    onChange={(e) => setCron(e.target.value)}
                    placeholder="*/5 * * * *"
                  />
                  <div className="seg-ctrl" style={{ flexWrap: "wrap" }}>
                    {CRON_PRESETS.slice(0, 6).map((p) => (
                      <button
                        key={p.value}
                        type="button"
                        data-on={cron === p.value || undefined}
                        onClick={() => setCron(p.value)}
                        style={{ fontSize: 10 }}
                      >
                        {p.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="setting-row">
                <div className="l">
                  <div className="n">{t("scheduledTasks.prompt")}</div>
                  <div className="h">{t("scheduledTasks.promptHint")}</div>
                </div>
                <textarea
                  className="field"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder={t("scheduledTasks.promptPlaceholder")}
                  rows={4}
                  style={{ resize: "vertical", fontFamily: "Geist Mono, monospace", fontSize: 12 }}
                />
              </div>

              <div className="setting-row">
                <div className="l">
                  <div className="n">{t("scheduledTasks.recurring")}</div>
                  <div className="h">{t("scheduledTasks.recurringHint")}</div>
                </div>
                <div className="seg-ctrl">
                  <button
                    type="button"
                    data-on={recurring}
                    onClick={() => setRecurring(true)}
                  >
                    {t("scheduledTasks.yes")}
                  </button>
                  <button
                    type="button"
                    data-on={!recurring}
                    onClick={() => setRecurring(false)}
                  >
                    {t("scheduledTasks.no")}
                  </button>
                </div>
              </div>

              <div className="setting-row">
                <div className="l">
                  <div className="n">{t("scheduledTasks.model")}</div>
                  <div className="h">{t("scheduledTasks.modelHint")}</div>
                </div>
                <input
                  className="field mono"
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  placeholder={t("scheduledTasks.modelPlaceholder")}
                />
              </div>
            </section>

            <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, padding: "16px 0" }}>
              <button type="button" className="btn" onClick={onClose}>
                {t("scheduledTasks.cancel")}
              </button>
              <button
                type="button"
                className="btn primary"
                disabled={!canSubmit}
                onClick={submit}
              >
                {isEdit ? t("scheduledTasks.save") : t("scheduledTasks.create")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
