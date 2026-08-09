import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';

/**
 * Subtle floating gradient orbs that drift slowly as the page scrolls (parallax).
 * Kept light for performance (radial gradients, no filter blur) and disabled
 * under prefers-reduced-motion.
 */
export default function AnimatedBackground() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();

  const yTop = useTransform(scrollY, [0, 900], [0, 140]);
  const yBottom = useTransform(scrollY, [0, 900], [0, -100]);
  const yMid = useTransform(scrollY, [0, 900], [0, -60]);

  if (reduced) {
    return (
      <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -right-40 -top-40 h-96 w-96 rounded-full bg-primary/[0.07]" />
        <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-accent/[0.05]" />
      </div>
    );
  }

  return (
    <div ref={ref} className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden="true">
      {/* Primary orb — top right, drifts down */}
      <motion.div
        className="absolute -right-40 -top-40 h-[26rem] w-[26rem] rounded-full"
        style={{
          y: yTop,
          background: 'radial-gradient(circle, rgba(245,158,11,0.10) 0%, transparent 70%)',
        }}
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* Secondary orb — bottom left, drifts up */}
      <motion.div
        className="absolute -bottom-40 -left-40 h-[24rem] w-[24rem] rounded-full"
        style={{
          y: yBottom,
          background: 'radial-gradient(circle, rgba(217,119,6,0.06) 0%, transparent 70%)',
        }}
        animate={{ opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* Mid-page accent */}
      <motion.div
        className="absolute left-1/2 top-1/2 h-[30rem] w-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          y: yMid,
          background: 'radial-gradient(circle, rgba(245,158,11,0.04) 0%, transparent 70%)',
        }}
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  );
}
