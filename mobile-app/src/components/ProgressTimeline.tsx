import { Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { weeklyTimeline, type DayStatus } from '@/lib/mock-data';
import { cn } from '@/lib/utils';

interface ProgressTimelineProps {
  /** Today's streak — shown in the section header. */
  streak: number;
}

const STATUS_META: Record<DayStatus, { label: string; dot: string }> = {
  completed: { label: 'Completed', dot: 'bg-gradient-to-br from-primary to-accent' },
  today: { label: 'Today', dot: 'border-2 border-primary bg-bg-elevated' },
  missed: { label: 'Missed', dot: 'bg-border-muted' },
};

/** Last 7 days of the challenge with completed / today / missed statuses. */
export default function ProgressTimeline({ streak }: ProgressTimelineProps) {
  const now = new Date();
  const days = weeklyTimeline.map((entry, i) => {
    const date = new Date(now.getFullYear(), now.getMonth(), now.getDate() - (6 - i));
    return { ...entry, dayNumber: date.getDate() };
  });

  return (
    <section aria-label="Last 7 days of progress">
      <div className="mb-3 flex items-center justify-between px-1">
        <h2 className="flex items-center gap-1.5 text-sm font-semibold text-foreground">
          <span className="h-3 w-1 rounded-full bg-primary" aria-hidden="true" />
          This week
        </h2>
        <span className="text-xs font-semibold text-warning">🔥 {streak} day streak</span>
      </div>

      <div className="rounded-2xl border border-border bg-surface p-4 shadow-[0_4px_24px_rgba(0,0,0,0.2)]">
        <div className="grid grid-cols-7 gap-1">
          {days.map((day, i) => {
            const meta = STATUS_META[day.status];
            const isToday = day.status === 'today';
            return (
              <motion.div
                key={`${day.day}-${i}`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.05 + i * 0.05 }}
                className="flex flex-col items-center gap-1.5"
              >
                <span className="text-[10px] font-semibold text-subtle">{day.day}</span>
                <div
                  className={cn(
                    'grid h-8 w-8 place-items-center rounded-full',
                    day.status === 'completed'
                      ? 'bg-gradient-to-br from-primary to-accent text-white shadow-[0_0_12px_rgba(255,90,0,0.18)]'
                      : meta.dot
                  )}
                  aria-hidden="true"
                >
                  {day.status === 'completed' ? (
                    <Check className="h-4 w-4 stroke-[3]" />
                  ) : isToday ? (
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
                      <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-primary" />
                    </span>
                  ) : (
                    <span className="h-1.5 w-1.5 rounded-full bg-subtle/40" />
                  )}
                </div>
                <span
                  className={cn(
                    'text-[10px] font-medium',
                    isToday ? 'font-bold text-accent' : day.status === 'completed' ? 'text-muted' : 'text-subtle/50'
                  )}
                >
                  {isToday ? 'Today' : day.dayNumber}
                </span>
              </motion.div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="mt-4 flex items-center justify-center gap-4 border-t border-border pt-3 text-[10px] text-subtle">
          {(Object.keys(STATUS_META) as DayStatus[]).map((status) => (
            <span key={status} className="flex items-center gap-1.5">
              <span
                className={cn(
                  'h-2 w-2 rounded-full',
                  status === 'completed' ? 'bg-gradient-to-br from-primary to-accent' : status === 'today' ? 'border border-primary bg-transparent' : 'bg-border-muted'
                )}
                aria-hidden="true"
              />
              {STATUS_META[status].label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
