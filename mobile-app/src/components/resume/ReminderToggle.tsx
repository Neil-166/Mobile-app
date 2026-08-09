import { useId } from 'react';
import { cn } from '@/lib/utils';

interface ReminderToggleProps {
  checked: boolean;
  onChange: (next: boolean) => void;
  label: string;
  hint?: string;
}

/**
 * Accessible switch (role="switch") for the evening reminder.
 * The ::after pseudo-element pads the hit area to ≥44px while keeping the
 * visible track compact. State is persisted by the parent via localStorage.
 */
export default function ReminderToggle({ checked, onChange, label, hint }: ReminderToggleProps) {
  const labelId = useId();

  return (
    <div className="flex min-h-[64px] items-center justify-between gap-4 rounded-2xl border border-border bg-surface p-4">
      <div className="min-w-0">
        <p id={labelId} className="text-sm font-semibold text-foreground">
          {label}
        </p>
        {hint && <p className="mt-0.5 text-xs leading-snug text-subtle">{hint}</p>}
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-labelledby={labelId}
        onClick={() => onChange(!checked)}
        className={cn(
          'relative h-7 w-12 shrink-0 rounded-full transition-colors duration-200',
          'after:absolute after:-inset-2 after:rounded-full',
          checked ? 'bg-primary' : 'bg-white/10'
        )}
      >
        <span
          aria-hidden="true"
          className={cn(
            'absolute left-0.5 top-1/2 h-6 w-6 -translate-y-1/2 rounded-full bg-white shadow-md transition-transform duration-200',
            checked && 'translate-x-5'
          )}
        />
      </button>
    </div>
  );
}
