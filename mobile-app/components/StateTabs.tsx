'use client';

import { motion } from 'framer-motion';
import { LayoutGrid, Rocket, LifeBuoy, UserRound } from 'lucide-react';
import { cn } from '@/lib/utils';

export type DashboardTab = 'active' | 'first-day' | 'missed-day' | 'empty-profile';

const tabs: { id: DashboardTab; label: string; icon: typeof LayoutGrid }[] = [
  { id: 'active', label: 'Dashboard', icon: LayoutGrid },
  { id: 'first-day', label: 'Start', icon: Rocket },
  { id: 'missed-day', label: 'Missed', icon: LifeBuoy },
  { id: 'empty-profile', label: 'Profile', icon: UserRound },
];

interface StateTabsProps {
  value: DashboardTab;
  onChange: (tab: DashboardTab) => void;
}

/** 4-column icon segmented control for the dashboard. 48px minimum touch targets. */
export default function StateTabs({ value, onChange }: StateTabsProps) {
  return (
    <div
      className="grid grid-cols-4 gap-1 rounded-2xl border border-[#27272F] bg-[#0B0B10]/80 p-1"
      role="tablist"
      aria-label="Dashboard views"
    >
      {tabs.map(({ id, label, icon: Icon }) => {
        const isActive = value === id;
        return (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={isActive}
            aria-label={`View: ${label}`}
            onClick={() => onChange(id)}
            className={cn(
              'relative flex min-h-12 flex-col items-center justify-center gap-0.5 rounded-xl text-[11px] font-semibold transition-colors duration-200',
              isActive ? 'text-white' : 'text-[#8B8B99] hover:text-[#C7C7D1]'
            )}
          >
            {isActive && (
              <motion.span
                layoutId="state-tab-pill"
                className="absolute inset-0 rounded-xl bg-gradient-to-br from-[#8B5CF6]/30 to-[#22D3EE]/15 shadow-[0_0_0_1px_rgba(139,92,246,0.35)]"
                transition={{ type: 'spring', stiffness: 420, damping: 32 }}
              />
            )}
            <Icon
              className={cn('relative h-[22px] w-[22px]', isActive && 'text-[#A78BFA]')}
              strokeWidth={isActive ? 2.4 : 2}
            />
            <span className="relative">{label}</span>
          </button>
        );
      })}
    </div>
  );
}
