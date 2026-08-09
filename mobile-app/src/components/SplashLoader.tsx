import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Flame } from 'lucide-react';

const STORAGE_KEY = 'abtalks-splash-shown';

export default function SplashLoader({ onComplete }: { onComplete: () => void }) {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Skip if already shown this session
    if (sessionStorage.getItem(STORAGE_KEY)) {
      setVisible(false);
      onComplete();
      return;
    }

    const start = Date.now();
    const duration = 1800;
    let raf = 0;

    const tick = () => {
      const elapsed = Date.now() - start;
      const p = Math.min(1, elapsed / duration);
      // Ease-in-out
      const eased = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
      setProgress(eased);
      if (p < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        sessionStorage.setItem(STORAGE_KEY, '1');
        setTimeout(() => {
          setVisible(false);
          onComplete();
        }, 200);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onComplete]);

  if (!visible) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
          style={{ background: '#09090B' }}
        >
          {/* Flame icon with glow */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="relative mb-6"
          >
            <div
              className="absolute inset-0 rounded-full blur-2xl"
              style={{ background: 'rgba(255,90,0,0.22)', transform: 'scale(2)' }}
            />
            <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-[#ff5a00]">
              <Flame className="h-8 w-8 text-[#111]" />
            </div>
          </motion.div>

          {/* ABTalks text */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mb-8 text-center"
          >
            <span className="text-xl font-bold text-[#F8FAFC]">AB</span>
            <span className="text-xl font-normal text-[#F8FAFC]">Talks</span>
          </motion.div>

          {/* Progress bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="w-48 overflow-hidden rounded-full bg-[rgba(255,255,255,0.06)]"
            style={{ height: 3 }}
          >
            <motion.div
              className="h-full rounded-full"
              style={{
                width: `${progress * 100}%`,
                background: '#ff5a00',
              }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
