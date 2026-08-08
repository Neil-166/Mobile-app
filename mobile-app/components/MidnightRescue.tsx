'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, CheckCircle, X } from 'lucide-react';
import { Github, Linkedin } from '@/components/Icons';
import { Button } from '@/components/ui/button';
import { linkedinDrafts } from '@/lib/mock-data';
import { copyToClipboard, getMidnightCountdown } from '@/lib/utils';
import { toast } from 'sonner';

interface MidnightRescueProps {
  onMarkProgress?: () => void;
  onDismiss?: () => void;
}

export default function MidnightRescue({ onMarkProgress, onDismiss }: MidnightRescueProps) {
  const [countdown, setCountdown] = useState(getMidnightCountdown());
  const [visible, setVisible] = useState(true);
  const [githubOpened, setGithubOpened] = useState(false);
  const [linkedinCopied, setLinkedinCopied] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(getMidnightCountdown());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!visible) return null;

  const hour = new Date().getHours();
  const isLate = hour >= 23;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -10, scale: 0.95 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="relative rounded-2xl border border-[#F59E0B]/30 bg-[#F59E0B]/5 p-4 overflow-hidden"
        role="alert"
        aria-live="polite"
      >
        {/* Ambient glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#F59E0B]/5 to-transparent pointer-events-none" />

        {/* Dismiss */}
        <button
          onClick={() => { setVisible(false); onDismiss?.(); }}
          className="absolute top-3 right-3 w-7 h-7 flex items-center justify-center rounded-lg hover:bg-white/5 text-zinc-500 hover:text-white transition-colors"
          aria-label="Dismiss midnight rescue"
        >
          <X className="w-3.5 h-3.5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-2.5 mb-3">
          <div className="w-8 h-8 rounded-xl bg-[#F59E0B]/15 flex items-center justify-center flex-shrink-0">
            <span className="text-base">🌙</span>
          </div>
          <div>
            <p className="text-sm font-semibold text-white">
              {isLate ? "Last chance — streak at risk" : "Midnight Rescue"}
            </p>
            <p className="text-xs text-zinc-500">
              {isLate ? "You're so close. Don't stop now." : "Reminder to finish before midnight"}
            </p>
          </div>
        </div>

        {/* Countdown */}
        <div className="flex items-center gap-2 mb-4 px-3 py-2 rounded-xl bg-black/20">
          <Clock className="w-4 h-4 text-[#F59E0B] flex-shrink-0" />
          <span className="text-sm text-zinc-400">Time remaining:</span>
          <span className="text-sm font-mono font-bold text-[#F59E0B] ml-auto">{countdown}</span>
        </div>

        {/* Message */}
        <p className="text-xs text-zinc-400 mb-4 leading-relaxed">
          {isLate
            ? "You've made it this far. Even a small commit counts. Your streak matters."
            : "You've still got time. A quick 30-minute push before midnight keeps your streak alive. You've got this."}
        </p>

        {/* Quick actions */}
        <div className="grid grid-cols-3 gap-2">
          <button
            id="midnight-github"
            onClick={() => {
              setGithubOpened(true);
              window.open('https://github.com', '_blank');
            }}
            className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border transition-all ${
              githubOpened
                ? 'border-green-500/30 bg-green-500/10'
                : 'border-[#27272A] bg-white/5 hover:bg-white/10'
            }`}
          >
            {githubOpened ? (
              <CheckCircle className="w-4 h-4 text-green-400" />
            ) : (
              <Github className="w-4 h-4 text-white" />
            )}
            <span className="text-[10px] text-zinc-400 font-medium">GitHub</span>
          </button>

          <button
            id="midnight-linkedin"
            onClick={() => {
              void copyToClipboard(linkedinDrafts[0]).then(() => {
                setLinkedinCopied(true);
                toast.success('A LinkedIn draft is copied and ready to personalise.');
              });
            }}
            className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border transition-all ${
              linkedinCopied
                ? 'border-cyan-500/30 bg-cyan-500/10'
                : 'border-[#27272A] bg-white/5 hover:bg-white/10'
            }`}
          >
            {linkedinCopied ? (
              <CheckCircle className="w-4 h-4 text-cyan-400" />
            ) : (
              <Linkedin className="w-4 h-4 text-white" />
            )}
            <span className="text-[10px] text-zinc-400 font-medium">Copy draft</span>
          </button>

          <Button
            id="midnight-mark-progress"
            variant="secondary"
            size="sm"
            onClick={onMarkProgress}
            className="flex flex-col items-center gap-1 h-auto py-2 px-3 text-[10px] bg-[#F59E0B]/15 border-[#F59E0B]/30 text-[#F59E0B] hover:bg-[#F59E0B]/25 rounded-xl font-medium"
          >
            <CheckCircle className="w-4 h-4" />
            Mark Done
          </Button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
