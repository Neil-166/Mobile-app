import { Github, Linkedin } from '@/components/Icons';

/**
 * Empty profile card — shows missing GitHub and LinkedIn links
 * with the message: "Add your GitHub and LinkedIn links so
 * recruiters can discover your work."
 */
export default function EmptyProfileCard() {
  return (
    <div className="rounded-2xl border border-border bg-surface p-5 shadow-[0_4px_24px_rgba(0,0,0,0.2)]">
      <div className="flex items-start gap-3">
        <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white/5">
          <span className="text-xl" aria-hidden="true">🧩</span>
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-bold text-foreground">Complete your profile</p>
          <p className="mt-1 text-xs leading-relaxed text-muted">
            Add your GitHub and LinkedIn links so recruiters can discover your work.
          </p>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2">
        <div className="flex items-center gap-2 rounded-xl border border-border bg-bg-elevated p-3">
          <Github className="h-4 w-4 text-muted" />
          <span className="text-xs text-subtle">GitHub</span>
          <span className="ml-auto text-[10px] font-semibold text-danger">Missing</span>
        </div>
        <div className="flex items-center gap-2 rounded-xl border border-border bg-bg-elevated p-3">
          <Linkedin className="h-4 w-4 text-[#0077B5]" />
          <span className="text-xs text-subtle">LinkedIn</span>
          <span className="ml-auto text-[10px] font-semibold text-danger">Missing</span>
        </div>
      </div>
    </div>
  );
}
