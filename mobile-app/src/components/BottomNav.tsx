import { Link, useLocation } from 'react-router-dom';
import { Home, LayoutDashboard, Flame, User } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/home', label: 'Home', icon: Home },
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/day/12', label: 'Day', icon: Flame },
  { href: '/profile', label: 'Profile', icon: User },
];

export default function BottomNav() {
  const { pathname } = useLocation();

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-[rgba(255,255,255,0.06)] bg-[rgba(9,9,11,0.88)] pb-[max(env(safe-area-inset-bottom),0.5rem)] backdrop-blur-xl"
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
              className="relative flex min-h-14 flex-1 flex-col items-center justify-center gap-1"
              aria-label={label}
              aria-current={isActive ? 'page' : undefined}
            >
              <motion.div
                whileTap={{ scale: 0.88 }}
                className={cn(
                  'relative flex h-8 w-14 items-center justify-center rounded-full transition-colors duration-200',
                  isActive ? 'text-primary' : 'text-[#94A3B8] hover:text-[#CBD5E1]'
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId="bottom-nav-indicator"
                    className="absolute inset-0 rounded-full bg-primary/15"
                    transition={{ type: 'spring', stiffness: 420, damping: 30 }}
                  />
                )}
                <Icon className="relative h-5 w-5" strokeWidth={isActive ? 2.4 : 1.8} />
              </motion.div>
              <span
                className={cn(
                  'text-[10px] font-semibold uppercase tracking-[0.1em] transition-colors',
                  isActive ? 'text-primary' : 'text-[#94A3B8]'
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
