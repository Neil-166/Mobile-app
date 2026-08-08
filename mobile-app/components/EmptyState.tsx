'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export type EmptyStateVariant = 'first-day' | 'missed-day' | 'empty-profile' | 'no-submissions';

const content: Record<EmptyStateVariant, { emoji: string; accent: string; soft: string }> = {
  'first-day': { emoji: '🌱', accent: '#8B5CF6', soft: 'rgba(139,92,246,0.18)' },
  'missed-day': { emoji: '🌤️', accent: '#F59E0B', soft: 'rgba(245,158,11,0.16)' },
  'empty-profile': { emoji: '🧩', accent: '#22D3EE', soft: 'rgba(34,211,238,0.16)' },
  'no-submissions': { emoji: '📦', accent: '#A78BFA', soft: 'rgba(139,92,246,0.14)' },
};

interface EmptyStateProps {
  variant: EmptyStateVariant;
  title: string;
  body: string;
  className?: string;
  children?: React.ReactNode;
}

/** Encouraging, shape-drawn illustration + copy for empty states. Never guilt-inducing. */
export default function EmptyState({ variant, title, body, className, children }: EmptyStateProps) {
  const { emoji, accent, soft } = content[variant];

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-3xl border border-[#27272F] bg-[#16161D] p-6 text-center',
        className
      )}
    >
      {/* Soft ambient glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-40 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        style={{ background: soft }}
        aria-hidden="true"
      />

      {/* Illustration */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85, y: 8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        className="relative mx-auto mb-4 h-20 w-20"
        aria-hidden="true"
      >
        {/* Ring */}
        <div className="absolute inset-0 rounded-full border" style={{ borderColor: `${accent}40` }} />
        {/* Inner orb */}
        <div
          className="absolute inset-2 grid place-items-center rounded-full text-3xl"
          style={{ background: `linear-gradient(135deg, ${soft} 0%, rgba(255,255,255,0.03) 100%)` }}
        >
          {emoji}
        </div>
        {/* Floating shapes */}
        <div
          className="absolute -right-1 top-1 h-2.5 w-2.5 rounded-sm"
          style={{ background: `${accent}60` }}
        />
        <div
          className="absolute -left-1 bottom-3 h-2 w-2 rounded-full"
          style={{ background: `${accent}40` }}
        />
        <div className="absolute right-2 -bottom-1 h-1.5 w-1.5 rounded-full bg-white/20" />
      </motion.div>

      <p className="relative text-base font-bold text-white">{title}</p>
      <p className="relative mx-auto mt-1.5 max-w-60 text-xs leading-relaxed text-[#8B8B99]">{body}</p>

      {children && <div className="relative mt-4">{children}</div>}
    </div>
  );
}
