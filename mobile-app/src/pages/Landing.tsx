import { lazy, Suspense, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowRight, Flame, CheckCircle2,
  Star, ChevronDown, Shield, Clock, Code2,
  BookOpen, Trophy, Users,
} from 'lucide-react';
import { Github, Linkedin } from '@/components/Icons';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { socialProofStudents, tracks, faqs } from '@/lib/mock-data';

const HeroPhone = lazy(() => import('@/components/HeroPhone'));

function FadeUp({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function ContributionGraph({ seed = 0 }: { seed?: number }) {
  const days = Array.from({ length: 35 }, (_, i) => {
    const rng = Math.sin(seed * 9301 + i * 49297 + 233) * 0.5 + 0.5;
    return rng > 0.35 ? Math.min(4, Math.floor(rng * 5)) : 0;
  });
  const heatColors = ['#181B22', 'rgba(111,126,247,0.2)', 'rgba(111,126,247,0.4)', 'rgba(111,126,247,0.65)', '#6F7EF7'];

  return (
    <div className="flex gap-0.5 flex-wrap" aria-hidden="true">
      {days.map((level, i) => (
        <div
          key={i}
          className="w-3 h-3 rounded-sm flex-shrink-0"
          style={{ background: heatColors[level] }}
        />
      ))}
    </div>
  );
}

export default function LandingPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-bg overflow-x-clip">
      {/* ===== HERO ===== */}
      <section
        ref={heroRef}
        id="hero"
        className="relative flex min-h-[100svh] flex-col items-center justify-center px-5 pb-16 pt-24 text-center"
      >
        {/* Subtle ambient background */}
        <motion.div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(111,126,247,0.09) 0%, transparent 70%)',
            y: heroY,
            opacity: heroOpacity,
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(rgba(111,126,247,0.05) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
          aria-hidden="true"
        />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 max-w-sm mx-auto"
          style={{ y: heroY }}
        >
          {/* Trust pill */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/25 bg-primary/10 mb-6"
          >
            <Flame className="w-3.5 h-3.5 text-warning flame-pulse" />
            <span className="text-xs font-medium text-muted">1,200+ students. 60 days. Real builds.</span>
          </motion.div>

          <div className="max-w-[300px]">
            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7 }}
              className="text-[34px] sm:text-4xl font-extrabold leading-[1.1] tracking-tight mb-4"
            >
              Build one thing{' '}
              <span className="gradient-text">every day</span>
              {' '}for 60 days.
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-[15px] leading-relaxed text-muted mb-8 text-pretty"
            >
              A free 60-day coding challenge for Indian college students.
              Daily builds. Public GitHub commits. Your visible record of consistency.
            </motion.p>
          </div>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col gap-3 mb-8"
          >
            <Link to="/dashboard" className="w-full">
              <Button
                id="hero-start-challenge"
                variant="gradient"
                size="lg"
                className="w-full breathe text-base font-bold"
              >
                Start My 60-Day Challenge
                <ArrowRight className="w-5 h-5 ml-1" />
              </Button>
            </Link>
            <button
              id="hero-see-how"
              onClick={() => scrollToSection('how-it-works')}
              className="flex min-h-12 items-center justify-center gap-2 text-sm text-subtle hover:text-muted transition-colors py-2 touch-target"
            >
              See how it works
              <ChevronDown className="w-4 h-4" />
            </button>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="flex items-center justify-center gap-4 text-xs text-subtle"
          >
            <div className="flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-success" />
              <span>Free forever</span>
            </div>
            <div className="flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-success" />
              <span>No experience required</span>
            </div>
            <div className="flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-success" />
              <span>Mobile-first</span>
            </div>
          </motion.div>

          {/* Phone mockup — the product, alive (lazy-loaded below the fold) */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.85, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="mt-12"
          >
            <Suspense fallback={<div className="mx-auto h-[440px] w-[232px] shimmer rounded-[2.6rem]" aria-hidden="true" />}>
              <HeroPhone />
            </Suspense>
          </motion.div>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: [0, 6, 0] }}
          transition={{
            opacity: { delay: 1.2, duration: 0.5 },
            y: { duration: 1.5, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }
          }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <ChevronDown className="w-5 h-5 text-subtle" />
        </motion.div>
      </section>

      {/* ===== SOCIAL PROOF ===== */}
      <section id="social-proof" className="px-5 py-20">
        <FadeUp>
          <div className="text-center mb-8">
            <Badge variant="secondary" className="mb-3">Community</Badge>
            <h2 className="text-2xl font-bold text-foreground">People who showed up</h2>
            <p className="text-sm text-subtle mt-2">Real students. Real streaks. No fake screenshots.</p>
          </div>
        </FadeUp>

        <div className="space-y-3">
          {socialProofStudents.map((student, i) => (
            <FadeUp key={student.name} delay={i * 0.1}>
              <div className="rounded-2xl border border-border bg-surface p-4 card-hover shadow-[0_8px_24px_rgba(0,0,0,0.18)]">
                <div className="flex items-start gap-3 mb-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-sm font-bold text-white"
                    style={{ background: `linear-gradient(135deg, #6F7EF7, #6A82D0)` }}
                  >
                    {student.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold text-foreground truncate">{student.name}</p>
                      <div className="flex items-center gap-1 ml-2">
                        <Flame className="w-3.5 h-3.5 text-warning" />
                        <span className="text-xs font-bold text-warning">{student.streak}</span>
                      </div>
                    </div>
                    <p className="text-xs text-subtle">{student.college} · {student.track}</p>
                  </div>
                </div>
                <ContributionGraph seed={i + 1} />
                <p className="text-xs text-muted mt-3 leading-relaxed italic">&ldquo;{student.quote}&rdquo;</p>
              </div>
            </FadeUp>
          ))}
        </div>

        {/* Stats row */}
        <FadeUp delay={0.3}>
          <div className="grid grid-cols-3 gap-3 mt-6">
            {[
              { value: '1,200+', label: 'Students enrolled', icon: Users },
              { value: '18,000+', label: 'GitHub commits', icon: Github },
              { value: '60 days', label: 'The commitment', icon: Clock },
            ].map(({ value, label, icon: Icon }) => (
              <div key={label} className="rounded-xl border border-border bg-surface p-3 text-center shadow-[0_8px_24px_rgba(0,0,0,0.18)]">
                <Icon className="w-4 h-4 text-primary mx-auto mb-1.5" />
                <p className="text-lg font-bold text-foreground">{value}</p>
                <p className="text-[10px] text-subtle">{label}</p>
              </div>
            ))}
          </div>
        </FadeUp>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section id="how-it-works" className="px-5 py-16 bg-bg-elevated">
        <FadeUp>
          <div className="text-center mb-10">
            <Badge variant="default" className="mb-3">Process</Badge>
            <h2 className="text-2xl font-bold text-foreground">How the 60 days work</h2>
            <p className="text-sm text-subtle mt-2">Simple, repeatable, measurable.</p>
          </div>
        </FadeUp>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-5 top-5 bottom-5 w-px bg-gradient-to-b from-primary/50 to-transparent" aria-hidden="true" />

          <div className="space-y-8 pl-12">
            {[
              {
                step: '01',
                icon: BookOpen,
                title: 'Pick your track',
                description: "Choose Full Stack, AI/ML, Cybersecurity, DSA, or UI/UX. Your track defines your 60-day syllabus.",
                color: '#6F7EF7',
              },
              {
                step: '02',
                icon: Code2,
                title: 'Build something daily',
                description: "Every day has a focused task. It takes 2–4 hours. No tutorial-following — you build real things.",
                color: '#8B97D8',
              },
              {
                step: '03',
                icon: Github,
                title: 'Commit + post publicly',
                description: "Push to GitHub. Write a 3-sentence LinkedIn post. Create a visible public record of your work.",
                color: '#38B46A',
              },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <FadeUp key={item.step} delay={i * 0.15}>
                  <div className="relative">
                    {/* Step dot */}
                    <div
                      className="absolute -left-[2.65rem] w-5 h-5 rounded-full border-2 border-bg flex items-center justify-center"
                      style={{ background: item.color }}
                      aria-hidden="true"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-white" />
                    </div>

                    <div className="rounded-2xl border border-border bg-surface p-4 shadow-[0_8px_24px_rgba(0,0,0,0.18)]">
                      <div className="flex items-center gap-3 mb-2">
                        <div
                          className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                          style={{ background: `${item.color}18` }}
                        >
                          <Icon className="w-4 h-4" style={{ color: item.color }} />
                        </div>
                        <div>
                          <span className="text-[10px] font-mono text-subtle">Step {item.step}</span>
                          <h3 className="text-sm font-semibold text-foreground leading-tight">{item.title}</h3>
                        </div>
                      </div>
                      <p className="text-xs text-muted leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                </FadeUp>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== TRACKS ===== */}
      <section id="tracks" className="px-5 py-16">
        <FadeUp>
          <div className="text-center mb-8">
            <Badge variant="outline" className="mb-3">Tracks</Badge>
            <h2 className="text-2xl font-bold text-foreground">Choose your path</h2>
            <p className="text-sm text-subtle mt-2">Five focused paths, each with 60 structured days.</p>
          </div>
        </FadeUp>

        <div className="space-y-3">
          {tracks.map((track, i) => {
            return (
              <FadeUp key={track.id} delay={i * 0.08}>
                <div
                  className="rounded-2xl border bg-surface p-4 card-hover shadow-[0_8px_24px_rgba(0,0,0,0.18)]"
                  style={{ borderColor: `${track.color}25` }}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: `${track.color}15` }}
                    >
                      <span className="text-xl">{track.icon}</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-semibold text-foreground">{track.name}</h3>
                        <span
                          className="text-[10px] px-2 py-0.5 rounded-full font-medium"
                          style={{ background: `${track.color}15`, color: track.color }}
                        >
                          {track.level}
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-muted mb-3 leading-relaxed">{track.description}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {track.projects.map((p) => (
                      <span key={p} className="text-[10px] px-2 py-0.5 rounded-md bg-white/5 text-subtle border border-border">
                        {p}
                      </span>
                    ))}
                  </div>
                </div>
              </FadeUp>
            );
          })}
        </div>
      </section>

      {/* ===== AFTER 60 DAYS ===== */}
      <section id="after-60" className="px-5 py-16 bg-bg-elevated">
        <FadeUp>
          <div className="text-center mb-8">
            <Badge variant="success" className="mb-3">Outcomes</Badge>
            <h2 className="text-2xl font-bold text-foreground">After 60 days, you&apos;ll have</h2>
            <p className="text-sm text-subtle mt-2">Concrete. Verifiable. Yours.</p>
          </div>
        </FadeUp>

        <div className="space-y-2.5">
          {[
            { icon: Github, title: '60 GitHub commits', description: 'A contribution graph that shows you ship consistently.', color: '#6F7EF7' },
            { icon: Linkedin, title: '60 LinkedIn posts', description: 'A public record of what you learned and what you built.', color: '#6A82D0' },
            { icon: Code2, title: '10–15 mini-projects', description: 'Real, working code you can show in interviews.', color: '#38B46A' },
            { icon: Flame, title: 'A daily coding habit', description: "The most underrated skill. You&apos;ll know you can show up.", color: '#E7A53A' },
            { icon: Trophy, title: 'A community of builders', description: 'People who finished alongside you. That matters.', color: '#8B97D8' },
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <FadeUp key={item.title} delay={i * 0.08}>
                <div className="flex items-center gap-4 p-4 rounded-2xl border border-border bg-surface card-hover shadow-[0_8px_24px_rgba(0,0,0,0.18)]">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: `${item.color}15` }}
                  >
                    <Icon className="w-5 h-5" style={{ color: item.color }} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{item.title}</p>
                    <p className="text-xs text-subtle mt-0.5">{item.description}</p>
                  </div>
                </div>
              </FadeUp>
            );
          })}
        </div>
      </section>

      {/* ===== TESTIMONIAL ===== */}
      <section id="testimonial" className="px-5 py-16">
        <FadeUp>
          <div className="rounded-2xl border border-primary/20 surface-gradient p-6 shadow-[0_8px_24px_rgba(0,0,0,0.18)]">
            <div className="flex gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-warning text-warning" />
              ))}
            </div>
            <blockquote className="text-base text-muted leading-relaxed mb-5 font-medium text-pretty">
              &ldquo;I was skeptical at first. 60 days felt like too much. But the tasks are small enough that I never skipped
              because of difficulty — only because of discipline. ABTalks fixed my discipline problem.&rdquo;
            </blockquote>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-[#6A82D0] flex items-center justify-center font-bold text-sm text-white">
                AK
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">Aditya Kumar</p>
                <p className="text-xs text-subtle">IIT Bombay · Day 30 · AI/ML Track</p>
              </div>
            </div>
          </div>
        </FadeUp>
      </section>

      {/* ===== COMMITMENT CARD ===== */}
      <section id="commitment" className="px-5 pb-16">
        <FadeUp>
          <div className="rounded-2xl border border-border bg-surface p-5 shadow-[0_8px_24px_rgba(0,0,0,0.18)]">
            <h2 className="text-lg font-bold text-foreground mb-1">What you&apos;re signing up for</h2>
            <p className="text-xs text-subtle mb-5">Be honest with yourself before starting.</p>

            <div className="space-y-3">
              {[
                { label: 'Daily time commitment', value: '2–4 hours/day', icon: Clock },
                { label: 'GitHub account needed', value: 'Required', icon: Github },
                { label: 'LinkedIn account needed', value: 'Recommended', icon: Linkedin },
                { label: 'Streak shield (per 14 days)', value: '1 protected miss', icon: Shield },
                { label: 'Price', value: 'Free', icon: CheckCircle2 },
              ].map(({ label, value, icon: Icon }) => (
                <div key={label} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                  <div className="flex items-center gap-2">
                    <Icon className="w-3.5 h-3.5 text-subtle" />
                    <span className="text-xs text-muted">{label}</span>
                  </div>
                  <span className="text-xs font-semibold text-foreground">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </FadeUp>
      </section>

      {/* ===== FAQ ===== */}
      <section id="faq" className="px-5 pb-16 bg-bg-elevated pt-16">
        <FadeUp>
          <div className="text-center mb-8">
            <Badge variant="ghost" className="mb-3">FAQ</Badge>
            <h2 className="text-2xl font-bold text-foreground">Common questions</h2>
          </div>
        </FadeUp>

        <FadeUp delay={0.1}>
          <Accordion type="single" collapsible className="space-y-0">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`}>
                <AccordionTrigger className="text-left text-sm">{faq.question}</AccordionTrigger>
                <AccordionContent>
                  <p className="text-sm text-muted leading-relaxed">{faq.answer}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </FadeUp>
      </section>

      {/* ===== FINAL CTA ===== */}
      <section id="final-cta" className="px-5 py-20 text-center relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(111,126,247,0.07) 0%, transparent 70%)',
          }}
          aria-hidden="true"
        />
        <FadeUp>
          <div className="relative z-10">
            <div className="text-5xl mb-4">🔥</div>
            <h2 className="text-3xl font-black text-foreground mb-3 text-balance">
              Ready to start?
            </h2>
            <p className="text-muted mb-8 text-pretty text-sm">
              Day 1 is waiting. Your future self will be grateful you started today.
            </p>
            <Link to="/dashboard">
              <Button
                id="final-cta-start"
                variant="gradient"
                size="xl"
                className="w-full max-w-sm breathe font-bold text-lg"
              >
                Start My 60-Day Challenge
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <p className="text-xs text-subtle mt-4">Free. No credit card. No sign-up wall.</p>
          </div>
        </FadeUp>
      </section>

      {/* Sticky bottom CTA (mobile) */}
      <div className="sticky bottom-0 z-40 px-5 pb-5 pt-3 bg-gradient-to-t from-bg to-transparent pointer-events-none">
        <div className="pointer-events-auto">
          <Link to="/dashboard">
            <Button
              id="sticky-cta"
              variant="gradient"
              size="lg"
              className="w-full font-bold shadow-[0_8px_24px_rgba(0,0,0,0.18)]"
            >
              Start Free Challenge
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="px-5 py-8 border-t border-border-muted text-center">
        <div className="flex items-center justify-center gap-2 mb-3">
          <div className="w-6 h-6 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-xs font-black text-white">AB</span>
          </div>
          <span className="font-bold text-foreground">ABTalks</span>
        </div>
        <p className="text-xs text-subtle">
          Built for Indian college students. Free forever.
        </p>
        <div className="flex items-center justify-center gap-4 mt-4">
          {[
            { to: '/', label: 'Home' },
            { to: '/dashboard', label: 'Dashboard' },
            { to: '/day/12', label: 'Day 12' },
          ].map(({ to, label }) => (
            <Link key={to} to={to} className="min-h-11 inline-flex items-center text-xs text-subtle hover:text-muted transition-colors">
              {label}
            </Link>
          ))}
        </div>
      </footer>
    </div>
  );
}
