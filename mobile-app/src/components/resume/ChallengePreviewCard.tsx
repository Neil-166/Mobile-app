import { ArrowRight, Clock, Zap } from 'lucide-react';

interface ChallengePreviewCardProps {
  day: number;
  title: string;
  estimatedTime: string;
  description: string;
}

/** Compact "tonight's challenge" card shown inside the resume flow. */
export default function ChallengePreviewCard({ day, title, estimatedTime, description }: ChallengePreviewCardProps) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-primary/25 bg-primary/[0.06] p-4 shadow-[0_4px_24px_rgba(0,0,0,0.2)]">
      <div
        className="pointer-events-none absolute -right-10 -top-12 h-28 w-28 rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(245,158,11,0.12) 0%, transparent 70%)' }}
        aria-hidden="true"
      />

      <div className="relative flex items-center gap-3">
        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/15">
          <Zap className="h-5 w-5 text-accent" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-accent">Tonight&apos;s challenge</p>
          <h4 className="mt-0.5 truncate text-[15px] font-bold text-foreground">
            Day {day} — {title}
          </h4>
        </div>
        <ArrowRight className="h-4 w-4 shrink-0 text-subtle" aria-hidden="true" />
      </div>

      <div className="relative mt-3 flex items-center gap-2 text-[11px] text-subtle">
        <Clock className="h-3.5 w-3.5 text-accent/80" aria-hidden="true" />
        <span>Estimated time · {estimatedTime}</span>
      </div>
      <p className="relative mt-2 text-xs leading-relaxed text-muted">{description}</p>
    </div>
  );
}
