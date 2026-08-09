import { ArrowRight, TriangleAlert } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { missedDayFlow } from '@/lib/mock-data';

interface MissedDayBannerProps {
  onResume: () => void;
}

/** Warning card shown on the dashboard when a challenge day was missed. */
export default function MissedDayBanner({ onResume }: MissedDayBannerProps) {
  const { missedDay, copy } = missedDayFlow;

  return (
    <div
      className="relative overflow-hidden rounded-2xl border border-warning/25 bg-warning/[0.06] p-4 shadow-[0_4px_24px_rgba(0,0,0,0.2)]"
      role="alert"
      aria-live="polite"
    >
      <div
        className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(255,90,0,0.10) 0%, transparent 70%)' }}
        aria-hidden="true"
      />

      <div className="relative flex items-start gap-3">
        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-warning/15">
          <TriangleAlert className="h-5 w-5 text-warning" aria-hidden="true" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-bold text-foreground">{copy.bannerTitle}</p>
          <p className="mt-0.5 text-xs leading-snug text-muted">{copy.bannerBody}</p>
          <p className="mt-1 text-[11px] text-subtle">Day {missedDay} · streak paused</p>
        </div>
      </div>

      <Button
        onClick={onResume}
        variant="secondary"
        size="sm"
        className="relative mt-3 w-full min-h-12 border-warning/30 text-warning hover:bg-warning/10 hover:text-warning"
      >
        {copy.bannerCta} <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </Button>
    </div>
  );
}
