import React, { useEffect } from 'react';
import { useApp } from '../../context/useApp';
import { Sparkles, CheckCircle2, RotateCcw, X, Heart } from 'lucide-react';

export const PlayfulRevealModal: React.FC = () => {
  const { isRevealModalOpen, closeRevealModal, startOver } = useApp();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isRevealModalOpen) {
        closeRevealModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isRevealModalOpen, closeRevealModal]);

  if (!isRevealModalOpen) return null;

  const handleStartOver = () => {
    closeRevealModal();
    startOver();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#080B10]/85 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div className="w-full max-w-lg rounded-3xl bg-[#101720] border border-amber-400/40 shadow-[0_0_50px_rgba(251,191,36,0.2)] p-6 sm:p-8 text-center relative overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Ambient warm glow */}
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-64 h-64 bg-amber-400/15 blur-3xl rounded-full pointer-events-none" />

        {/* Close Button */}
        <button
          type="button"
          onClick={closeRevealModal}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
          aria-label="Close reveal modal"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Animated Confetti / Sparkle Emoji Badge */}
        <div className="mx-auto w-16 h-16 rounded-2xl bg-amber-400/15 border border-amber-400/40 flex items-center justify-center text-amber-300 text-3xl mb-4 shadow-[0_0_25px_rgba(251,191,36,0.25)] animate-bounce">
          🎉
        </div>

        <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-2">
          Got you! It&rsquo;s a harmless prank!
        </h3>

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-mono mb-5">
          <Sparkles className="w-3.5 h-3.5" />
          <span>100% Simulated Client-Side Experience</span>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed mb-6 font-sans">
          This was a simulated digital-forensics demo. <strong className="text-white">No private videos were accessed, no files were read, and no device was connected.</strong>
        </p>

        {/* Reassurance Checkpoints */}
        <div className="p-4 rounded-2xl bg-[#080B10] border border-[#1B2636] text-left text-xs space-y-2.5 mb-6">
          <div className="flex items-center gap-2.5 text-slate-300 font-medium">
            <CheckCircle2 className="w-4 h-4 text-[#72F5A1] shrink-0" />
            <span>Zero access to camera, microphone, or gallery</span>
          </div>
          <div className="flex items-center gap-2.5 text-slate-300 font-medium">
            <CheckCircle2 className="w-4 h-4 text-[#72F5A1] shrink-0" />
            <span>No SMS messages sent or phone numbers stored</span>
          </div>
          <div className="flex items-center gap-2.5 text-slate-300 font-medium">
            <CheckCircle2 className="w-4 h-4 text-[#72F5A1] shrink-0" />
            <span>Bluetooth and Wi-Fi toggles were visual simulations</span>
          </div>
          <div className="flex items-center gap-2.5 text-slate-300 font-medium">
            <CheckCircle2 className="w-4 h-4 text-[#72F5A1] shrink-0" />
            <span>All clip counts, timestamps, and charts were mock data</span>
          </div>
        </div>

        {/* Friendly note */}
        <div className="flex items-center justify-center gap-1.5 text-xs text-slate-400 mb-6">
          <Heart className="w-3.5 h-3.5 text-rose-400" />
          <span>Designed with care as a harmless interactive prank prototype.</span>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3 justify-center">
          <button
            type="button"
            onClick={handleStartOver}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#72F5A1] hover:bg-[#5fe08f] text-[#080B10] font-bold text-xs uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(114,245,161,0.25)] flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Start Over (New Demo)</span>
          </button>

          <button
            type="button"
            onClick={closeRevealModal}
            className="w-full sm:w-auto px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-xs transition-colors"
          >
            Close & Keep Exploring
          </button>
        </div>
      </div>
    </div>
  );
};
