import { lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowRight, Code2, Flame, Trophy, Upload,
} from 'lucide-react';
import { Github, Linkedin } from '@/components/Icons';
import { Button } from '@/components/ui/button';
import { socialProofStudents } from '@/lib/mock-data';

const HeroPhone = lazy(() => import('@/components/HeroPhone'));

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}

function FadeIn({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.1, 0.25, 1] as const }}
      className={className}>
      {children}
    </motion.div>
  );
}

/* ─── Contribution Graph ─── */
function ContributionGraph() {
  const rows = 7, cols = 18;
  const cells = Array.from({ length: rows * cols }, (_, i) => {
    const r = Math.sin(i * 127 + 311) * 0.5 + 0.5;
    return r > 0.35 ? Math.min(4, Math.floor(r * 5)) : 0;
  });
  const heat = ['#151821', '#0e4429', '#006d32', '#26a641', '#39d353'];
  return (
    <div className="grid gap-[2px]" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
      {cells.map((l, i) => (
        <div key={i} className="aspect-square rounded-[2px]" style={{ background: heat[l] }} />
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-dvh bg-bg overflow-x-clip relative">
      {/* Animated 3D background — compact glowing flame orb */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden="true">
        {/* Wide ambient glow */}
        <motion.div
          className="absolute top-[-10%] left-[-15%] w-[400px] h-[400px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(245,158,11,0.07) 0%, transparent 65%)' }}
          animate={{ x: [0, 25, 0], y: [0, -15, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* ── 3D rotating flame orb ── */}
        <motion.div
          className="absolute top-[8%] right-[5%] w-[180px] h-[180px]"
          style={{ perspective: 400 }}
          animate={{ rotateY: [0, 360] }}
          transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
        >
          {/* Soft outer halo */}
          <div
            className="absolute inset-[-25%] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(245,158,11,0.16) 0%, rgba(245,158,11,0.05) 40%, transparent 70%)', filter: 'blur(14px)' }}
          />
          {/* Inner bright core */}
          <motion.div
            className="absolute inset-[14%] rounded-full"
            style={{
              background: 'radial-gradient(circle at 40% 35%, rgba(251,191,36,0.4), rgba(245,158,11,0.16) 45%, transparent 72%)',
              filter: 'blur(3px)',
            }}
            animate={{ scale: [1, 1.1, 1], rotateX: [0, 12, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          />
          {/* Hot center dot */}
          <div
            className="absolute inset-[30%] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(255,220,80,0.55) 0%, rgba(245,158,11,0.2) 50%, transparent 75%)', filter: 'blur(2px)' }}
          />
          {/* Ring 1 — tilted orbit */}
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{ border: '1.5px solid rgba(245,158,11,0.25)', transform: 'rotateX(55deg)' }}
            animate={{ rotateZ: [0, -360] }}
            transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
          />
          {/* Ring 2 — offset tilt */}
          <motion.div
            className="absolute inset-[8%] rounded-full"
            style={{ border: '1px solid rgba(245,158,11,0.16)', transform: 'rotateX(55deg) rotateY(30deg)' }}
            animate={{ rotateZ: [0, 360] }}
            transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          />
          {/* Ring 3 — thin outer ring */}
          <motion.div
            className="absolute inset-[-5%] rounded-full"
            style={{ border: '0.5px solid rgba(245,158,11,0.1)' }}
            animate={{ rotateZ: [0, -360] }}
            transition={{ duration: 36, repeat: Infinity, ease: 'linear' }}
          />
        </motion.div>

        {/* Floating ember particles */}
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${3 + i}px`,
              height: `${3 + i}px`,
              top: `${14 + i * 10}%`,
              right: `${8 + i * 7}%`,
              background: 'rgba(245,158,11,0.5)',
              boxShadow: '0 0 6px rgba(245,158,11,0.35)',
            }}
            animate={{
              y: [0, -16 - i * 6, 0],
              opacity: [0.3, 0.7, 0.3],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 3.5 + i * 1.2,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.7,
            }}
          />
        ))}
      </div>

      {/* ═══ HEADER ═══ */}
      <header className="fixed top-0 left-0 right-0 z-40 safe-top glass">
        <div className="mx-auto flex max-w-2xl items-center justify-between px-5 py-3">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary">
              <Flame className="h-5 w-5 text-[#111]" />
            </div>
            <span className="text-[17px] font-bold text-foreground">AB<span className="font-normal">Talks</span></span>
          </Link>
          <button onClick={() => scrollTo('cta')}>
            <Button variant="default" size="sm" className="rounded-full px-5 text-[13px] font-semibold">
              Start <ArrowRight className="h-3.5 w-3.5 ml-0.5" />
            </Button>
          </button>
        </div>
      </header>

      {/* ═══ HERO ═══ */}
      <section className="relative flex min-h-[92svh] flex-col justify-center px-6 pt-20 pb-10 max-w-[560px] mx-auto">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] as const }}>
          <p className="mb-4 text-[12px] font-semibold uppercase tracking-[0.2em] text-primary">60 Days. One Commitment.</p>
          <h1 className="text-[36px] sm:text-[42px] leading-[1.05] font-bold tracking-[-0.03em] text-foreground mb-4">
            Build every day. <span className="text-primary">Become undeniable.</span>
          </h1>
          <p className="text-[16px] leading-[1.65] text-muted mb-6 max-w-[520px]">
            Build something every day for 60 days, document your progress,
            and turn your consistency into a public portfolio recruiters can&apos;t ignore.
          </p>
          <div className="flex flex-col gap-3 mb-5 max-w-[360px]">
            <Link to="/dashboard">
              <Button variant="default" size="lg" className="w-full text-[15px]">Start the 60-Day Challenge <ArrowRight className="h-4 w-4 ml-1" /></Button>
            </Link>
            <button onClick={() => scrollTo('how-it-works')}
              className="flex items-center justify-center min-h-14 rounded-2xl border border-border bg-surface text-foreground text-[15px] font-medium hover:bg-white/5 transition-colors">
              See how it works
            </button>
          </div>
          <div className="card-pad flex items-center gap-4 max-w-[420px]">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary">
              <Flame className="h-6 w-6 text-[#111] flame-pulse" />
            </div>
            <div>
              <p className="text-[14px] font-semibold text-foreground">The streak is alive.</p>
              <p className="text-[13px] text-muted">This could be you — starting today.</p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ═══ "EVERY DAY" ═══ */}
      <section className="px-6 py-10">
        <div className="max-w-[560px] mx-auto">
          <FadeIn>
            <h2 className="text-[28px] sm:text-[32px] font-bold text-foreground leading-[1.1] tracking-[-0.02em]">
              Every day, you build.<br />Every day, you commit.<br /><span className="text-primary">Every day, you prove it.</span>
            </h2>
          </FadeIn>
        </div>
      </section>

      {/* ═══ HOW IT WORKS ═══ */}
      <section id="how-it-works" className="px-6 py-12 bg-bg-elevated">
        <div className="max-w-[560px] mx-auto">
          <FadeIn>
            <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-primary mb-1">How It Works</p>
            <h2 className="text-[24px] font-bold text-foreground mb-1">The proof-of-work loop</h2>
            <p className="text-[14px] text-muted mb-8">Five steps. One chain. Each one a notch in your public proof.</p>
          </FadeIn>
          <div className="relative">
            <div className="absolute left-5 top-5 bottom-5 w-px bg-gradient-to-b from-primary/40 to-transparent" aria-hidden="true" />
            <div className="space-y-6 pl-12">
              {[
                { icon: Code2, title: 'Build', desc: 'Ship something real, every single day.' },
                { icon: Github, title: 'Commit to GitHub', desc: 'Your contribution graph becomes your proof.' },
                { icon: Linkedin, title: 'Post on LinkedIn', desc: 'Document the build in public, like a developer.' },
                { icon: Upload, title: 'Submit proof', desc: 'Upload both proofs to lock the day in.' },
                { icon: Flame, title: 'Keep your streak', desc: "Don't break the chain. Repeat for 60 days." },
              ].map((item, i) => (
                <FadeIn key={item.title} delay={i * 0.06}>
                  <div className="relative">
                    <div className="absolute -left-[2.4rem] flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-surface" aria-hidden="true">
                      <item.icon className="h-5 w-5 text-subtle" />
                    </div>
                    <div className="border-b border-border pb-5">
                      <h3 className="text-[15px] font-semibold text-foreground mb-0.5">{item.title}</h3>
                      <p className="text-[13px] text-muted">{item.desc}</p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ WHY 60 DAYS ═══ */}
      <section className="px-6 py-12">
        <div className="max-w-[560px] mx-auto">
          <FadeIn>
            <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-primary mb-1">Why 60 Days</p>
            <h2 className="text-[24px] font-bold text-foreground mb-1">Consistency creates evidence</h2>
            <p className="text-[14px] text-muted mb-6">60 days of showing up turns into a recruiter-readable record that a course certificate never can.</p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div>
              {[
                { icon: Github, color: '#22C55E', title: 'GitHub activity', desc: 'A contribution graph with 60 straight days.', highlight: false },
                { icon: Linkedin, color: '#0077B5', title: 'LinkedIn presence', desc: '60 posts documenting real, shipped work.', highlight: false },
                { icon: Code2, color: '#F59E0B', title: 'A portfolio that builds itself', desc: '60 projects. One undeniable public record.', highlight: true },
                { icon: Trophy, color: '#8B5CF6', title: 'A public proof profile', desc: 'One shareable link that proves you showed up.', highlight: false },
              ].map((item, i) => (
                <div key={item.title} className={`flex items-center gap-4 py-3.5 border-b border-border ${i === 0 ? 'border-t' : ''}`}>
                  <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl"
                    style={{ background: item.highlight ? '#F59E0B' : `${item.color}15` }}>
                    <item.icon className="h-4.5 w-4.5" style={{ color: item.highlight ? '#111' : item.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[14px] font-semibold text-foreground">{item.title}</p>
                    <p className="text-[12px] text-muted">{item.desc}</p>
                  </div>
                  {item.highlight && <ArrowRight className="h-4 w-4 text-primary shrink-0" />}
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══ SEE IT IN ACTION ═══ */}
      <section className="px-6 py-12 bg-bg-elevated">
        <div className="max-w-[560px] mx-auto text-center">
          <FadeIn>
            <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-primary mb-1">See It In Action</p>
            <h2 className="text-[24px] font-bold text-foreground mb-2">Build one meaningful thing every day for 60 days.</h2>
            <p className="text-[14px] text-muted mb-8">Your streak, your progress ring, and your public proof — all in one place.</p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <Suspense fallback={<div className="mx-auto h-[380px] w-[200px] shimmer rounded-[2.2rem]" />}>
              <HeroPhone />
            </Suspense>
          </FadeIn>
        </div>
      </section>

      {/* ═══ SOCIAL PROOF ═══ */}
      <section className="px-6 py-12">
        <div className="max-w-[560px] mx-auto">
          <FadeIn>
            <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-primary mb-1">Community</p>
            <h2 className="text-[24px] font-bold text-foreground mb-1">People who showed up</h2>
            <p className="text-[14px] text-muted mb-6">Real students. Real streaks. No fake screenshots.</p>
          </FadeIn>
          <div className="space-y-3">
            {socialProofStudents.map((student, i) => (
              <FadeIn key={student.name} delay={0.08 + i * 0.06}>
                <div className="card p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-primary text-sm font-bold text-[#111] flex-shrink-0">{student.avatar}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-[14px] font-semibold text-foreground truncate">{student.name}</p>
                        <div className="flex items-center gap-1 ml-2">
                          <Flame className="w-3.5 h-3.5 text-primary" />
                          <span className="text-[12px] font-semibold text-primary">{student.streak}</span>
                        </div>
                      </div>
                      <p className="text-[11px] text-subtle">{student.college} · {student.track}</p>
                    </div>
                  </div>
                  <p className="text-[13px] text-muted leading-relaxed">&ldquo;{student.quote}&rdquo;</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ GITHUB ACTIVITY ═══ */}
      <section className="px-6 py-10 bg-bg-elevated">
        <div className="max-w-[560px] mx-auto">
          <FadeIn>
            <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-primary mb-1">Your Proof</p>
            <h2 className="text-[24px] font-bold text-foreground mb-1">60 days of green squares</h2>
            <p className="text-[14px] text-muted mb-5">Your contribution graph becomes your resume.</p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="card p-4">
              <ContributionGraph />
              <div className="flex items-center justify-between mt-3 text-[11px] text-subtle">
                <span>Less</span>
                <div className="flex items-center gap-1">
                  {[0, 1, 2, 3, 4].map((l) => (
                    <div key={l} className="h-2.5 w-2.5 rounded-sm"
                      style={{ background: ['#151821', '#0e4429', '#006d32', '#26a641', '#39d353'][l] }} />
                  ))}
                </div>
                <span>More</span>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══ ACHIEVEMENTS ═══ */}
      <section className="px-6 py-10">
        <div className="max-w-[560px] mx-auto">
          <FadeIn>
            <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-primary mb-1">Milestones</p>
            <h2 className="text-[24px] font-bold text-foreground mb-5">Your 60-day journey</h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
              {[
                { label: 'Bronze', days: '10-Day Streak', color: '#CD7F32' },
                { label: 'Silver', days: '25-Day Streak', color: '#C0C0C0' },
                { label: 'Gold', days: '50-Day Streak', color: '#FFD700' },
              ].map((badge) => (
                <div key={badge.label} className="min-w-[130px] shrink-0 rounded-2xl border border-border bg-surface p-4 text-center">
                  <Trophy className="h-7 w-7 mx-auto mb-2" style={{ color: badge.color }} />
                  <p className="text-[15px] font-bold text-foreground">{badge.label}</p>
                  <p className="text-[10px] text-subtle uppercase tracking-wider mt-0.5">{badge.days}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══ FINAL CTA ═══ */}
      <section id="cta" className="px-6 py-14">
        <div className="max-w-[480px] mx-auto">
          <FadeIn>
            <div className="card p-7 text-center border-primary/20">
              <div className="text-4xl mb-3">🔥</div>
              <h2 className="text-[26px] font-bold text-foreground mb-2">Your 60 days start today.</h2>
              <p className="text-[14px] text-muted mb-5 leading-relaxed max-w-[360px] mx-auto">
                Build once, every day, for two months. Walk away with a GitHub history,
                a LinkedIn record, and a portfolio.
              </p>
              <Link to="/dashboard">
                <Button variant="default" size="lg" className="w-full max-w-[340px] text-[15px]">
                  Start the 60-Day Challenge <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </Link>
              <p className="text-[11px] text-subtle mt-3 uppercase tracking-wider">Free for students · No experience needed</p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-6 border-t border-border text-center">
        <div className="flex items-center justify-center gap-2 mb-1">
          <div className="flex h-5 w-5 items-center justify-center rounded-md bg-primary">
            <Flame className="h-3 w-3 text-[#111]" />
          </div>
          <span className="font-semibold text-foreground text-[14px]">AB<span className="font-normal">Talks</span></span>
        </div>
        <p className="text-[11px] text-subtle">© 2026 ABTalks · Build every day. Show your work.</p>
      </footer>
    </div>
  );
}
