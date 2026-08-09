import { forwardRef, useRef, useState } from 'react';
import { toPng } from 'html-to-image';
import { CheckCircle, Download, Flame, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { microWin } from '@/components/MicroWin';
import { currentStudent } from '@/lib/mock-data';
import { copyToClipboard } from '@/lib/utils';

interface MomentumCardProps {
  day: number;
  streak: number;
  projectName: string;
  githubUrl?: string;
}

const CARD_W = 1080;
const CARD_H = 1920;

/** Off-screen, fixed-pixel 9:16 render that html-to-image captures into a PNG. */
const ExportCard = forwardRef<HTMLDivElement, MomentumCardProps>(function ExportCard(
  { day, streak, projectName, githubUrl },
  ref
) {
  return (
    <div
      ref={ref}
      id="momentum-export-node"
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: -9999,
        width: CARD_W,
        height: CARD_H,
        borderRadius: 72,
        overflow: 'hidden',
        background: 'linear-gradient(165deg, #0F1115 0%, #151821 48%, #151821 100%)',
        color: '#F8FAFC',
        fontFamily: 'Inter, -apple-system, "Segoe UI", sans-serif',
        display: 'flex',
        flexDirection: 'column',
        padding: 88,
        boxSizing: 'border-box',
      }}
    >
      {/* Ambient glows */}
      <div style={{ position: 'absolute', top: -180, right: -180, width: 620, height: 620, borderRadius: 999, background: 'radial-gradient(circle, rgba(245,158,11,0.4) 0%, transparent 70%)' }} />
      <div style={{ position: 'absolute', bottom: -220, left: -160, width: 560, height: 560, borderRadius: 999, background: 'radial-gradient(circle, rgba(217,119,6,0.2) 0%, transparent 70%)' }} />
      {/* Grid dots */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)',
          backgroundSize: '52px 52px',
        }}
      />

      {/* Branding */}
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 24 }}>
        <div style={{ width: 88, height: 88, borderRadius: 26, background: 'linear-gradient(135deg,#F59E0B,#F97316)', display: 'grid', placeItems: 'center', fontSize: 34, fontWeight: 900 }}>AB</div>
        <div>
          <div style={{ fontSize: 40, fontWeight: 800, letterSpacing: '-0.01em' }}>ABTalks</div>
          <div style={{ fontSize: 26, color: '#F97316', fontWeight: 600 }}>60-Day Challenge</div>
        </div>
      </div>

      {/* Day number */}
      <div style={{ position: 'relative', marginTop: 96 }}>
        <div style={{ fontSize: 26, fontWeight: 700, letterSpacing: '0.18em', color: '#F97316', textTransform: 'uppercase' }}>Day</div>
        <div style={{ fontSize: 330, fontWeight: 900, lineHeight: 0.95, letterSpacing: '-0.03em', marginTop: 8 }}>{day}</div>
        <div style={{ fontSize: 34, color: '#94A3B8', fontWeight: 500, marginTop: 12 }}>of 60</div>
      </div>

      {/* Streak flame */}
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 16, marginTop: 56, alignSelf: 'flex-start', padding: '18px 30px', borderRadius: 999, background: 'rgba(231,165,58,0.12)', border: '1px solid rgba(231,165,58,0.3)' }}>
        <Flame style={{ color: '#E7A53A' }} size={44} fill="#E7A53A" />
        <div style={{ fontSize: 44, fontWeight: 800, color: '#D4952F' }}>{streak}</div>
        <div style={{ fontSize: 24, color: '#CBD5E1', fontWeight: 500 }}>day streak</div>
      </div>

      {/* Project card */}
      <div style={{ position: 'relative', marginTop: 48, padding: '36px 40px', borderRadius: 40, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)' }}>
        <div style={{ fontSize: 22, color: '#94A3B8', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase' }}>Today&apos;s build</div>
        <div style={{ fontSize: 46, fontWeight: 700, marginTop: 10, lineHeight: 1.15, letterSpacing: '-0.01em' }}>{projectName}</div>
      </div>

      {/* GitHub proof badge */}
      <div style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', gap: 14, alignSelf: 'flex-start', marginTop: 28, padding: '16px 28px', borderRadius: 999, background: 'rgba(56,180,106,0.14)', border: '1px solid rgba(56,180,106,0.35)' }}>
        <CheckCircle style={{ color: '#3DA86A' }} size={34} />
        <div style={{ fontSize: 26, color: '#3DA86A', fontWeight: 700 }}>{githubUrl ? 'GitHub verified' : 'Building in public'}</div>
      </div>

      {/* Footer */}
      <div style={{ position: 'relative', marginTop: 'auto' }}>
        <div style={{ fontSize: 30, fontWeight: 600 }}>{currentStudent.name} · {currentStudent.college}</div>
        <div style={{ fontSize: 24, color: '#F97316', fontWeight: 600, marginTop: 8 }}>#ABTalks60 · Built in public</div>
      </div>
    </div>
  );
});

export default function MomentumCard(props: MomentumCardProps) {
  const { day, projectName, githubUrl } = props;
  const [downloaded, setDownloaded] = useState(false);
  const exportNodeRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    const node = exportNodeRef.current;
    if (!node) return;
    try {
      const dataUrl = await toPng(node, {
        width: CARD_W,
        height: CARD_H,
        pixelRatio: 2,
        cacheBust: true,
      });
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = `abtalks-day-${day}-momentum.png`;
      link.click();
      setDownloaded(true);
      microWin(`Momentum card saved as PNG. Share it wide.`, '🖼️');
      window.setTimeout(() => setDownloaded(false), 3000);
    } catch {
      microWin('Card is ready in your browser — try sharing instead.', '📎');
    }
  };

  const handleShare = async () => {
    const message = `I just completed Day ${day} of the ABTalks 60-Day Challenge! 🔥`;
    if (navigator.share) {
      await navigator.share({ title: `Day ${day} — ABTalks 60`, text: message });
      return;
    }
    await copyToClipboard(message);
    microWin('Momentum message copied.', '📋');
  };

  return (
    <div className="space-y-4">
      {/* Visible 9:16 preview */}
      <div
        id="momentum-card-preview"
        className="relative mx-auto aspect-[9/16] w-full max-w-[300px] overflow-hidden rounded-[2rem] border border-primary/25 p-5 shadow-[0_4px_24px_rgba(0,0,0,0.2)]"
        style={{ background: 'linear-gradient(165deg, #0F1115 0%, #151821 48%, #151821 100%)' }}
      >
        <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full" style={{ background: 'radial-gradient(circle, rgba(245,158,11,0.35) 0%, transparent 70%)' }} aria-hidden="true" />
        <div className="pointer-events-none absolute -bottom-20 -left-14 h-44 w-44 rounded-full" style={{ background: 'radial-gradient(circle, rgba(217,119,6,0.18) 0%, transparent 70%)' }} aria-hidden="true" />
        <div
          className="pointer-events-none absolute inset-0"
          style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)', backgroundSize: '26px 26px' }}
          aria-hidden="true"
        />

        {/* Branding */}
        <div className="relative flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-primary to-[#F97316] text-xs font-black text-white">AB</div>
          <div>
            <p className="text-sm font-extrabold tracking-tight text-foreground">ABTalks</p>
            <p className="text-[10px] font-semibold text-accent">60-Day Challenge</p>
          </div>
        </div>

        {/* Day number */}
        <div className="relative mt-8">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent">Day</p>
          <p className="mt-1 text-[64px] font-black leading-none tracking-tight text-foreground">{day}</p>
          <p className="mt-1 text-xs text-subtle">of 60</p>
        </div>

        {/* Streak flame */}
        <div className="relative mt-5 inline-flex items-center gap-2 rounded-full border border-warning/30 bg-warning/10 px-3.5 py-1.5">
          <Flame className="h-5 w-5 text-warning flame-pulse" />
          <span className="text-base font-extrabold text-warning">{props.streak}</span>
          <span className="text-[10px] font-medium text-muted">day streak</span>
        </div>

        {/* Project */}
        <div className="relative mt-5 rounded-2xl border border-white/10 bg-white/[0.05] p-3.5">
          <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-subtle">Today&apos;s build</p>
          <p className="mt-1 text-sm font-bold leading-snug text-foreground">{projectName}</p>
        </div>

        {/* GitHub proof */}
        <div className="relative mt-3 inline-flex items-center gap-1.5 rounded-full border border-success/35 bg-success/10 px-3 py-1">
          <CheckCircle className="h-3.5 w-3.5 text-success" />
          <span className="text-[10px] font-bold text-success">{githubUrl ? 'GitHub verified' : 'Building in public'}</span>
        </div>

        {/* Footer */}
        <div className="relative mt-auto pt-6">
          <p className="text-[11px] font-semibold text-foreground">{currentStudent.name} · {currentStudent.college}</p>
          <p className="mt-1 text-[10px] font-semibold text-accent">#ABTalks60 · Built in public</p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <Button
          id="download-momentum-card"
          onClick={() => { void handleDownload(); }}
          variant={downloaded ? 'success' : 'default'}
          className="flex-1"
          size="sm"
        >
          {downloaded ? <><CheckCircle className="h-4 w-4" /> Saved!</> : <><Download className="h-4 w-4" /> Download Card (PNG)</>}
        </Button>
        <Button
          id="share-momentum-card"
          variant="outline"
          size="sm"
          onClick={() => { void handleShare(); }}
          aria-label="Share your momentum card"
        >
          <Share2 className="h-4 w-4" />
        </Button>
      </div>

      {/* Off-screen export source (position: fixed, left: -9999 — renders for capture) */}
      <ExportCard ref={exportNodeRef} {...props} />
    </div>
  );
}
