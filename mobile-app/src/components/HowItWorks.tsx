import { motion } from 'framer-motion';
import { howItWorksSteps } from '@/lib/mock-data';

function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.1, 0.25, 1] as const }}
    >
      {children}
    </motion.div>
  );
}

/** The three-step "proof-of-work" loop: pick → build → submit. */
export default function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-bg-elevated px-6 py-12">
      <div className="mx-auto max-w-[560px]">
        <FadeIn>
          <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.15em] text-primary">How it works</p>
          <h2 className="mb-1 text-[24px] font-bold text-foreground">Three steps to a visible streak</h2>
          <p className="mb-8 text-[14px] text-muted">No videos to watch. No lectures. Just build, prove, repeat.</p>
        </FadeIn>

        <div className="relative">
          <div className="absolute left-5 top-5 bottom-5 w-px bg-gradient-to-b from-primary/40 to-transparent" aria-hidden="true" />
          <div className="space-y-7 pl-12">
            {howItWorksSteps.map((step, i) => (
              <FadeIn key={step.step} delay={i * 0.08}>
                <div className="relative">
                  <div
                    className="absolute -left-[2.4rem] grid h-10 w-10 place-items-center rounded-xl border border-border bg-surface text-lg"
                    aria-hidden="true"
                  >
                    {step.icon}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="rounded-md bg-primary/15 px-1.5 py-0.5 text-[10px] font-bold text-accent">
                      Step {step.step}
                    </span>
                  </div>
                  <h3 className="mt-1 text-[17px] font-semibold text-foreground">{step.title}</h3>
                  <p className="mt-1 text-[13px] leading-relaxed text-muted">{step.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
