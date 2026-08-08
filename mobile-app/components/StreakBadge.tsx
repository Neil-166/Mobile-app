'use client';

import { motion } from 'framer-motion';
import { Flame } from 'lucide-react';

interface StreakBadgeProps {
  streak: number;
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
}

export default function StreakBadge({ streak, size = 'md', animated = true }: StreakBadgeProps) {
  const sizeClasses = {
    sm: 'text-xs px-2.5 py-1 gap-1',
    md: 'text-sm px-3 py-1.5 gap-1.5',
    lg: 'text-base px-4 py-2 gap-2',
  };

  const iconSizes = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  const isOnFire = streak >= 7;
  const isLegendary = streak >= 30;

  return (
    <motion.div
      className={`inline-flex items-center rounded-full font-semibold ${
        isLegendary
          ? 'bg-gradient-to-r from-[#F59E0B] to-[#EF4444] text-white'
          : isOnFire
          ? 'bg-[#F59E0B]/15 text-[#F59E0B] border border-[#F59E0B]/25'
          : 'bg-white/8 text-[#C7C7D1] border border-[#27272F]'
      } ${sizeClasses[size]}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      role="status"
      aria-label={`${streak} day streak`}
    >
      <Flame
        className={`${iconSizes[size]} ${animated && isOnFire ? 'flame-pulse' : ''} flex-shrink-0`}
      />
      <span>{streak} {streak === 1 ? 'day' : 'days'}</span>
    </motion.div>
  );
}
