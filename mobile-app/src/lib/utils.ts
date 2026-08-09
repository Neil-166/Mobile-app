import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatTime(date: Date): string {
  return date.toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-IN', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });
}

export function getGreeting(hour: number): string {
  if (hour < 5) return 'Still up? 🌙';
  if (hour < 12) return 'Good morning ☀️';
  if (hour < 17) return 'Good afternoon 👋';
  if (hour < 21) return 'Good evening 🌆';
  return 'Late night grind 🌙';
}

export function isAfterTenPM(): boolean {
  const hour = new Date().getHours();
  return hour >= 22;
}

export function getMidnightCountdown(): string {
  const now = new Date();
  const midnight = new Date(now);
  midnight.setHours(23, 59, 59, 999);
  const diff = midnight.getTime() - now.getTime();
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  if (hours > 0) return `${hours}h ${minutes}m`;
  if (minutes > 0) return `${minutes}m ${seconds}s`;
  return `${seconds}s`;
}

export function getProgressPercent(current: number, total: number): number {
  return Math.round((current / total) * 100);
}

/** Minutes remaining until 10 PM tonight (0 if already past). */
export function getMinutesUntilTenPM(date: Date): number {
  const tenPM = new Date(date);
  tenPM.setHours(22, 0, 0, 0);
  return Math.max(0, Math.round((tenPM.getTime() - date.getTime()) / 60000));
}

/** Progress (0–1) through the "rescue window" — the day leading up to 10 PM. */
export function getTenPMProgress(date: Date): number {
  const minutesIntoDay = date.getHours() * 60 + date.getMinutes();
  const windowMinutes = 22 * 60; // midnight → 10 PM
  return Math.min(1, Math.max(0, minutesIntoDay / windowMinutes));
}

/** Seconds remaining until midnight tonight (end of day). */
export function getSecondsUntilMidnight(date: Date): number {
  const midnight = new Date(date);
  midnight.setHours(23, 59, 59, 999);
  return Math.max(0, Math.round((midnight.getTime() - date.getTime()) / 1000));
}

/** Human "Xm ago" style relative time from an ISO/date input. */
export function getRelativeTime(input: string | Date): string {
  const then = typeof input === 'string' ? new Date(input) : input;
  const diffSeconds = Math.max(0, Math.floor((Date.now() - then.getTime()) / 1000));
  if (diffSeconds < 60) return 'just now';
  const minutes = Math.floor(diffSeconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

export type RescuePhase = 'daytime' | 'late-night';

/** Whether we are in the post-10 PM "Midnight Rescue" window. */
export function getRescuePhase(date: Date): RescuePhase {
  return date.getHours() >= 22 ? 'late-night' : 'daytime';
}

/** Muted, palette-harmonious avatar colors (AA-safe on dark surfaces). */
export function getAvatarColor(initials: string): string {
  const colors = [
    '#F59E0B', '#F97316', '#38B46A', '#E7A53A', '#E35D6A',
    '#F97316', '#3DA86A', '#F0B05A', '#D04F5D', '#4BA898',
  ];
  const index = initials.charCodeAt(0) % colors.length;
  return colors[index];
}

export function copyToClipboard(text: string): Promise<void> {
  if (navigator.clipboard) {
    return navigator.clipboard.writeText(text);
  }
  return new Promise((resolve) => {
    const el = document.createElement('textarea');
    el.value = text;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    resolve();
  });
}

export function getDayOfWeek(date: Date): string {
  return date.toLocaleDateString('en-IN', { weekday: 'short' });
}

export function getHeatLevel(completed: boolean, submittedAt: string | null): number {
  if (!completed || !submittedAt) return 0;
  const hour = parseInt(submittedAt.split(':')[0]);
  if (hour < 20) return 5; // early
  if (hour < 21) return 4;
  if (hour < 22) return 3;
  if (hour < 23) return 2;
  return 1; // late night
}

export function pluralize(count: number, word: string): string {
  return count === 1 ? `${count} ${word}` : `${count} ${word}s`;
}
