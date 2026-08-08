import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold transition-colors',
  {
    variants: {
      variant: {
        default: 'bg-[#8B5CF6]/15 text-[#8B5CF6] border border-[#8B5CF6]/25',
        secondary: 'bg-[#22D3EE]/10 text-[#22D3EE] border border-[#22D3EE]/20',
        success: 'bg-[#22C55E]/10 text-[#22C55E] border border-[#22C55E]/20',
        warning: 'bg-[#F59E0B]/10 text-[#F59E0B] border border-[#F59E0B]/20',
        destructive: 'bg-red-500/10 text-red-400 border border-red-500/20',
        outline: 'border border-[#27272F] text-[#C7C7D1]',
        ghost: 'bg-white/5 text-zinc-300',
      },
    },
    defaultVariants: { variant: 'default' },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
