'use client';

import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

interface CountUpProps {
  end: number;
  duration?: number;
  delay?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}

/** Animates a number from 0 → end with an easeOut curve on mount. Respects reduced motion. */
export default function CountUp({ end, duration = 1100, delay = 0, prefix = '', suffix = '', className }: CountUpProps) {
  const reduced = useReducedMotion();
  const [value, setValue] = useState(() => (reduced ? end : 0));
  const startRef = useRef<number | null>(null);

  useEffect(() => {
    if (reduced) return; // already rendered at the final value
    let raf = 0;
    startRef.current = null;
    const tick = (now: number) => {
      if (startRef.current === null) startRef.current = now;
      const elapsed = now - startRef.current - delay;
      const progress = Math.min(1, Math.max(0, elapsed / duration));
      const eased = 1 - Math.pow(1 - progress, 4);
      setValue(Math.round(eased * end));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [end, duration, delay, reduced]);

  return (
    <span className={className} aria-live="off">
      {prefix}
      {value.toLocaleString('en-IN')}
      {suffix}
    </span>
  );
}
