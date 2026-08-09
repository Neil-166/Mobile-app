import { useLocation, useOutlet } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import BottomNav from './BottomNav';

/**
 * Shared app shell — always renders the bottom navigation bar.
 * Hides the nav on sub-pages like /day/:day that have their own bottom CTA.
 * Wraps the routed page in a keyed motion wrapper for smooth page transitions.
 */
export default function MobileLayout() {
  const { pathname } = useLocation();
  const outlet = useOutlet();
  const hideNav = pathname.startsWith('/day/');

  return (
    <div className="flex min-h-dvh flex-col">
      <main className="flex-1">
        <AnimatePresence initial={false}>
          <motion.div
            key={pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15, ease: 'easeInOut' }}
          >
            {outlet}
          </motion.div>
        </AnimatePresence>
      </main>
      {!hideNav && <BottomNav />}
    </div>
  );
}
