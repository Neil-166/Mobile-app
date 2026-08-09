import { Award, Briefcase, Users } from 'lucide-react';
import CountUp from '@/components/CountUp';
import { Github } from '@/components/Icons';
import { trustStats, type TrustStat } from '@/lib/mock-data';

const accents: Record<TrustStat['id'], { icon: React.ElementType; color: string }> = {
  students: { icon: Users, color: '#F59E0B' },
  commits: { icon: Github, color: '#22C55E' },
  certificate: { icon: Award, color: '#F97316' },
  portfolio: { icon: Briefcase, color: '#8B5CF6' },
};

/** Realistic-looking traction stats — mocked, but rendered like real product numbers. */
export default function TrustSection() {
  return (
    <section className="px-6 py-12" aria-label="Community numbers">
      <div className="mx-auto max-w-[560px]">
        <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-primary mb-1">Community</p>
        <h2 className="mb-1 text-[24px] font-bold text-foreground">A movement, not a course</h2>
        <p className="mb-6 text-[14px] text-muted">Real students building in public, one commit at a time.</p>

        <div className="grid grid-cols-2 gap-3">
          {trustStats.map((stat) => {
            const { icon: Icon, color } = accents[stat.id];
            return (
              <div
                key={stat.id}
                className="card card-hover relative overflow-hidden rounded-2xl border border-border bg-surface p-4 shadow-[0_4px_24px_rgba(0,0,0,0.2)]"
              >
                <div
                  className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full"
                  style={{ background: `radial-gradient(circle, ${color}14 0%, transparent 70%)` }}
                  aria-hidden="true"
                />
                <div
                  className="relative mb-3 grid h-10 w-10 place-items-center rounded-xl"
                  style={{ background: `${color}1a` }}
                >
                  <Icon className="h-5 w-5" style={{ color }} />
                </div>
                <div className="relative min-h-[40px]">
                  {stat.value !== null ? (
                    <CountUp
                      end={stat.value}
                      suffix={stat.suffix ?? ''}
                      className="text-[28px] font-extrabold leading-none tracking-tight text-foreground"
                    />
                  ) : (
                    <p className="text-[22px] font-extrabold leading-tight tracking-tight text-foreground">{stat.display}</p>
                  )}
                </div>
                <p className="relative mt-1.5 text-[12px] font-medium text-muted">{stat.label}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
