import { ArrowRight, Clock, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { day12Challenge } from '@/lib/mock-data';

/**
 * Tonight's Session card — shows the current challenge with goal and CTA.
 * Used on the dashboard below the dominant Today's Task card.
 */
export default function TonightSessionCard() {
  return (
    <section className="rounded-2xl border border-border bg-surface p-4 shadow-[0_4px_24px_rgba(0,0,0,0.2)]">
      <div className="flex items-center gap-2 mb-2">
        <span className="h-3 w-1 rounded-full bg-primary" aria-hidden="true" />
        <h2 className="text-sm font-semibold text-foreground">Tonight&apos;s session</h2>
      </div>
      <div className="rounded-xl border border-border bg-bg-elevated p-3.5">
        <div className="flex items-start gap-2.5">
          <div className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-primary/15">
            <Zap className="h-4 w-4 text-accent" aria-hidden="true" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[13px] font-bold text-foreground">{day12Challenge.title}</p>
            <div className="mt-1 flex items-center gap-2 text-[11px] text-subtle">
              <Clock className="h-3 w-3" aria-hidden="true" />
              <span>{day12Challenge.estimatedTime} · {day12Challenge.difficulty}</span>
            </div>
          </div>
        </div>
        <p className="mt-2 text-[12px] leading-relaxed text-muted">{day12Challenge.goal}</p>
      </div>
      <Link to="/day/12" className="mt-3 block">
        <Button variant="default" size="sm" className="w-full min-h-12 font-bold">
          Start tonight&apos;s challenge <ArrowRight className="h-4 w-4" />
        </Button>
      </Link>
    </section>
  );
}
