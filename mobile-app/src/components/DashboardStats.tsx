import { Link } from 'react-router-dom';
import { CalendarClock, CheckCircle2, Flame, TrendingUp, Trophy } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface DashboardStatsProps {
  streak: number;
  currentDay: number;
  /** 0–100 overall completion */
  percent: number;
  /** percentile standing, e.g. 18 → "Top 18%"; omit for brand-new students */
  standing?: number;
  todayTitle: string;
  todayTime: string;
  todayHref: string;
  todayDone?: boolean;
}

interface CompactStat {
  id: string;
  label: string;
  value: string;
  sub: string;
  icon: React.ElementType;
  color: string;
  bar?: number;
  delay?: number;
}

/**
 * The five cards a student sees before the fold:
 * streak, day progress, completion %, standing, and today's task.
 */
export default function DashboardStats({
  streak,
  currentDay,
  percent,
  standing,
  todayTitle,
  todayTime,
  todayHref,
  todayDone = false,
}: DashboardStatsProps) {
  const stats: CompactStat[] = [
    {
      id: 'streak',
      label: 'Current streak',
      value: `${streak} days`,
      sub: streak >= 7 ? 'On fire — keep it alive' : 'Momentum builds daily',
      icon: Flame,
      color: '#ff5a00',
      delay: 0,
    },
    {
      id: 'day',
      label: 'Day progress',
      value: `${currentDay}/60`,
      sub: `${Math.round(percent)}% through the challenge`,
      icon: TrendingUp,
      color: '#F97316',
      bar: percent,
      delay: 0.04,
    },
    {
      id: 'complete',
      label: 'Completion',
      value: `${percent}%`,
      sub: 'Overall progress',
      icon: CheckCircle2,
      color: '#22C55E',
      bar: percent,
      delay: 0.08,
    },
    {
      id: 'standing',
      label: 'Standing',
      value: standing ? `Top ${standing}%` : 'New',
      sub: standing ? 'Among all students' : 'Rank unlocks after Day 1',
      icon: Trophy,
      color: '#8B5CF6',
      delay: 0.12,
    },
  ];

  return (
    <section aria-label="Your progress at a glance" className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: stat.delay, ease: 'easeOut' }}
              className="relative overflow-hidden rounded-2xl border border-border bg-surface p-3.5 shadow-[0_4px_24px_rgba(0,0,0,0.2)]"
            >
              <div
                className="pointer-events-none absolute -right-7 -top-7 h-20 w-20 rounded-full"
                style={{ background: `radial-gradient(circle, ${stat.color}12 0%, transparent 70%)` }}
                aria-hidden="true"
              />
              <div
                className="relative mb-2.5 grid h-9 w-9 place-items-center rounded-xl"
                style={{ background: `${stat.color}1a` }}
              >
                <Icon className={cn('h-4.5 w-4.5', stat.id === 'streak' && 'flame-pulse')} style={{ color: stat.color }} />
              </div>
              <p className="relative text-[20px] font-extrabold leading-none tracking-tight text-foreground">{stat.value}</p>
              <p className="relative mt-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-subtle">{stat.label}</p>
              <p className="relative mt-0.5 text-[11px] leading-snug text-subtle/80">{stat.sub}</p>
              {typeof stat.bar === 'number' && (
                <div className="relative mt-2 h-1 w-full overflow-hidden rounded-full bg-white/8" aria-hidden="true">
                  <div className="h-full rounded-full" style={{ width: `${stat.bar}%`, background: stat.color }} />
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Today's task — the anchor card */}
      <Link to={todayHref} className="block">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.16, ease: 'easeOut' }}
          className="relative overflow-hidden rounded-2xl border border-primary/25 bg-surface p-4 shadow-[0_4px_24px_rgba(0,0,0,0.2)] transition-colors hover:border-primary/45"
        >
          <div
            className="pointer-events-none absolute -right-10 -top-12 h-28 w-28 rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(255,90,0,0.12) 0%, transparent 70%)' }}
            aria-hidden="true"
          />
          <div className="relative flex items-start gap-3">
            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/15">
              <CalendarClock className="h-5 w-5 text-accent" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-accent">
                {todayDone ? 'Day complete' : 'Today’s task'}
              </p>
              <h3 className="mt-0.5 text-[15px] font-bold leading-snug text-foreground">{todayTitle}</h3>
              <p className="mt-1 text-[11px] text-subtle">{todayTime} · Day {currentDay}</p>
            </div>
            <span
              className={cn(
                'shrink-0 rounded-full px-2.5 py-1 text-[10px] font-bold',
                todayDone ? 'bg-success/15 text-success' : 'bg-primary/15 text-accent'
              )}
            >
              {todayDone ? 'Done ✓' : 'Continue →'}
            </span>
          </div>
        </motion.div>
      </Link>
    </section>
  );
}
