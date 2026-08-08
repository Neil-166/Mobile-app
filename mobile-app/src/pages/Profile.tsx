import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft, Award, CalendarDays, CheckCircle2, Flame, Medal, Shield, Sparkles, Trophy,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import BottomNav from '@/components/BottomNav';
import StreakBadge from '@/components/StreakBadge';
import { Github, Linkedin } from '@/components/Icons';
import { achievements, currentStudent, recentActivity } from '@/lib/mock-data';
import { formatDate, getAvatarColor } from '@/lib/utils';

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.45, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {children}
    </motion.div>
  );
}

export default function Profile() {
  const navigate = useNavigate();
  const student = currentStudent;
  const earnedCount = achievements.filter((a) => a.earned).length;
  const joined = new Date(student.joinedAt);

  return (
    <div className="min-h-screen bg-bg pb-nav">
      {/* ===== Sticky header ===== */}
      <header className="sticky top-0 z-30 glass safe-top">
        <div className="mx-auto flex max-w-lg items-center gap-3 px-4 py-3">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-border bg-surface text-muted transition-colors hover:bg-white/5 hover:text-foreground"
            aria-label="Go back"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div className="min-w-0 flex-1">
            <h1 className="truncate text-base font-bold text-foreground">Profile</h1>
            <p className="text-[11px] text-subtle">Your public learning record</p>
          </div>
          <StreakBadge streak={student.streak} size="sm" />
        </div>
      </header>

      <main className="relative mx-auto max-w-lg space-y-5 px-5 pt-5">
        {/* ===== Identity hero ===== */}
        <Reveal>
          <section
            aria-label="Profile summary"
            className="relative overflow-hidden rounded-2xl border border-border bg-surface p-6 surface-gradient shadow-[0_8px_24px_rgba(0,0,0,0.18)]"
          >
            <div
              className="pointer-events-none absolute -right-16 -top-16 h-52 w-52 rounded-full"
              style={{ background: 'radial-gradient(circle, rgba(111,126,247,0.12) 0%, transparent 70%)' }}
              aria-hidden="true"
            />
            <div className="relative flex items-center gap-4">
              <div
                className="grid h-20 w-20 shrink-0 place-items-center rounded-2xl text-xl font-black text-white shadow-[0_8px_24px_rgba(0,0,0,0.18)]"
                style={{ background: getAvatarColor(student.avatar) }}
              >
                {student.avatar}
              </div>
              <div className="min-w-0">
                <h2 className="truncate text-xl font-extrabold tracking-tight text-foreground">{student.name}</h2>
                <p className="mt-0.5 text-sm text-muted">{student.college}</p>
                <div className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-primary/25 bg-primary/10 px-2.5 py-0.5">
                  <span className="text-[10px] font-semibold text-accent">{student.track}</span>
                </div>
              </div>
            </div>

            <div className="relative mt-5 flex items-center gap-2 text-xs text-subtle">
              <CalendarDays className="h-3.5 w-3.5" />
              <span>Joined {formatDate(joined)}</span>
              <span className="text-border" aria-hidden="true">•</span>
              <span className="font-semibold text-muted">Day {student.currentDay} of 60</span>
            </div>
          </section>
        </Reveal>

        {/* ===== Stats grid ===== */}
        <Reveal delay={0.05}>
          <section aria-label="Your stats" className="grid grid-cols-4 gap-2">
            {[
              { label: 'Current day', value: student.currentDay, icon: CalendarDays },
              { label: 'Best streak', value: student.streak, icon: Flame },
              { label: 'Total XP', value: student.totalXP, icon: Medal },
              { label: 'Shields', value: student.shieldsRemaining, icon: Shield },
            ].map(({ label, value, icon: Icon }) => (
              <div key={label} className="rounded-2xl border border-border bg-surface p-3 text-center shadow-[0_8px_24px_rgba(0,0,0,0.18)]">
                <Icon className="mx-auto mb-1.5 h-4 w-4 text-primary" />
                <p className="text-base font-extrabold leading-none text-foreground">{value}</p>
                <p className="mt-1 text-[9px] leading-tight text-subtle">{label}</p>
              </div>
            ))}
          </section>
        </Reveal>

        {/* ===== Links ===== */}
        <Reveal delay={0.08}>
          <section aria-label="Social links" className="grid grid-cols-2 gap-2">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-12 items-center gap-2.5 rounded-xl border border-border bg-surface px-3 py-2.5 text-xs font-semibold text-foreground transition-colors hover:border-primary/40"
            >
              <Github className="h-4 w-4 text-muted" />
              <span className="truncate">github.com/{student.githubUsername}</span>
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-12 items-center gap-2.5 rounded-xl border border-border bg-surface px-3 py-2.5 text-xs font-semibold text-foreground transition-colors hover:border-primary/40"
            >
              <Linkedin className="h-4 w-4 text-muted" />
              <span className="truncate">/in/{student.linkedinUsername}</span>
            </a>
          </section>
        </Reveal>

        {/* ===== Achievements ===== */}
        <Reveal delay={0.1}>
          <section>
            <div className="mb-3 flex items-center justify-between px-1">
              <h2 className="flex items-center gap-1.5 text-sm font-semibold text-foreground">
                <Trophy className="h-4 w-4 text-warning" /> Achievements
              </h2>
              <span className="text-xs text-subtle">{earnedCount}/{achievements.length} unlocked</span>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {achievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className={`min-h-24 rounded-2xl border p-2 text-center shadow-[0_8px_24px_rgba(0,0,0,0.18)] ${
                    achievement.earned
                      ? 'border-primary/30 bg-primary/10'
                      : 'border-border bg-surface opacity-50'
                  }`}
                >
                  <span className={`block text-xl ${achievement.earned ? '' : 'grayscale'}`} aria-hidden="true">{achievement.icon}</span>
                  <span className={`mt-1 block text-[9px] font-semibold leading-tight ${achievement.earned ? 'text-foreground' : 'text-subtle'}`}>
                    {achievement.title}
                  </span>
                </div>
              ))}
            </div>
          </section>
        </Reveal>

        {/* ===== Recent activity ===== */}
        <Reveal delay={0.12}>
          <section aria-labelledby="activity-heading">
            <div className="mb-3 flex items-center justify-between px-1">
              <h2 id="activity-heading" className="flex items-center gap-1.5 text-sm font-semibold text-foreground">
                <Sparkles className="h-4 w-4 text-accent" /> Recent activity
              </h2>
              <span className="text-xs text-subtle">12 days of showing up</span>
            </div>
            <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-[0_8px_24px_rgba(0,0,0,0.18)]">
              {recentActivity.map((item) => (
                <div key={item.id} className="flex items-center gap-3 border-b border-border px-4 py-3 last:border-b-0">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-white/[0.04] text-base" aria-hidden="true">
                    {item.icon}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-xs font-semibold text-foreground">{item.title}</p>
                    <p className="truncate text-[11px] text-subtle">{item.description}</p>
                  </div>
                  <time className="shrink-0 text-[10px] text-subtle">{item.time}</time>
                </div>
              ))}
            </div>
          </section>
        </Reveal>

        {/* ===== CTA ===== */}
        <Reveal delay={0.14}>
          <section className="rounded-2xl border border-primary/20 surface-gradient p-5 text-center shadow-[0_8px_24px_rgba(0,0,0,0.18)]">
            <Award className="mx-auto mb-2 h-6 w-6 text-warning" />
            <h2 className="text-base font-bold text-foreground">Keep the streak alive</h2>
            <p className="mt-1 text-xs leading-relaxed text-muted">
              Today&apos;s build is waiting. Momentum is built one public commit at a time.
            </p>
            <Link to="/day/12" className="mt-4 block">
              <Button size="lg" className="w-full font-bold">Open today&apos;s challenge</Button>
            </Link>
          </section>
        </Reveal>

        <p className="flex items-center justify-center gap-1.5 py-2 text-[11px] text-subtle">
          <CheckCircle2 className="h-3.5 w-3.5 text-success" /> Your progress is saved on this device
        </p>
      </main>
      <BottomNav />
    </div>
  );
}
