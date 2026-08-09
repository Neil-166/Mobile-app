import { microWin } from '@/components/MicroWin';

/**
 * Submission success toast — spec requires this name.
 * Wraps microWin with a standardized success message.
 */
export function submissionSuccessToast(dayNumber: number, xp: number, streak: number) {
  microWin(`Day ${dayNumber} submitted successfully 🎉 +${xp} XP earned. Streak → ${streak}`, '🎉');
}

export { microWin as SubmissionSuccessToast };
