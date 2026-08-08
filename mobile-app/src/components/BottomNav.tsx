import { Link, useLocation } from 'react-router-dom';
import { Home, LayoutDashboard, Flame, User } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/day/12', label: 'Today', icon: Flame },
  { href: '/profile', label: 'Profile', icon: User },
];

export default function BottomNav() {
  const { pathname } = useLocation();

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-bg-elevated/85 pb-[max(env(safe-area-inset-bottom),0.5rem)] shadow-[0_-1px_0_0_rgba(255,255,255,0.03),0_-12px_32px_-20px_rgba(0,0,0,0.3)] backdrop-blur-xl"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="mx-auto flex max-w-lg items-stretch justify-around px-2">
        {navItems.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href || (href === '/day/12' && pathname.startsWith('/day'));
          return (
            <Link
              key={href}
              to={href}
              className="relative flex min-h-12 flex-1 touch-target flex-col items-center justify-center gap-1 pt-2"
              aria-label={label}
              aria-current={isActive ? 'page' : undefined}
            >
              <motion.div
                whileTap={{ scale: 0.88 }}
                className={cn(
                  'relative flex h-7 w-12 items-center justify-center rounded-full transition-colors duration-200',
                  isActive ? 'text-accent' : 'text-subtle hover:text-muted'
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId="bottom-nav-indicator"
                    className="absolute inset-0 rounded-full bg-primary/15 ring-1 ring-primary/20"
                    transition={{ type: 'spring', stiffness: 420, damping: 30 }}
                  />
                )}
                <Icon className="relative h-[22px] w-[22px]" strokeWidth={isActive ? 2.4 : 2} />
              </motion.div>
              <span
                className={cn(
                  'text-[11px] font-medium transition-colors',
                  isActive ? 'text-foreground' : 'text-subtle'
                )}
              >
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
