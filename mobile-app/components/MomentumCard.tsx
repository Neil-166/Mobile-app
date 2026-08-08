'use client';

import { useState } from 'react';
import { Download, Share2, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { currentStudent } from '@/lib/mock-data';
import { copyToClipboard } from '@/lib/utils';

interface MomentumCardProps {
  day: number;
  streak: number;
  projectName: string;
  githubUrl?: string;
}

export default function MomentumCard({ day, streak, projectName, githubUrl }: MomentumCardProps) {
  const [downloaded, setDownloaded] = useState(false);

  const handleDownload = () => {
    const escapeXml = (value: string) => value.replace(/[<>&'\"]/g, (character) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;' })[character] ?? character);
    const card = `<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1080" viewBox="0 0 1080 1080"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#0F0A1E"/><stop offset=".55" stop-color="#23103F"/><stop offset="1" stop-color="#0A1628"/></linearGradient><radialGradient id="glow"><stop stop-color="#8B5CF6" stop-opacity=".65"/><stop offset="1" stop-color="#8B5CF6" stop-opacity="0"/></radialGradient></defs><rect width="1080" height="1080" rx="72" fill="url(#g)"/><circle cx="940" cy="100" r="300" fill="url(#glow)"/><rect x="76" y="76" width="96" height="96" rx="28" fill="#8B5CF6"/><text x="124" y="137" fill="white" font-family="Arial, sans-serif" font-weight="700" font-size="37" text-anchor="middle">AB</text><text x="196" y="135" fill="#C4B5FD" font-family="Arial, sans-serif" font-weight="700" font-size="32">ABTalks 60-Day Challenge</text><text x="76" y="360" fill="white" font-family="Arial, sans-serif" font-weight="800" font-size="132">Day ${day}</text><text x="80" y="414" fill="#A1A1AA" font-family="Arial, sans-serif" font-size="34">of 60</text><text x="1004" y="354" fill="#FBBF24" font-family="Arial, sans-serif" font-weight="700" font-size="74" text-anchor="end">🔥 ${streak}</text><text x="1004" y="406" fill="#A1A1AA" font-family="Arial, sans-serif" font-size="30" text-anchor="end">day streak</text><rect x="76" y="518" width="928" height="218" rx="36" fill="rgba(255,255,255,.07)" stroke="rgba(255,255,255,.13)"/><text x="120" y="586" fill="#A1A1AA" font-family="Arial, sans-serif" font-size="28">TODAY’S BUILD</text><text x="120" y="660" fill="white" font-family="Arial, sans-serif" font-weight="700" font-size="43">${escapeXml(projectName)}</text><text x="76" y="928" fill="#A1A1AA" font-family="Arial, sans-serif" font-size="32">${escapeXml(currentStudent.name)} · ${escapeXml(currentStudent.college)}</text><text x="76" y="984" fill="#67E8F9" font-family="Arial, sans-serif" font-weight="700" font-size="29">${githubUrl ? '✓ GitHub verified' : 'Building in public'}</text></svg>`;
    const blob = new Blob([card], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `abtalks-day-${day}-momentum.svg`;
    link.click();
    URL.revokeObjectURL(url);
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 3000);
  };

  const handleShare = async () => {
    const message = `I just completed Day ${day} of the ABTalks 60-Day Challenge! 🔥`;
    if (navigator.share) {
      await navigator.share({ title: `Day ${day} — ABTalks 60`, text: message });
      return;
    }
    await copyToClipboard(message);
    toast.success('Momentum message copied to your clipboard.');
  };

  return (
    <div className="space-y-4">
      {/* Card Preview */}
      <div
        id="momentum-card-preview"
        className="relative overflow-hidden rounded-2xl p-5"
        style={{
          background: 'linear-gradient(135deg, #0F0A1E 0%, #1a0a2e 50%, #0a1628 100%)',
          border: '1px solid rgba(139, 92, 246, 0.3)',
        }}
      >
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-20" style={{ background: 'radial-gradient(circle, #8B5CF6, transparent)', transform: 'translate(30%, -30%)' }} />
        <div className="absolute bottom-0 left-0 w-24 h-24 rounded-full opacity-10" style={{ background: 'radial-gradient(circle, #22D3EE, transparent)', transform: 'translate(-30%, 30%)' }} />

        {/* ABTalks branding */}
        <div className="flex items-center gap-2 mb-4">
          <div className="w-6 h-6 rounded-lg bg-[#8B5CF6] flex items-center justify-center">
            <span className="text-[10px] font-bold text-white">AB</span>
          </div>
          <span className="text-xs font-semibold text-[#8B5CF6]">ABTalks 60-Day Challenge</span>
        </div>

        {/* Day + streak */}
        <div className="flex items-end gap-4 mb-3">
          <div>
            <p className="text-4xl font-black text-white">Day {day}</p>
            <p className="text-sm text-zinc-500 mt-0.5">of 60</p>
          </div>
          <div className="ml-auto text-right">
            <p className="text-2xl font-bold" style={{ color: '#F59E0B' }}>🔥 {streak}</p>
            <p className="text-xs text-zinc-500">day streak</p>
          </div>
        </div>

        {/* Project */}
        <div className="mb-3 p-2.5 rounded-xl bg-white/5 border border-white/10">
          <p className="text-[10px] text-zinc-500 mb-0.5 uppercase tracking-wider">Today&apos;s Build</p>
          <p className="text-sm font-semibold text-white">{projectName}</p>
        </div>

        {/* Bottom */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] text-zinc-600">{currentStudent.name}</p>
            <p className="text-[10px] text-zinc-600">{currentStudent.college}</p>
          </div>
          {githubUrl && (
            <div className="flex items-center gap-1">
              <CheckCircle className="w-3 h-3 text-green-400" />
              <span className="text-[10px] text-green-400">GitHub verified</span>
            </div>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <Button
          id="download-momentum-card"
          onClick={handleDownload}
          variant={downloaded ? 'success' : 'default'}
          className="flex-1"
          size="sm"
        >
          {downloaded ? (
            <><CheckCircle className="w-4 h-4 mr-1" /> Saved!</>
          ) : (
            <><Download className="w-4 h-4 mr-1" /> Download Card</>
          )}
        </Button>
        <Button
          id="share-momentum-card"
          variant="outline"
          size="sm"
          onClick={() => { void handleShare(); }}
          aria-label="Share your momentum card"
        >
          <Share2 className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
