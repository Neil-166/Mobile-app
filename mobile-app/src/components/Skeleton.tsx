import { cn } from '@/lib/utils';

interface SkeletonProps {
  className?: string;
}

/** Shimmering placeholder block used as a loading state for lazy content. */
export default function Skeleton({ className }: SkeletonProps) {
  return <div className={cn('shimmer rounded-xl bg-white/[0.03]', className)} aria-hidden="true" />;
}
