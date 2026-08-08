'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap } from 'lucide-react';

type EnergyLevel = 'tired' | 'okay' | 'energized' | null;

const energyOptions = [
  { id: 'tired', emoji: '😴', label: 'Tired', color: '#6366F1' },
  { id: 'okay', emoji: '🙂', label: 'Okay', color: '#22D3EE' },
  { id: 'energized', emoji: '⚡', label: 'Energized', color: '#22C55E' },
] as const;

const encouragementMessages: Record<NonNullable<EnergyLevel>, string> = {
  tired:
    "That's okay. Do the minimum today — one commit, one line of progress. Showing up matters more than how you feel.",
  okay:
    "Good enough to build something small. Today's task is manageable. Take it one step at a time.",
  energized:
    "Let’s go! Use this energy well — tackle today’s task fully and push something you’re proud of.",
};

interface EnergyCheckinProps {
  onSelect?: (level: EnergyLevel) => void;
}

export default function EnergyCheckin({ onSelect }: EnergyCheckinProps) {
  const [selected, setSelected] = useState<EnergyLevel>(null);
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  const handleSelect = (level: NonNullable<EnergyLevel>) => {
    setSelected(level);
    onSelect?.(level);
  };

  return (
    <div className="rounded-2xl border border-[#27272A] bg-[#16161A] p-4">
      <div className="flex items-center gap-2 mb-3">
        <Zap className="w-4 h-4 text-[#F59E0B]" />
        <h3 className="text-sm font-semibold text-white">Energy Check-in</h3>
      </div>

      <p className="text-xs text-zinc-500 mb-4">How are you feeling right now?</p>

      <div className="grid grid-cols-3 gap-2 mb-3">
        {energyOptions.map((option) => (
          <button
            key={option.id}
            id={`energy-${option.id}`}
            onClick={() => handleSelect(option.id)}
            className={`flex flex-col items-center gap-1.5 py-3 px-2 rounded-xl border transition-all duration-200 ${
              selected === option.id
                ? 'border-current bg-current/10 scale-105'
                : 'border-[#27272A] bg-white/5 hover:bg-white/10'
            }`}
            style={selected === option.id ? { borderColor: option.color, color: option.color } : {}}
            aria-pressed={selected === option.id}
          >
            <span className="text-2xl" role="img" aria-label={option.label}>
              {option.emoji}
            </span>
            <span className="text-xs font-medium text-zinc-400">{option.label}</span>
          </button>
        ))}
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="mt-2 p-3 rounded-xl bg-white/5 border border-[#27272A]">
              <p className="text-xs text-zinc-300 leading-relaxed">
                {encouragementMessages[selected]}
              </p>
            </div>
            <button
              onClick={() => setDismissed(true)}
              className="mt-3 w-full text-xs text-zinc-600 hover:text-zinc-400 transition-colors py-1"
            >
              Got it, let&apos;s go →
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
