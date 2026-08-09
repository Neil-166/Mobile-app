import { motion } from 'framer-motion';
import { toast } from 'sonner';

/**
 * A light, spring-loaded celebration toast. Use for micro-wins like
 * "challenge opened", "focus started", "draft copied", "reflection added".
 */
export function microWin(message: string, emoji = '✨') {
  toast.custom(
    () => (
      <motion.div
        initial={{ opacity: 0, y: 28, scale: 0.92 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: 'spring', stiffness: 420, damping: 24 }}
        role="status"
        aria-live="polite"
        className="pointer-events-auto flex items-center gap-3 rounded-2xl border border-border bg-surface/95 px-4 py-3 shadow-[0_4px_24px_rgba(0,0,0,0.2)] backdrop-blur-md"
      >
        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-primary/15 text-base">
          {emoji}
        </span>
        <p className="text-[13px] font-medium leading-snug text-foreground">{message}</p>
      </motion.div>
    ),
    { duration: 2200, position: 'top-center' }
  );
}
