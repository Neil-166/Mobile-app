import { useEffect, useState } from 'react';
import { Flame, MoonStar, CheckCircle2 } from 'lucide-react';
import { formatTime, getMidnightCountdown } from '@/lib/utils';

const HEAT = ['rgba(255,255,255,0.05)', 'rgba(255,90,0,0.25)', 'rgba(255,90,0,0.5)', 'rgba(255,90,0,0.8)', '#ff5a00'];

function MiniContributionGraph() {
  const cells = Array.from({ length: 28 }, (_, i) => {
    const rng = Math.sin(i * 49297 + 233) * 0.5 + 0.5;
    return rng > 0.32 ? Math.min(4, Math.floor(rng * 5)) : 0;
  });
  return (
    <div className="grid grid-cols-7 gap-[3px]" aria-hidden="true">
      {cells.map((level, i) => (
        <span key={i} className="h-[7px] w-[7px] rounded-[2px]" style={{ background: HEAT[level] }} />
      ))}
    </div>
  );
}

/** A live mini-dashboard rendered inside a phone frame for the landing hero. */
export default function HeroPhone() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="relative mx-auto w-[232px]" role="presentation">
      {/* Soft glow behind the phone */}
      <div
        className="absolute -inset-12 rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(255,90,0,0.12) 0%, transparent 70%)' }}
        aria-hidden="true"
      />

      {/* Phone frame */}
      <div className="relative overflow-hidden rounded-[2.6rem] border border-white/10 bg-surface p-2 shadow-[0_20px_40px_-20px_rgba(0,0,0,0.45),0_0_0_1px_rgba(255,255,255,0.04)]">
        {/* Notch */}
        <div className="pointer-events-none absolute left-1/2 top-2.5 z-10 h-[18px] w-24 -translate-x-1/2 rounded-full bg-black" aria-hidden="true" />

        {/* Screen */}
        <div className="relative overflow-hidden rounded-[2.1rem] bg-gradient-to-b from-surface to-bg-elevated px-3 pb-4 pt-8">
          {/* Ambient blob */}
          <div
            className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(255,90,0,0.12) 0%, transparent 70%)' }}
            aria-hidden="true"
          />

          {/* Status row */}
          <div className="relative flex items-center justify-between text-[9px]">
            <span className="font-medium text-muted">Late night grind 🌙</span>
            <span className="font-mono text-subtle">{formatTime(now)}</span>
          </div>

          {/* Day 12 hero */}
          <div className="relative mt-3 flex items-center justify-between rounded-2xl border border-white/8 bg-white/[0.035] p-3">
            <div>
              <p className="text-[8px] font-bold uppercase tracking-[0.14em] text-accent">60-day challenge</p>
              <p className="mt-0.5 text-2xl font-black leading-none text-foreground">12 <span className="text-[10px] font-semibold text-subtle">/ 60</span></p>
              <p className="mt-1 text-[8px] text-subtle">12 days strong</p>
            </div>
            {/* Mini progress ring */}
            <svg className="h-14 w-14 -rotate-90" viewBox="0 0 56 56" aria-hidden="true">
              <circle cx="28" cy="28" r="23" fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="5" />
              <circle
                cx="28" cy="28" r="23" fill="none"
                stroke="url(#hp-grad)" strokeWidth="5" strokeLinecap="round"
                strokeDasharray={2 * Math.PI * 23}
                strokeDashoffset={(1 - 12 / 60) * 2 * Math.PI * 23}
              />
              <defs>
                <linearGradient id="hp-grad" x1="0" y1="0" x2="1" y2="1">
                  <stop stopColor="#ff5a00" />
                  <stop offset="1" stopColor="#F97316" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Streak pill */}
          <div className="relative mt-2 flex items-center gap-2 rounded-full border border-warning/25 bg-warning/10 px-3 py-1.5">
            <Flame className="h-3.5 w-3.5 text-warning flame-pulse" />
            <span className="text-[10px] font-bold text-warning">12-day streak</span>
            <span className="ml-auto flex items-center gap-1 text-[8px] text-muted">
              <MoonStar className="h-2.5 w-2.5 text-subtle" />
              {getMidnightCountdown()} to midnight
            </span>
          </div>

          {/* Contribution graph */}
          <div className="relative mt-2 rounded-xl border border-white/8 bg-white/[0.03] p-2.5">
            <div className="mb-1.5 flex items-center justify-between">
              <span className="text-[8px] font-semibold text-subtle">Last 4 weeks</span>
              <span className="flex items-center gap-1 text-[8px] text-success">
                <CheckCircle2 className="h-2 w-2" /> 22 commits
              </span>
            </div>
            <MiniContributionGraph />
          </div>

          {/* Commit activity */}
          <div className="relative mt-2 flex items-center gap-2 rounded-xl border border-primary/25 bg-primary/10 px-2.5 py-2">
            <span className="grid h-6 w-6 shrink-0 place-items-center rounded-lg bg-primary/25 text-[8px] font-bold text-accent">AS</span>
            <div className="min-w-0">
              <p className="truncate text-[8px] font-semibold text-foreground">pushed portfolio-card.html</p>
              <p className="text-[7px] text-subtle">public commit · 9m ago</p>
            </div>
            <span className="ml-auto shrink-0 rounded bg-success/15 px-1 py-0.5 text-[7px] font-bold text-success">DONE</span>
          </div>
        </div>
      </div>
    </div>
  );
}
