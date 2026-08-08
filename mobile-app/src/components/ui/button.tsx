import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold transition-all duration-200 disabled:pointer-events-none disabled:opacity-40 active:scale-[0.98] touch-target',
  {
    variants: {
      variant: {
        default: 'bg-primary text-white hover:bg-primary-hover shadow-[0_8px_24px_rgba(0,0,0,0.18)]',
        secondary: 'bg-primary/10 text-accent border border-primary/25 hover:bg-primary/15',
        ghost: 'text-muted hover:text-foreground hover:bg-white/5',
        outline: 'border border-border bg-transparent text-foreground hover:bg-white/5',
        destructive: 'bg-danger/10 text-danger border border-danger/25 hover:bg-danger/15',
        success: 'bg-success/10 text-success border border-success/25 hover:bg-success/15',
        gradient: 'surface-gradient bg-primary text-white hover:bg-primary-hover shadow-[0_8px_24px_rgba(0,0,0,0.18)]',
        glass: 'glass text-white hover:bg-white/10',
      },
      size: {
        default: 'h-12 px-6 py-3',
        sm: 'h-10 px-4 py-2 text-xs rounded-lg',
        lg: 'h-14 px-8 py-4 text-base',
        xl: 'h-16 px-10 py-5 text-lg rounded-2xl',
        icon: 'h-11 w-11 rounded-xl',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
