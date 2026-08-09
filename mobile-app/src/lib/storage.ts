/**
 * Safe localStorage helpers — every read/write is guarded so the app
 * still works when storage is unavailable (private mode, blocked cookies).
 * Used for the demo's temporary persistence only: no backend, no account.
 */

const PREFIX = 'abtalks';

/** Storage keys used across the app. Namespaced to avoid collisions. */
export const STORAGE_KEYS = {
  day12Submission: `${PREFIX}-day-12-submission`,
  day12Checklist: `${PREFIX}-day-12-checklist`,
  dailyReflections: `${PREFIX}-daily-reflections`,
  energyCheckin: `${PREFIX}-energy-checkin`,
  focusSprint: `${PREFIX}-focus-sprint`,
  splashShown: `${PREFIX}-splash-shown`,
} as const;

export function storageGet<T>(key: string): T | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return null;
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

export function storageSet<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage unavailable — the action still works for this session */
  }
}

export function storageRemove(key: string): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.removeItem(key);
  } catch {
    /* noop */
  }
}

/** Local YYYY-MM-DD key for the current day — used to namespace daily data. */
export function todayKey(date: Date = new Date()): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}
