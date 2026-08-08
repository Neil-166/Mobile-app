import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap } from 'lucide-react';

type EnergyLevel = 'tired' | 'okay' | 'energized';

const energyOptions = [
  { id: 'tired', emoji: '😴', label: 'Tired', color: '#97A1B3' },
  { id: 'okay', emoji: '🙂', label: 'Okay', color: '#6F7EF7' },
  { id: 'energized', emoji: '⚡', label: 'Energized', color: '#38B46A' },
] as const;

const encouragementMessages: Record<EnergyLevel, { headline: string; body: string }> = {
  tired: {
    headline: 'Minimum today is fine.',
    body: "One commit, one line, one small step. Showing up matters far more than how you feel. The laptop can close right after.",
  },
  okay: {
    headline: 'Good enough to build something small.',
    body: "Today's task is genuinely manageable. Take it one step at a time — and if you finish early, that's a bonus, not a requirement.",
  },
  energized: {
    headline: 'Use this energy well.',
    body: "You're in the zone — go ahead and finish today's build properly. Momentum like this is precious, ride it.",
  },
};

const STORAGE_KEY = 'abtalks-energy-checkin';

interface EnergyCheckinProps {
  onSelect?: (level: EnergyLevel) => void;
}

interface SavedCheckin {
  level: EnergyLevel;
  date: string; // YYYY-MM-DD
}

function todayKey(): string {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
}

function loadSaved(): SavedCheckin | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as SavedCheckin;
    if (parsed.date !== todayKey()) return null;
    return parsed;
  } catch {
    return null;
  }
}

export default function EnergyCheckin({ onSelect }: EnergyCheckinProps) {
  const saved = loadSaved();
  const [selected, setSelected] = useState<EnergyLevel | null>(saved?.level ?? null);
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  const handleSelect = (level: EnergyLevel) => {
    setSelected(level);
    onSelect?.(level);
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ level, date: todayKey() }));
    } catch {
      /* storage unavailable — the check-in still works for this session */
    }
  };

  const selectedColor = selected ? energyOptions.find((option) => option.id === selected)?.color : undefined;
  const selectedMessage = selected ? encouragementMessages[selected] : null;

  return (
    <div className="card-pad">
      <div className="mb-1 flex items-center gap-2">
        <Zap className="h-4 w-4 text-warning" />
        <h3 className="text-sm font-semibold text-foreground">Energy Check-in</h3>
        {selected && (
          <span className="ml-auto rounded-full bg-success/10 px-2 py-0.5 text-[10px] font-semibold text-success">
            Checked in today
          </span>
        )}
      </div>

      <p className="mb-4 text-xs text-subtle">How are you feeling right now? No wrong answers.</p>

      <div className="grid grid-cols-3 gap-2">
        {energyOptions.map((option) => {
          const isActive = selected === option.id;
          return (
            <button
              key={option.id}
              id={`energy-${option.id}`}
              type="button"
              onClick={() => handleSelect(option.id)}
              className={`flex min-h-[72px] flex-col items-center justify-center gap-1.5 rounded-xl border transition-all duration-200 ${
                isActive ? '' : 'border-border bg-white/[0.04] hover:bg-white/[0.08]'
              }`}
              style={isActive ? { borderColor: option.color, background: `${option.color}14` } : undefined}
              aria-pressed={isActive}
            >
              <motion.span
                className="text-2xl"
                role="img"
                aria-label={option.label}
                animate={isActive ? { scale: 1.15 } : { scale: 1 }}
                transition={{ type: 'spring', stiffness: 400, damping: 16 }}
              >
                {option.emoji}
              </motion.span>
              <span className={`text-xs font-medium ${isActive ? 'text-foreground' : 'text-muted'}`}>{option.label}</span>
            </button>
          );
        })}
      </div>

      <AnimatePresence>
        {selectedMessage && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div
              className="mt-3 rounded-xl border p-3.5"
              style={{ borderColor: `${selectedColor}30`, background: `${selectedColor}0d` }}
              role="status"
              aria-live="polite"
            >
              <p className="text-sm font-semibold text-foreground">{selectedMessage.headline}</p>
              <p className="mt-1 text-xs leading-relaxed text-muted">{selectedMessage.body}</p>
            </div>
            <button
              type="button"
              onClick={() => setDismissed(true)}
              className="mt-3 w-full py-1 text-xs text-subtle transition-colors hover:text-muted"
            >
              Got it, let&apos;s go →
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
