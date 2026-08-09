import { Lock } from 'lucide-react';
import { motion } from 'framer-motion';
import { achievements, type Achievement } from '@/lib/mock-data';
import { cn } from '@/lib/utils';

interface AchievementGridProps {
  items?: Achievement[];
}

/** Compact 4-across shelf of earned/unearned badges. */
export default function AchievementGrid({ items = achievements.slice(0, 4) }: AchievementGridProps) {
  return (
    <div className="grid grid-cols-4 gap-2">
      {items.map((achievement, i) => (
        <motion.div
          key={achievement.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.05 + i * 0.05 }}
          className={cn(
            'relative min-h-24 rounded-2xl border p-2 text-center shadow-[0_4px_24px_rgba(0,0,0,0.2)]',
            achievement.earned ? 'border-primary/30 bg-primary/10' : 'border-border bg-surface opacity-55'
          )}
          title={`${achievement.title}: ${achievement.description}`}
        >
          <span className={cn('block text-xl', achievement.earned ? '' : 'grayscale')} aria-hidden="true">
            {achievement.icon}
          </span>
          <span className={cn('mt-1 block text-[9px] font-semibold leading-tight', achievement.earned ? 'text-foreground' : 'text-subtle')}>
            {achievement.title}
          </span>
          {!achievement.earned && (
            <span className="absolute right-1.5 top-1.5 text-subtle/60" aria-label="Locked">
              <Lock className="h-3 w-3" />
            </span>
          )}
        </motion.div>
      ))}
    </div>
  );
}
