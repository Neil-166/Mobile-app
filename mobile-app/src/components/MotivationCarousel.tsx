import { Flame, MoveHorizontal } from 'lucide-react';
import { motion } from 'framer-motion';
import { motivationStudents } from '@/lib/mock-data';
import { getAvatarColor } from '@/lib/utils';

/** Horizontal snap carousel of live student streaks — social proof you can flick through. */
export default function MotivationCarousel() {
  return (
    <section className="px-6 py-12">
      <div className="mx-auto max-w-[560px]">
        <div className="mb-3 flex items-end justify-between">
          <div>
            <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.15em] text-primary">Real streaks</p>
            <h2 className="text-[24px] font-bold text-foreground">They show up every day</h2>
          </div>
          <span className="mb-1 flex items-center gap-1 text-[11px] text-subtle">
            <MoveHorizontal className="h-3.5 w-3.5" /> Swipe
          </span>
        </div>

        <div className="no-scrollbar -mx-6 flex snap-x snap-mandatory gap-3 overflow-x-auto px-6 pb-2" role="list" aria-label="Student streak examples">
          {motivationStudents.map((student, i) => (
            <motion.div
              key={student.name}
              role="listitem"
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: i * 0.04 }}
              className="card w-[260px] shrink-0 snap-center rounded-2xl border border-border bg-surface p-4 shadow-[0_4px_24px_rgba(0,0,0,0.2)]"
            >
              <div className="flex items-center gap-3">
                <div
                  className="grid h-11 w-11 shrink-0 place-items-center rounded-xl text-sm font-bold text-white"
                  style={{ background: getAvatarColor(student.avatar) }}
                  aria-hidden="true"
                >
                  {student.avatar}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[14px] font-semibold text-foreground">{student.name}</p>
                  <p className="truncate text-[11px] text-subtle">{student.college}</p>
                </div>
                <div className="shrink-0 rounded-full border border-warning/25 bg-warning/10 px-2.5 py-1 text-center">
                  <Flame className="mx-auto h-3.5 w-3.5 text-warning flame-pulse" />
                  <span className="text-[11px] font-bold text-warning">{student.streak}</span>
                </div>
              </div>

              <div className="mt-3 flex items-center gap-1.5">
                <span className="rounded-md bg-accent/10 px-1.5 py-0.5 text-[10px] font-semibold text-accent">Day {student.day}</span>
                <span className="rounded-md bg-white/5 px-1.5 py-0.5 text-[10px] font-medium text-subtle">{student.track}</span>
              </div>

              <p className="mt-3 text-[13px] leading-relaxed text-muted">&ldquo;{student.quote}&rdquo;</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
