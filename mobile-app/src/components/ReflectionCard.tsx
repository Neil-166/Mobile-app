import { useEffect, useState } from 'react';
import { CheckCircle2, NotebookPen } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { microWin } from '@/components/MicroWin';
import { STORAGE_KEYS, storageGet, storageSet, todayKey } from '@/lib/storage';

const MAX_CHARS = 500;

interface ReflectionEntry {
  date: string;
  text: string;
}

/**
 * 2-minute nightly reflection. One line, stored locally, upserted per day.
 * A tiny habit — but it compounds into a visible learning record.
 */
export default function ReflectionCard() {
  const [text, setText] = useState('');
  const [saved, setSaved] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const entries = storageGet<ReflectionEntry[]>(STORAGE_KEYS.dailyReflections) ?? [];
    setCount(entries.length);
    const todayEntry = entries.find((entry) => entry.date === todayKey());
    if (todayEntry) {
      setText(todayEntry.text);
      setSaved(true);
    }
  }, []);

  const handleSave = () => {
    const trimmed = text.trim();
    if (!trimmed) {
      toast('Write a line first — even one sentence counts.');
      return;
    }
    const entries = storageGet<ReflectionEntry[]>(STORAGE_KEYS.dailyReflections) ?? [];
    const today = todayKey();
    const existing = entries.findIndex((entry) => entry.date === today);
    const next = existing >= 0 ? entries.map((entry) => (entry.date === today ? { ...entry, text: trimmed } : entry)) : [...entries, { date: today, text: trimmed }];
    storageSet(STORAGE_KEYS.dailyReflections, next);
    setCount(next.length);
    setSaved(true);
    microWin('Reflection saved. Future you will thank you.', '🌙');
  };

  const remaining = MAX_CHARS - text.length;

  return (
    <section aria-labelledby="reflection-title" className="card-pad">
      <div className="mb-1 flex items-center gap-2">
        <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-primary/15">
          <NotebookPen className="h-4 w-4 text-accent" />
        </div>
        <div>
          <h3 id="reflection-title" className="text-sm font-semibold text-foreground">
            2-minute nightly reflection
          </h3>
          <p className="text-[11px] text-subtle">Write one thing you learned today.</p>
        </div>
        <span className="ml-auto shrink-0 rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold text-accent">2 min</span>
      </div>

      <textarea
        id="nightly-reflection"
        value={text}
        onChange={(event) => setText(event.target.value.slice(0, MAX_CHARS))}
        rows={3}
        placeholder="e.g. Mobile-first means designing for constraints first — small screens force clarity."
        aria-label="What did you learn today?"
        className="input-field mt-3 w-full resize-none px-4 py-3 text-sm"
      />

      <div className="mt-2 flex items-center justify-between gap-3">
        <p className="text-[11px] text-subtle">
          {saved ? (
            <span className="flex items-center gap-1 font-semibold text-success">
              <CheckCircle2 className="h-3.5 w-3.5" /> Saved on this device
            </span>
          ) : (
            <span>{count} reflections logged</span>
          )}
        </p>
        <span className={`font-mono text-[11px] tabular-nums ${remaining < 50 ? 'text-warning' : 'text-subtle'}`}>
          {remaining}
        </span>
      </div>

      <Button
        type="button"
        onClick={handleSave}
        variant={saved ? 'success' : 'default'}
        size="sm"
        className="mt-3 w-full font-semibold"
      >
        {saved ? <><CheckCircle2 className="h-4 w-4" /> Update reflection</> : 'Save reflection'}
      </Button>
    </section>
  );
}
