/** Cron expression parser - supports standard 5-field format */

export interface CronFields {
  minute: string;
  hour: string;
  dayOfMonth: string;
  month: string;
  dayOfWeek: string;
}

export function parseCron(expression: string): CronFields | null {
  const parts = expression.trim().split(/\s+/);
  if (parts.length !== 5) return null;

  return {
    minute: parts[0],
    hour: parts[1],
    dayOfMonth: parts[2],
    month: parts[3],
    dayOfWeek: parts[4],
  };
}

function fieldMatches(field: string, value: number): boolean {
  // * matches any value
  if (field === "*") return true;

  // Handle comma-separated list (e.g., "1,3,5")
  if (field.includes(",")) {
    return field.split(",").some((part) => fieldMatches(part.trim(), value));
  }

  // Handle range with step (e.g., "1-10/3")
  if (field.includes("/")) {
    const [range, stepStr] = field.split("/");
    const step = Number.parseInt(stepStr, 10);
    if (!Number.isFinite(step) || step <= 0) return false;

    if (range === "*") {
      return value % step === 0;
    }

    if (range.includes("-")) {
      const [startStr, endStr] = range.split("-");
      const start = Number.parseInt(startStr, 10);
      const end = Number.parseInt(endStr, 10);
      if (!Number.isFinite(start) || !Number.isFinite(end)) return false;
      return value >= start && value <= end && (value - start) % step === 0;
    }

    const start = Number.parseInt(range, 10);
    if (!Number.isFinite(start)) return false;
    return value >= start && (value - start) % step === 0;
  }

  // Handle range (e.g., "1-5")
  if (field.includes("-")) {
    const [startStr, endStr] = field.split("-");
    const start = Number.parseInt(startStr, 10);
    const end = Number.parseInt(endStr, 10);
    if (!Number.isFinite(start) || !Number.isFinite(end)) return false;
    return value >= start && value <= end;
  }

  // Handle step (e.g., "*/5")
  if (field.startsWith("*/")) {
    const step = Number.parseInt(field.slice(2), 10);
    if (!Number.isFinite(step) || step <= 0) return false;
    return value % step === 0;
  }

  // Exact match
  const target = Number.parseInt(field, 10);
  return Number.isFinite(target) && value === target;
}

export function cronMatches(cron: string, date: Date): boolean {
  const fields = parseCron(cron);
  if (!fields) return false;

  return (
    fieldMatches(fields.minute, date.getMinutes()) &&
    fieldMatches(fields.hour, date.getHours()) &&
    fieldMatches(fields.dayOfMonth, date.getDate()) &&
    fieldMatches(fields.month, date.getMonth() + 1) &&
    fieldMatches(fields.dayOfWeek, date.getDay())
  );
}

export function getNextCronRun(cron: string, from: Date = new Date()): Date | null {
  const fields = parseCron(cron);
  if (!fields) return null;

  // Search for next match within 2 years
  const maxDate = new Date(from.getTime() + 365 * 24 * 60 * 60 * 1000);
  const candidate = new Date(from);
  candidate.setSeconds(0);
  candidate.setMilliseconds(0);

  // Increment by minute until we find a match
  for (let i = 0; i < 525600; i++) {
    candidate.setTime(candidate.getTime() + 60000);
    if (candidate > maxDate) return null;
    if (cronMatches(cron, candidate)) {
      return candidate;
    }
  }

  return null;
}
