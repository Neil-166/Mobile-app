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

export function getAvatarColor(initials: string): string {
  const colors = [
    '#8B5CF6', '#22D3EE', '#22C55E', '#F59E0B', '#EC4899',
    '#6366F1', '#14B8A6', '#EF4444', '#F97316', '#84CC16',
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
