'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, LayoutDashboard, Flame, User } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/day/12', label: 'Today', icon: Flame },
  { href: '/dashboard#profile', label: 'Profile', icon: User },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-[#27272F] bg-[#0B0B10]/80 pb-[max(env(safe-area-inset-bottom),0.5rem)] shadow-[0_-1px_0_0_rgba(255,255,255,0.04),0_-16px_40px_-20px_rgba(139,92,246,0.25)] backdrop-blur-xl"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="mx-auto flex max-w-lg items-stretch justify-around px-2">
        {navItems.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href || (href === '/day/12' && pathname.startsWith('/day'));
          return (
            <Link
              key={href}
              href={href}
              className="relative flex min-h-12 flex-1 touch-target flex-col items-center justify-center gap-1 pt-2"
              aria-label={label}
              aria-current={isActive ? 'page' : undefined}
            >
              <motion.div
                whileTap={{ scale: 0.88 }}
                className={cn(
                  'relative flex h-7 w-12 items-center justify-center rounded-full transition-colors duration-200',
                  isActive ? 'text-[#A78BFA]' : 'text-[#8B8B99] hover:text-[#C7C7D1]'
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId="bottom-nav-indicator"
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-[#8B5CF6]/25 to-[#22D3EE]/10 shadow-[0_0_12px_rgba(139,92,246,0.35),0_0_0_1px_rgba(139,92,246,0.3)]"
                    transition={{ type: 'spring', stiffness: 420, damping: 30 }}
                  />
                )}
                <Icon className="relative h-[22px] w-[22px]" strokeWidth={isActive ? 2.4 : 2} />
              </motion.div>
              <span
                className={cn(
                  'text-[11px] font-medium transition-colors',
                  isActive ? 'text-white' : 'text-[#8B8B99]'
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
