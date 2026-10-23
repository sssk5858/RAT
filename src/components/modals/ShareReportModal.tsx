import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/useApp';
import { copyToClipboard } from '../../utils/clipboard';
import { generateSecureToken } from '../../mock/mockData';
import { X, Copy, Check, ExternalLink, RotateCw, ShieldCheck, Link2 } from 'lucide-react';
import { StatusBadge } from '../common/StatusBadge';

export const ShareReportModal: React.FC = () => {
  const {
    isShareModalOpen,
    closeShareModal,
    report,
    previewReportWithToken,
    showToast,
  } = useApp();

  const [regeneratedToken, setRegeneratedToken] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const currentToken = regeneratedToken || report?.token || generateSecureToken();

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isShareModalOpen) {
        closeShareModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isShareModalOpen, closeShareModal]);

  // Fictional RTA SPYWARE share link
  const demoUrl = `https://rtaspyware.com/report/${currentToken}`;

  const handleCopy = async () => {
    const success = await copyToClipboard(demoUrl);
    if (success) {
      setCopied(true);
      showToast('RTA SPYWARE share link copied to clipboard!', 'success');
      setTimeout(() => setCopied(false), 2500);
    } else {
      showToast('Unable to copy automatically. Please copy the URL manually.', 'warning');
    }
  };

  const handleRegenerate = () => {
    const newToken = generateSecureToken();
    setRegeneratedToken(newToken);
    setCopied(false);
    showToast('Generated fresh report security token.', 'info');
  };

  const handlePreview = () => {
    previewReportWithToken(currentToken);
  };

  if (!isShareModalOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#080B10]/85 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div className="w-full max-w-lg rounded-2xl bg-[#101720] border border-[#1B2636] shadow-2xl p-6 sm:p-7 relative overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 mb-5 border-b border-[#1B2636]">
          <div className="flex items-center gap-2.5">
            <Link2 className="w-5 h-5 text-[#72F5A1]" />
            <h3 className="text-base sm:text-lg font-bold text-slate-100">
              Share Archive Report
            </h3>
          </div>

          <button
            type="button"
            onClick={closeShareModal}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
            aria-label="Close share modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Description & Status Badge */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400">
              RTA SPYWARE Dossier
            </span>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-rose-500/15 text-rose-400 border border-rose-500/30 font-bold">
              RTA SPYWARE
            </span>
          </div>
          <StatusBadge label="TOKEN VALID" variant="neon" size="sm" dot />
        </div>

        {/* Read-only URL Input and Copy Button */}
        <div className="mb-4">
          <label className="block text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-1.5 flex items-center justify-between">
            <span>RTA SPYWARE Share Link</span>
            <span className="text-[10px] text-slate-500 lowercase">encrypted token</span>
          </label>
          <div className="flex items-center rounded-xl bg-[#080B10] border border-[#1B2636] focus-within:border-[#72F5A1]/60 transition-all p-1">
            <input
              type="text"
              readOnly
              value={demoUrl}
              className="flex-1 bg-transparent px-3 py-2 text-xs font-mono text-slate-200 select-all focus:outline-none"
            />
            <button
              type="button"
              onClick={handleCopy}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-mono font-bold transition-all ${
                copied
                  ? 'bg-[#72F5A1] text-[#080B10]'
                  : 'bg-[#16202E] hover:bg-[#1B2636] text-slate-200'
              }`}
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-[#080B10]" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Actions row: Regenerate & Preview */}
        <div className="flex items-center justify-between gap-3 mb-6">
          <button
            type="button"
            onClick={handleRegenerate}
            className="flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-slate-200 transition-colors"
          >
            <RotateCw className="w-3.5 h-3.5" />
            <span>Regenerate Token</span>
          </button>

          <button
            type="button"
            onClick={handlePreview}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#38BDF8]/10 hover:bg-[#38BDF8]/20 text-[#38BDF8] border border-[#38BDF8]/30 text-xs font-mono font-medium transition-colors"
          >
            <span>Preview Report</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Safe Demo Disclosure */}
        <div className="p-3.5 rounded-xl bg-[#080B10] border border-[#1B2636] text-xs text-slate-400 space-y-1.5">
          <div className="flex items-center gap-2 text-slate-300 font-semibold text-[11px]">
            <ShieldCheck className="w-3.5 h-3.5 text-[#72F5A1]" />
            <span>Local Demo Link Disclosure</span>
          </div>
          <p className="text-[11px] leading-relaxed">
            This link is generated client-side from the application origin. No private phone numbers or hardware identifiers are encoded in the URL. Since this is an air-gapped demo without a cloud database, links viewed in fresh browsers use safe deterministic fallback data.
          </p>
        </div>

        {/* Close Button */}
        <div className="mt-6 flex justify-end">
          <button
            type="button"
            onClick={closeShareModal}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
