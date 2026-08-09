import { CheckCircle2, ListChecks } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { type Requirement } from '@/lib/mock-data';
import { cn } from '@/lib/utils';

interface TaskChecklistProps {
  tasks: Requirement[];
  completedCount: number;
  onToggle: (id: string) => void;
  disabled?: boolean;
}

/** Interactive build checklist — tap tasks as you finish them. */
export default function TaskChecklist({ tasks, completedCount, onToggle, disabled = false }: TaskChecklistProps) {
  const total = tasks.length;
  const percent = Math.round((completedCount / total) * 100);
  const done = completedCount === total;

  return (
    <section aria-labelledby="checklist-title" className="overflow-hidden rounded-2xl border border-border bg-surface shadow-[0_4px_24px_rgba(0,0,0,0.2)]">
      <div className="flex items-center justify-between border-b border-border bg-white/[0.035] p-4">
        <h3 id="checklist-title" className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <ListChecks className="h-4 w-4 text-primary" /> Build checklist
        </h3>
        <span className={cn('text-xs font-bold', done ? 'text-success' : 'text-subtle')}>
          {completedCount}/{total}
        </span>
      </div>

      <div className="px-4 pt-3">
        <div className="h-1 w-full overflow-hidden rounded-full bg-white/8" role="progressbar" aria-valuenow={percent} aria-valuemin={0} aria-valuemax={100} aria-label="Checklist progress">
          <div
            className={cn('progress-bar h-full', done && 'bg-gradient-to-r from-success to-[#3DA86A]')}
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>

      <div className="p-2 pb-3">
        {tasks.map((task) => (
          <label
            key={task.id}
            className={cn(
              'flex min-h-14 cursor-pointer items-start gap-3 rounded-xl p-3 transition-colors',
              task.completed ? 'bg-primary/10' : 'hover:bg-white/5'
            )}
          >
            <Checkbox
              id={`requirement-${task.id}`}
              checked={task.completed}
              onCheckedChange={() => onToggle(task.id)}
              disabled={disabled}
              className="mt-0.5"
            />
            <span
              className={cn(
                'text-sm leading-snug',
                task.completed ? 'text-muted line-through decoration-border-muted' : 'text-foreground'
              )}
            >
              {task.label}
            </span>
            {task.completed && <CheckCircle2 className="ml-auto mt-0.5 h-4 w-4 shrink-0 text-success" aria-hidden="true" />}
          </label>
        ))}
      </div>
    </section>
  );
}
