'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, LayoutDashboard, Flame, User } from 'lucide-react';
import { motion } from 'framer-motion';

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
      className="fixed bottom-0 left-0 right-0 z-50 glass border-t border-[#27272A] pb-safe"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-lg mx-auto flex items-center justify-around px-2 pt-2 pb-3">
        {navItems.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href || (href === '/day/12' && pathname.startsWith('/day'));
          return (
            <Link
              key={href}
              href={href}
              className="relative flex flex-col items-center gap-1 min-w-[60px] py-1 touch-target justify-center"
              aria-label={label}
              aria-current={isActive ? 'page' : undefined}
            >
              <motion.div
                whileTap={{ scale: 0.85 }}
                className={`relative flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-200 ${
                  isActive
                    ? 'bg-[#8B5CF6]/20 text-[#8B5CF6]'
                    : 'text-zinc-600 hover:text-zinc-400'
                }`}
              >
                <Icon className="w-5 h-5" />
                {isActive && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute inset-0 rounded-xl bg-[#8B5CF6]/15 border border-[#8B5CF6]/25"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
              </motion.div>
              <span
                className={`text-[10px] font-medium transition-colors ${
                  isActive ? 'text-[#8B5CF6]' : 'text-zinc-600'
                }`}
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
