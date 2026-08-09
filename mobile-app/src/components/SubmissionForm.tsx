import { AlertCircle, CheckCircle2, ChevronRight, Sparkles } from 'lucide-react';
import { Github, Linkedin } from '@/components/Icons';
import { cn } from '@/lib/utils';

interface SubmissionFormProps {
  githubRepo: string;
  githubCommit: string;
  linkedin: string;
  buildNotes: string;
  isSuccess: boolean;
  checklistDone: boolean;
  onGithubRepoChange: (value: string) => void;
  onGithubCommitChange: (value: string) => void;
  onLinkedinChange: (value: string) => void;
  onBuildNotesChange: (value: string) => void;
  onCopyLinkedInDraft: () => void;
  onGoToChecklist: () => void;
}

function isValidUrl(value: string): boolean {
  if (!value.trim()) return false;
  try { new URL(value); return true; } catch { return false; }
}

const inputClasses =
  'input-field min-h-12 w-full px-4 text-sm';

/** Submission fields + live validation checklist. Disabled once submitted. */
export default function SubmissionForm({
  githubRepo,
  githubCommit,
  linkedin,
  buildNotes,
  isSuccess,
  checklistDone,
  onGithubRepoChange,
  onGithubCommitChange,
  onLinkedinChange,
  onBuildNotesChange,
  onCopyLinkedInDraft,
  onGoToChecklist,
}: SubmissionFormProps) {
  const githubOk = Boolean(githubRepo.trim() || githubCommit.trim());
  const linkedinOk = Boolean(linkedin.trim());
  const buildNotesOk = Boolean(buildNotes.trim());
  const githubRepoValid = !githubRepo.trim() || isValidUrl(githubRepo);
  const githubCommitValid = !githubCommit.trim() || isValidUrl(githubCommit);
  const linkedinValid = !linkedin.trim() || isValidUrl(linkedin);

  return (
    <section aria-labelledby="submission-title" className="space-y-4">
      <div>
        <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-accent">Make it visible</p>
        <h3 id="submission-title" className="mt-1 text-xl font-bold text-foreground">Submit your work</h3>
        <p className="mt-1 text-xs leading-relaxed text-subtle">
          Paste the links to today&apos;s proof. They stay in this browser for the demo.
        </p>
      </div>

      {!checklistDone && !isSuccess && (
        <div className="flex gap-3 rounded-2xl border border-warning/30 bg-warning/[0.07] p-4" role="alert">
          <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-warning" />
          <div>
            <p className="text-sm font-semibold text-warning">Finish the build checklist first</p>
            <p className="mt-1 text-xs leading-relaxed text-warning/80">
              Tick every task above — then submit with confidence.
            </p>
            <button
              type="button"
              onClick={onGoToChecklist}
              className="mt-3 flex min-h-11 items-center text-xs font-semibold text-foreground transition-colors hover:text-accent"
            >
              Go to checklist <ChevronRight className="ml-0.5 h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Proof-of-work requirements — makes the validation obvious */}
      <div className="rounded-2xl border border-border bg-surface p-4 shadow-[0_4px_24px_rgba(0,0,0,0.2)]">
        <p className="text-xs font-semibold text-foreground">Required to submit</p>
        <div className="mt-2 space-y-1.5">
          <p className={cn('flex items-center gap-2 text-[12px]', githubOk ? 'text-success' : 'text-muted')}>
            {githubOk ? <CheckCircle2 className="h-3.5 w-3.5 shrink-0" /> : <span className="ml-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-subtle/50" />}
            At least one GitHub link (repository or commit)
          </p>
          <p className={cn('flex items-center gap-2 text-[12px]', linkedinOk ? 'text-success' : 'text-muted')}>
            {linkedinOk ? <CheckCircle2 className="h-3.5 w-3.5 shrink-0" /> : <span className="ml-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-subtle/50" />}
            A LinkedIn post link
          </p>
          <p className={cn('flex items-center gap-2 text-[12px]', buildNotesOk ? 'text-success' : 'text-muted')}>
            {buildNotesOk ? <CheckCircle2 className="h-3.5 w-3.5 shrink-0" /> : <span className="ml-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-subtle/50" />}
            What you built today
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label htmlFor="github-repo" className="mb-2 flex items-center text-sm font-semibold text-foreground">
            <Github className="mr-2 h-4 w-4 text-muted" /> GitHub repository URL <span className="ml-1 text-danger">*</span>
          </label>
          <input
            id="github-repo"
            type="url"
            disabled={isSuccess}
            placeholder="https://github.com/you/expense-tracker"
            value={githubRepo}
            onChange={(event) => onGithubRepoChange(event.target.value)}
            className={cn(inputClasses, githubRepo && !githubRepoValid && 'border-danger/50')}
            aria-invalid={githubRepo ? !githubRepoValid : undefined}
          />
          {githubRepo && !githubRepoValid && (
            <p className="mt-1.5 text-[11px] text-danger">Enter a valid URL (e.g. https://github.com/...)</p>
          )}
        </div>

        <div>
          <label htmlFor="github-commit" className="mb-2 flex items-center text-sm font-semibold text-foreground">
            <Github className="mr-2 h-4 w-4 text-muted" /> GitHub commit URL
            <span className="ml-auto text-[11px] font-normal text-subtle">optional — repo or commit works</span>
          </label>
          <input
            id="github-commit"
            type="url"
            disabled={isSuccess}
            placeholder="https://github.com/you/expense-tracker/commit/abc123"
            value={githubCommit}
            onChange={(event) => onGithubCommitChange(event.target.value)}
            className={cn(inputClasses, githubCommit && !githubCommitValid && 'border-danger/50')}
            aria-invalid={githubCommit ? !githubCommitValid : undefined}
          />
          {githubCommit && !githubCommitValid && (
            <p className="mt-1.5 text-[11px] text-danger">Enter a valid URL</p>
          )}
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between gap-3">
            <label htmlFor="linkedin-post" className="flex items-center text-sm font-semibold text-foreground">
              <Linkedin className="mr-2 h-4 w-4 text-[#0077B5]" /> LinkedIn post URL <span className="ml-1 text-danger">*</span>
            </label>
            <button
              type="button"
              disabled={isSuccess}
              onClick={onCopyLinkedInDraft}
              className="flex min-h-11 items-center text-xs font-semibold text-primary transition-colors hover:text-accent disabled:opacity-40"
            >
              <Sparkles className="mr-1 inline h-3.5 w-3.5" /> Copy draft
            </button>
          </div>
          <input
            id="linkedin-post"
            type="url"
            disabled={isSuccess}
            placeholder="https://linkedin.com/posts/..."
            value={linkedin}
            onChange={(event) => onLinkedinChange(event.target.value)}
            className={cn(inputClasses, linkedin && !linkedinValid && 'border-danger/50')}
            aria-invalid={linkedin ? !linkedinValid : undefined}
          />
          {linkedin && !linkedinValid && (
            <p className="mt-1.5 text-[11px] text-danger">Enter a valid LinkedIn post URL</p>
          )}
        </div>

        <div>
          <label htmlFor="build-notes" className="mb-2 flex items-center text-sm font-semibold text-foreground">
            What did you build today?
            <span className="ml-auto text-[11px] font-normal text-danger">required</span>
          </label>
          <textarea
            id="build-notes"
            rows={4}
            disabled={isSuccess}
            placeholder="A quick note for your future self and the community..."
            value={buildNotes}
            onChange={(event) => onBuildNotesChange(event.target.value)}
            className={cn('input-field w-full resize-none px-4 py-3 text-sm', buildNotes && !buildNotesOk && 'border-danger/50')}
            aria-invalid={buildNotes ? !buildNotesOk : undefined}
          />
        </div>
      </div>
    </section>
  );
}
