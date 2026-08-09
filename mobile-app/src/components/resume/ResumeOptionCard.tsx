import { Check } from 'lucide-react';
import type { ResumeOption } from '@/lib/mock-data';
import { cn } from '@/lib/utils';

interface ResumeOptionCardProps {
  value: ResumeOption;
  title: string;
  description: string;
  icon: React.ReactNode;
  selected: boolean;
  onSelect: (value: ResumeOption) => void;
}

/**
 * Selectable continue/redo card. Uses a native (visually hidden) radio input so
 * screen readers announce a proper radio group; the entire card is the label,
 * so the tap target is the full card (comfortably above 44px).
 */
export default function ResumeOptionCard({ value, title, description, icon, selected, onSelect }: ResumeOptionCardProps) {
  return (
    <label
      className={cn(
        'relative flex min-h-[76px] cursor-pointer items-start gap-3 rounded-2xl border p-4 text-left transition-all duration-200 focus-within:ring-2 focus-within:ring-primary/40',
        selected
          ? 'border-primary/60 bg-primary/10'
          : 'border-border bg-surface hover:border-border-muted hover:bg-surface-hover'
      )}
    >
      <input
        type="radio"
        name="resume-option"
        value={value}
        checked={selected}
        onChange={() => onSelect(value)}
        className="peer sr-only"
      />

      {/* Custom radio dot */}
      <span
        aria-hidden="true"
        className={cn(
          'mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full border-2 transition-colors',
          selected ? 'border-primary' : 'border-border bg-white/5'
        )}
      >
        <span className={cn('h-2 w-2 rounded-full bg-primary transition-opacity', selected ? 'opacity-100' : 'opacity-0')} />
      </span>

      {/* Option icon */}
      <span className={cn('grid h-9 w-9 shrink-0 place-items-center rounded-xl', selected ? 'bg-primary/15' : 'bg-white/5')}>
        {icon}
      </span>

      {/* Copy */}
      <span className="min-w-0 flex-1">
        <span className={cn('block text-sm font-bold text-foreground', selected && 'text-accent')}>{title}</span>
        <span className="mt-0.5 block text-xs leading-snug text-subtle">{description}</span>
      </span>

      {/* Selected check badge */}
      <span
        aria-hidden="true"
        className={cn(
          'mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full transition-all',
          selected ? 'bg-primary text-black' : 'bg-white/5 text-transparent'
        )}
      >
        <Check className="h-3 w-3 stroke-[3]" />
      </span>
    </label>
  );
}
