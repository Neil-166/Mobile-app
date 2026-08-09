import { Clock, Code2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface ChallengeHeaderProps {
  dayNumber: number;
  title: string;
  estimatedTime: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  track: string;
}

const difficultyVariant = {
  Beginner: 'success' as const,
  Intermediate: 'warning' as const,
  Advanced: 'destructive' as const,
};

/** Day identity block: day number, title, estimated time, difficulty. */
export default function ChallengeHeader({ dayNumber, title, estimatedTime, difficulty, track }: ChallengeHeaderProps) {
  return (
    <section aria-labelledby="challenge-title">
      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent">Day {dayNumber} of 60</p>
      <h2 id="challenge-title" className="mt-1 text-[26px] font-black leading-tight tracking-[-0.02em] text-foreground">
        {title}
      </h2>
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <Badge variant="secondary" className="gap-1">
          <Clock className="h-3 w-3" /> {estimatedTime}
        </Badge>
        <Badge variant="outline" className="gap-1">
          <Code2 className="h-3 w-3" /> {track}
        </Badge>
        <Badge variant={difficultyVariant[difficulty]}>{difficulty}</Badge>
      </div>
    </section>
  );
}
