import { lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Code2, Flame, Trophy } from 'lucide-react';
import { Github, Linkedin } from '@/components/Icons';
import { Button } from '@/components/ui/button';
import HeroSection from '@/components/HeroSection';
import TrustSection from '@/components/TrustSection';
import HowItWorks from '@/components/HowItWorks';
import MotivationCarousel from '@/components/MotivationCarousel';
import FaqSection from '@/components/FaqSection';
import Skeleton from '@/components/Skeleton';

const HeroPhone = lazy(() => import('@/components/HeroPhone'));

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}

function FadeIn({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.1, 0.25, 1] as const }}
      className={className}
    >
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
        <motion.div
          className="absolute top-[-10%] left-[-15%] w-[400px] h-[400px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(255,90,0,0.07) 0%, transparent 65%)' }}
          animate={{ x: [0, 25, 0], y: [0, -15, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute top-[8%] right-[5%] w-[180px] h-[180px]"
          style={{ perspective: 400 }}
          animate={{ rotateY: [0, 360] }}
          transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
        >
          <div
            className="absolute inset-[-25%] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(255,90,0,0.16) 0%, rgba(255,90,0,0.05) 40%, transparent 70%)', filter: 'blur(14px)' }}
          />
          <motion.div
            className="absolute inset-[14%] rounded-full"
            style={{
              background: 'radial-gradient(circle at 40% 35%, rgba(255,122,51,0.4), rgba(255,90,0,0.16) 45%, transparent 72%)',
              filter: 'blur(3px)',
            }}
            animate={{ scale: [1, 1.1, 1], rotateX: [0, 12, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          />
          <div
            className="absolute inset-[30%] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(255,220,80,0.55) 0%, rgba(255,90,0,0.2) 50%, transparent 75%)', filter: 'blur(2px)' }}
          />
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{ border: '1.5px solid rgba(255,90,0,0.25)', transform: 'rotateX(55deg)' }}
            animate={{ rotateZ: [0, -360] }}
            transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
          />
          <motion.div
            className="absolute inset-[8%] rounded-full"
            style={{ border: '1px solid rgba(255,90,0,0.16)', transform: 'rotateX(55deg) rotateY(30deg)' }}
            animate={{ rotateZ: [0, 360] }}
            transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          />
          <motion.div
            className="absolute inset-[-5%] rounded-full"
            style={{ border: '0.5px solid rgba(255,90,0,0.1)' }}
            animate={{ rotateZ: [0, -360] }}
            transition={{ duration: 36, repeat: Infinity, ease: 'linear' }}
          />
        </motion.div>

        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${3 + i}px`,
              height: `${3 + i}px`,
              top: `${14 + i * 10}%`,
              right: `${8 + i * 7}%`,
              background: 'rgba(255,90,0,0.5)',
              boxShadow: '0 0 6px rgba(255,90,0,0.35)',
            }}
            animate={{ y: [0, -16 - i * 6, 0], opacity: [0.3, 0.7, 0.3], scale: [0.8, 1.2, 0.8] }}
            transition={{ duration: 3.5 + i * 1.2, repeat: Infinity, ease: 'easeInOut', delay: i * 0.7 }}
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

      {/* ═══ HERO — "Build for 60 days. Get noticed by recruiters." ═══ */}
      <HeroSection />

      {/* ═══ COMMITMENT CARD — low-friction entry point ═══ */}
      <section className="px-6 pb-8">
        <div className="mx-auto max-w-[480px]">
          <FadeIn>
            <div className="rounded-2xl border border-primary/20 bg-primary/[0.06] p-5 text-center">
              <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-primary/15">
                <Flame className="h-5 w-5 text-primary flame-pulse" />
              </div>
              <h3 className="text-[17px] font-bold text-foreground">Start tonight</h3>
              <div className="mt-3 flex flex-wrap items-center justify-center gap-3 text-[13px] text-muted">
                <span className="flex items-center gap-1.5"><span className="inline-block h-1.5 w-1.5 rounded-full bg-primary" aria-hidden="true" /> 60 minutes a day</span>
                <span className="flex items-center gap-1.5"><span className="inline-block h-1.5 w-1.5 rounded-full bg-primary" aria-hidden="true" /> Resume anytime if you miss a day</span>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══ TRUST — mocked community stats ═══ */}
      <TrustSection />

      {/* ═══ HOW IT WORKS — 3 steps ═══ */}
      <HowItWorks />

      {/* ═══ SEE IT IN ACTION — live mini-dashboard in a phone frame ═══ */}
      <section className="px-6 py-12 bg-bg-elevated">
        <div className="mx-auto max-w-[560px] text-center">
          <FadeIn>
            <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-primary mb-1">See It In Action</p>
            <h2 className="text-[24px] font-bold text-foreground mb-2">Your streak, progress ring, and proof — one place.</h2>
            <p className="text-[14px] text-muted mb-8">Open the app at night, do your build, submit your links, close the laptop.</p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <Suspense fallback={<Skeleton className="mx-auto h-[380px] w-[200px] rounded-[2.2rem]" />}>
              <HeroPhone />
            </Suspense>
          </FadeIn>
        </div>
      </section>

      {/* ═══ WHY 60 DAYS — evidence ═══ */}
      <section className="px-6 py-12">
        <div className="mx-auto max-w-[560px]">
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
                { icon: Code2, color: '#ff5a00', title: 'A portfolio that builds itself', desc: '60 projects. One undeniable public record.', highlight: true },
                { icon: Trophy, color: '#8B5CF6', title: 'A public proof profile', desc: 'One shareable link that proves you showed up.', highlight: false },
              ].map((item, i) => (
                <div key={item.title} className={`flex items-center gap-4 py-3.5 border-b border-border ${i === 0 ? 'border-t' : ''}`}>
                  <div
                    className="grid h-9 w-9 shrink-0 place-items-center rounded-xl"
                    style={{ background: item.highlight ? '#ff5a00' : `${item.color}15` }}
                  >
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

      {/* ═══ MOTIVATION — swipeable streak carousel ═══ */}
      <MotivationCarousel />

      {/* ═══ YOUR PROOF — contribution graph ═══ */}
      <section className="px-6 py-10 bg-bg-elevated">
        <div className="mx-auto max-w-[560px]">
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
                    <div key={l} className="h-2.5 w-2.5 rounded-sm" style={{ background: ['#151821', '#0e4429', '#006d32', '#26a641', '#39d353'][l] }} />
                  ))}
                </div>
                <span>More</span>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══ MILESTONES ═══ */}
      <section className="px-6 py-10">
        <div className="mx-auto max-w-[560px]">
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

      {/* ═══ FAQ ═══ */}
      <FaqSection />

      {/* ═══ FINAL CTA ═══ */}
      <section id="cta" className="px-6 py-14">
        <div className="mx-auto max-w-[480px]">
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
                  Start Day 1 <ArrowRight className="h-4 w-4 ml-1" />
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
