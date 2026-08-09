import { STORAGE_KEYS, storageGet, storageSet } from './storage';
import type { ResumeOption } from './mock-data';

/**
 * localStorage helpers for the missed-day resume flow.
 * Kept tiny and defensive — mirrors the storage.ts pattern (no backend, no account).
 */

/** Whether "Remind me tomorrow evening" is on. Defaults to off. */
export function getReminderPreference(): boolean {
  return storageGet<boolean>(STORAGE_KEYS.resumeReminder) ?? false;
}

export function setReminderPreference(enabled: boolean): void {
  storageSet(STORAGE_KEYS.resumeReminder, enabled);
}

/** Last chosen resume option ('continue' | 'redo'). Defaults to 'continue'. */
export function getResumeChoice(): ResumeOption {
  return storageGet<ResumeOption>(STORAGE_KEYS.resumeChoice) ?? 'continue';
}

export function setResumeChoice(choice: ResumeOption): void {
  storageSet(STORAGE_KEYS.resumeChoice, choice);
}
