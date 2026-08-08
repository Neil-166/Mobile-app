'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import {
  ArrowRight, Flame, CheckCircle2,
  Star, ChevronDown, Shield, Clock, Code2,
  BookOpen, Trophy, Users,
} from 'lucide-react';
import { Github, Linkedin } from '@/components/Icons';
import HeroPhone from '@/components/HeroPhone';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { socialProofStudents, tracks, faqs } from '@/lib/mock-data';

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
  const heatColors = ['#1F1F26', 'rgba(139,92,246,0.2)', 'rgba(139,92,246,0.4)', 'rgba(139,92,246,0.65)', '#8B5CF6'];

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
    <div className="min-h-screen bg-[#07070A] overflow-x-hidden">
      {/* ===== HERO ===== */}
      <section
        ref={heroRef}
        id="hero"
        className="relative flex min-h-[100svh] flex-col items-center justify-center px-5 pb-16 pt-24 text-center"
      >
        {/* Animated background blobs */}
        <motion.div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)',
            y: heroY,
            opacity: heroOpacity,
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(rgba(139,92,246,0.06) 1px, transparent 1px)',
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
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#8B5CF6]/30 bg-[#8B5CF6]/8 mb-6"
          >
            <Flame className="w-3.5 h-3.5 text-[#F59E0B] flame-pulse" />
            <span className="text-xs font-medium text-zinc-300">1,200+ students. 60 days. Real builds.</span>
          </motion.div>

          <div className="max-w-[300px]">
            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7 }}
              className="text-[1.65rem] sm:text-4xl font-black leading-[1.12] tracking-tight text-balance mb-4"
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
              className="text-[13px] text-[#C7C7D1] leading-relaxed mb-8 text-pretty"
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
            <Link href="/dashboard" className="w-full">
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
              className="flex items-center justify-center gap-2 text-sm text-[#8B8B99] hover:text-zinc-300 transition-colors py-2 touch-target"
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
            className="flex items-center justify-center gap-4 text-xs text-[#8B8B99]/70"
          >
            <div className="flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#22C55E]" />
              <span>Free forever</span>
            </div>
            <div className="flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#22C55E]" />
              <span>No experience required</span>
            </div>
            <div className="flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#22C55E]" />
              <span>Mobile-first</span>
            </div>
          </motion.div>

          {/* Phone mockup — the product, alive */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.85, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="mt-12"
          >
            <HeroPhone />
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
          <ChevronDown className="w-5 h-5 text-[#8B8B99]/50" />
        </motion.div>
      </section>

      {/* ===== SOCIAL PROOF ===== */}
      <section id="social-proof" className="px-5 py-16">
        <FadeUp>
          <div className="text-center mb-8">
            <Badge variant="secondary" className="mb-3">Community</Badge>
            <h2 className="text-2xl font-bold text-white">People who showed up</h2>
            <p className="text-sm text-[#8B8B99] mt-2">Real students. Real streaks. No fake screenshots.</p>
          </div>
        </FadeUp>

        <div className="space-y-3">
          {socialProofStudents.map((student, i) => (
            <FadeUp key={student.name} delay={i * 0.1}>
              <div className="rounded-2xl border border-[#27272F] bg-[#16161D] p-4 card-hover">
                <div className="flex items-start gap-3 mb-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-sm font-bold text-white"
                    style={{ background: `linear-gradient(135deg, #8B5CF6, #22D3EE)` }}
                  >
                    {student.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold text-white truncate">{student.name}</p>
                      <div className="flex items-center gap-1 ml-2">
                        <Flame className="w-3.5 h-3.5 text-[#F59E0B]" />
                        <span className="text-xs font-bold text-[#F59E0B]">{student.streak}</span>
                      </div>
                    </div>
                    <p className="text-xs text-[#8B8B99]">{student.college} · {student.track}</p>
                  </div>
                </div>
                <ContributionGraph seed={i + 1} />
                <p className="text-xs text-[#C7C7D1] mt-3 leading-relaxed italic">&ldquo;{student.quote}&rdquo;</p>
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
              <div key={label} className="rounded-xl border border-[#27272F] bg-[#16161D] p-3 text-center">
                <Icon className="w-4 h-4 text-[#8B5CF6] mx-auto mb-1.5" />
                <p className="text-lg font-bold text-white">{value}</p>
                <p className="text-[10px] text-[#8B8B99]/70">{label}</p>
              </div>
            ))}
          </div>
        </FadeUp>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section id="how-it-works" className="px-5 py-16 bg-[#0B0B10]">
        <FadeUp>
          <div className="text-center mb-10">
            <Badge variant="default" className="mb-3">Process</Badge>
            <h2 className="text-2xl font-bold text-white">How the 60 days work</h2>
            <p className="text-sm text-[#8B8B99] mt-2">Simple, repeatable, measurable.</p>
          </div>
        </FadeUp>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-5 top-5 bottom-5 w-px bg-gradient-to-b from-[#8B5CF6] via-[#22D3EE] to-transparent" aria-hidden="true" />

          <div className="space-y-8 pl-12">
            {[
              {
                step: '01',
                icon: BookOpen,
                title: 'Pick your track',
                description: "Choose Full Stack, AI/ML, Cybersecurity, DSA, or UI/UX. Your track defines your 60-day syllabus.",
                color: '#8B5CF6',
              },
              {
                step: '02',
                icon: Code2,
                title: 'Build something daily',
                description: "Every day has a focused task. It takes 2–4 hours. No tutorial-following — you build real things.",
                color: '#22D3EE',
              },
              {
                step: '03',
                icon: Github,
                title: 'Commit + post publicly',
                description: "Push to GitHub. Write a 3-sentence LinkedIn post. Create a visible public record of your work.",
                color: '#22C55E',
              },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <FadeUp key={item.step} delay={i * 0.15}>
                  <div className="relative">
                    {/* Step dot */}
                    <div
                      className="absolute -left-[2.65rem] w-5 h-5 rounded-full border-2 border-[#07070A] flex items-center justify-center"
                      style={{ background: item.color }}
                      aria-hidden="true"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-white" />
                    </div>

                    <div className="rounded-2xl border border-[#27272F] bg-[#16161D] p-4">
                      <div className="flex items-center gap-3 mb-2">
                        <div
                          className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                          style={{ background: `${item.color}18` }}
                        >
                          <Icon className="w-4 h-4" style={{ color: item.color }} />
                        </div>
                        <div>
                          <span className="text-[10px] font-mono text-[#8B8B99]/70">Step {item.step}</span>
                          <h3 className="text-sm font-semibold text-white leading-tight">{item.title}</h3>
                        </div>
                      </div>
                      <p className="text-xs text-[#C7C7D1] leading-relaxed">{item.description}</p>
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
            <h2 className="text-2xl font-bold text-white">Choose your path</h2>
            <p className="text-sm text-[#8B8B99] mt-2">Five focused paths, each with 60 structured days.</p>
          </div>
        </FadeUp>

        <div className="space-y-3">
          {tracks.map((track, i) => {
            return (
              <FadeUp key={track.id} delay={i * 0.08}>
                <div
                  className="rounded-2xl border bg-[#16161D] p-4 card-hover"
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
                        <h3 className="text-sm font-semibold text-white">{track.name}</h3>
                        <span
                          className="text-[10px] px-2 py-0.5 rounded-full font-medium"
                          style={{ background: `${track.color}15`, color: track.color }}
                        >
                          {track.level}
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-[#C7C7D1] mb-3 leading-relaxed">{track.description}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {track.projects.map((p) => (
                      <span key={p} className="text-[10px] px-2 py-0.5 rounded-md bg-white/5 text-[#8B8B99] border border-[#27272F]">
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
      <section id="after-60" className="px-5 py-16 bg-[#0B0B10]">
        <FadeUp>
          <div className="text-center mb-8">
            <Badge variant="success" className="mb-3">Outcomes</Badge>
            <h2 className="text-2xl font-bold text-white">After 60 days, you&apos;ll have</h2>
            <p className="text-sm text-[#8B8B99] mt-2">Concrete. Verifiable. Yours.</p>
          </div>
        </FadeUp>

        <div className="space-y-2.5">
          {[
            { icon: Github, title: '60 GitHub commits', description: 'A contribution graph that shows you ship consistently.', color: '#8B5CF6' },
            { icon: Linkedin, title: '60 LinkedIn posts', description: 'A public record of what you learned and what you built.', color: '#22D3EE' },
            { icon: Code2, title: '10–15 mini-projects', description: 'Real, working code you can show in interviews.', color: '#22C55E' },
            { icon: Flame, title: 'A daily coding habit', description: "The most underrated skill. You&apos;ll know you can show up.", color: '#F59E0B' },
            { icon: Trophy, title: 'A community of builders', description: 'People who finished alongside you. That matters.', color: '#EC4899' },
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <FadeUp key={item.title} delay={i * 0.08}>
                <div className="flex items-center gap-4 p-4 rounded-2xl border border-[#27272F] bg-[#16161D] card-hover">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: `${item.color}15` }}
                  >
                    <Icon className="w-5 h-5" style={{ color: item.color }} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{item.title}</p>
                    <p className="text-xs text-[#8B8B99] mt-0.5">{item.description}</p>
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
          <div className="rounded-2xl border border-[#8B5CF6]/25 bg-gradient-to-br from-[#8B5CF6]/8 to-[#22D3EE]/5 p-6">
            <div className="flex gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-[#F59E0B] text-[#F59E0B]" />
              ))}
            </div>
            <blockquote className="text-base text-zinc-200 leading-relaxed mb-5 font-medium text-pretty">
              &ldquo;I was skeptical at first. 60 days felt like too much. But the tasks are small enough that I never skipped
              because of difficulty — only because of discipline. ABTalks fixed my discipline problem.&rdquo;
            </blockquote>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#8B5CF6] to-[#22D3EE] flex items-center justify-center font-bold text-sm text-white">
                AK
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Aditya Kumar</p>
                <p className="text-xs text-[#8B8B99]">IIT Bombay · Day 30 · AI/ML Track</p>
              </div>
            </div>
          </div>
        </FadeUp>
      </section>

      {/* ===== COMMITMENT CARD ===== */}
      <section id="commitment" className="px-5 pb-16">
        <FadeUp>
          <div className="rounded-2xl border border-[#27272F] bg-[#16161D] p-5">
            <h2 className="text-lg font-bold text-white mb-1">What you&apos;re signing up for</h2>
            <p className="text-xs text-[#8B8B99] mb-5">Be honest with yourself before starting.</p>

            <div className="space-y-3">
              {[
                { label: 'Daily time commitment', value: '2–4 hours/day', icon: Clock },
                { label: 'GitHub account needed', value: 'Required', icon: Github },
                { label: 'LinkedIn account needed', value: 'Recommended', icon: Linkedin },
                { label: 'Streak shield (per 14 days)', value: '1 protected miss', icon: Shield },
                { label: 'Price', value: 'Free', icon: CheckCircle2 },
              ].map(({ label, value, icon: Icon }) => (
                <div key={label} className="flex items-center justify-between py-2 border-b border-[#27272F] last:border-0">
                  <div className="flex items-center gap-2">
                    <Icon className="w-3.5 h-3.5 text-[#8B8B99]" />
                    <span className="text-xs text-[#C7C7D1]">{label}</span>
                  </div>
                  <span className="text-xs font-semibold text-white">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </FadeUp>
      </section>

      {/* ===== FAQ ===== */}
      <section id="faq" className="px-5 pb-16 bg-[#0B0B10] pt-16">
        <FadeUp>
          <div className="text-center mb-8">
            <Badge variant="ghost" className="mb-3">FAQ</Badge>
            <h2 className="text-2xl font-bold text-white">Common questions</h2>
          </div>
        </FadeUp>

        <FadeUp delay={0.1}>
          <Accordion type="single" collapsible className="space-y-0">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`}>
                <AccordionTrigger className="text-left text-sm">{faq.question}</AccordionTrigger>
                <AccordionContent>
                  <p className="text-sm text-[#C7C7D1] leading-relaxed">{faq.answer}</p>
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
            background: 'radial-gradient(ellipse at center, rgba(139,92,246,0.1) 0%, transparent 70%)',
          }}
          aria-hidden="true"
        />
        <FadeUp>
          <div className="relative z-10">
            <div className="text-5xl mb-4">🔥</div>
            <h2 className="text-3xl font-black text-white mb-3 text-balance">
              Ready to start?
            </h2>
            <p className="text-[#C7C7D1] mb-8 text-pretty text-sm">
              Day 1 is waiting. Your future self will be grateful you started today.
            </p>
            <Link href="/dashboard">
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
            <p className="text-xs text-[#8B8B99]/50 mt-4">Free. No credit card. No sign-up wall.</p>
          </div>
        </FadeUp>
      </section>

      {/* Sticky bottom CTA (mobile) */}
      <div className="sticky bottom-0 z-40 px-5 pb-5 pt-3 bg-gradient-to-t from-[#07070A] to-transparent pointer-events-none">
        <div className="pointer-events-auto">
          <Link href="/dashboard">
            <Button
              id="sticky-cta"
              variant="gradient"
              size="lg"
              className="w-full font-bold shadow-lg shadow-purple-900/40"
            >
              Start Free Challenge
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="px-5 py-8 border-t border-[#1F1F26] text-center">
        <div className="flex items-center justify-center gap-2 mb-3">
          <div className="w-6 h-6 rounded-lg bg-[#8B5CF6] flex items-center justify-center">
            <span className="text-xs font-black text-white">AB</span>
          </div>
          <span className="font-bold text-white">ABTalks</span>
        </div>
        <p className="text-xs text-[#8B8B99]/50">
          Built for Indian college students. Free forever.
        </p>
        <div className="flex items-center justify-center gap-4 mt-4">
          {['/', '/dashboard', '/day/12'].map((route) => (
            <Link key={route} href={route} className="text-xs text-[#8B8B99]/70 hover:text-[#C7C7D1] transition-colors">
              {route === '/' ? 'Home' : route.replace('/', '').replace('/12', ' 12')}
            </Link>
          ))}
        </div>
      </footer>
    </div>
  );
}
