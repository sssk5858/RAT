import React, { useMemo } from 'react';
import { useApp } from '../../context/useApp';
import { getReportLocally } from '../../mock/mockData';
import { 
  ArrowLeft, 
  Film, 
  Clock, 
  Calendar, 
  ShieldCheck, 
  AlertCircle, 
  Layers,
  Sparkles
} from 'lucide-react';
import { StatusBadge } from '../common/StatusBadge';

export const DemoReportView: React.FC = () => {
  const {
    activeReportToken,
    report: currentReport,
    startOver,
  } = useApp();

  // Retrieve report from local storage or deterministic token fallback
  const report = useMemo(() => {
    if (activeReportToken) {
      const stored = getReportLocally(activeReportToken);
      if (stored) return stored;
    }
    return currentReport;
  }, [activeReportToken, currentReport]);

  const isValid = !!report && (!activeReportToken || activeReportToken.length >= 6);

  if (!isValid) {
    return (
      <div className="w-full max-w-lg mx-auto py-16 px-4 text-center">
        <div className="w-14 h-14 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center mx-auto mb-4 text-rose-400">
          <AlertCircle className="w-7 h-7" />
        </div>
        <h2 className="text-xl font-bold text-white mb-2">Simulated Report Not Found</h2>
        <p className="text-xs text-slate-400 mb-6 leading-relaxed">
          The requested demo report token is missing or has expired in this local browser session.
        </p>
        <button
          type="button"
          onClick={startOver}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#72F5A1] text-[#080B10] font-bold text-xs uppercase tracking-wider"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Launch New Simulation</span>
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-5xl mx-auto py-6 sm:py-8 px-4">
      {/* Top Banner indicating Shared Simulated Report */}
      <div className="mb-6 p-4 rounded-2xl bg-[#101720] border border-[#72F5A1]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-[0_0_25px_rgba(114,245,161,0.1)]">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#72F5A1]/15 text-[#72F5A1] border border-[#72F5A1]/30 flex items-center justify-center shrink-0">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-slate-100 uppercase tracking-wider">
                SIMULATED REPORT PREVIEW
              </span>
              <StatusBadge label="VERIFIED MOCK DATA" variant="neon" size="sm" />
            </div>
            <p className="text-[11px] text-slate-400">
              Viewing token: <span className="font-mono text-slate-300">{activeReportToken || report.token}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            type="button"
            onClick={startOver}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#080B10] hover:bg-slate-800 text-slate-300 text-xs font-mono border border-[#1B2636] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Application</span>
          </button>
        </div>
      </div>

      {/* Main Report Container */}
      <div className="rounded-2xl bg-[#101720] border border-[#1B2636] p-6 sm:p-8 shadow-2xl mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#1B2636] mb-6">
          <div>
            <div className="text-xs font-mono text-[#72F5A1] uppercase tracking-wider mb-1">
              ARCHIVE AUDIT DOSSIER // {report.sessionId}
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              Simulated Forensic Timeline Report
            </h1>
            <p className="text-xs text-slate-400 mt-1 font-mono">
              Timestamp: {report.generatedAt}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <StatusBadge label="AIRGAPPED DEMO" variant="blue" size="sm" dot />
          </div>
        </div>

        {/* 4 Summary Stat Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8">
          <div className="p-4 rounded-xl bg-[#080B10] border border-[#1B2636]">
            <div className="text-xs font-mono text-slate-400 uppercase mb-1 flex items-center justify-between">
              <span>Span</span>
              <Calendar className="w-3.5 h-3.5 text-[#72F5A1]" />
            </div>
            <div className="text-lg sm:text-xl font-bold font-mono text-white">
              {report.timelineLabel}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#080B10] border border-[#1B2636]">
            <div className="text-xs font-mono text-slate-400 uppercase mb-1 flex items-center justify-between">
              <span>Clips</span>
              <Film className="w-3.5 h-3.5 text-[#38BDF8]" />
            </div>
            <div className="text-lg sm:text-xl font-bold font-mono text-white">
              {report.totalClips}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#080B10] border border-[#1B2636]">
            <div className="text-xs font-mono text-slate-400 uppercase mb-1 flex items-center justify-between">
              <span>Duration</span>
              <Clock className="w-3.5 h-3.5 text-purple-400" />
            </div>
            <div className="text-lg sm:text-xl font-bold font-mono text-white">
              {report.totalDurationFormatted}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#080B10] border border-[#1B2636]">
            <div className="text-xs font-mono text-slate-400 uppercase mb-1 flex items-center justify-between">
              <span>Months</span>
              <Layers className="w-3.5 h-3.5 text-amber-400" />
            </div>
            <div className="text-lg sm:text-xl font-bold font-mono text-white">
              {report.monthsCount} Months
            </div>
          </div>
        </div>

        {/* Monthly Breakdown Table / Cards */}
        <h3 className="text-sm font-mono uppercase tracking-wider text-slate-300 mb-4 flex items-center gap-2">
          <span>Monthly Temporal Clusters</span>
          <span className="text-slate-600">•</span>
          <span className="text-xs text-slate-500 font-sans lowercase">all entries synthetic</span>
        </h3>

        <div className="space-y-3">
          {report.months.map((m) => {
            const isOct = m.shortMonth === 'Oct' || m.monthName.toLowerCase().includes('october');
            const isSept = m.shortMonth === 'Sep' || m.monthName.toLowerCase().includes('september');

            return (
              <div
                key={m.monthKey}
                className="p-4 rounded-xl bg-[#080B10] border border-[#1B2636] flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3">
                  {isOct ? (
                    <img 
                      src="/OCT.jpeg" 
                      alt="October Record" 
                      className="w-10 h-10 rounded-lg object-cover border border-[#72F5A1]/40 shrink-0" 
                    />
                  ) : isSept ? (
                    <img 
                      src="/Sept.png" 
                      alt="September Record" 
                      className="w-10 h-10 rounded-lg object-cover border border-[#38BDF8]/40 shrink-0" 
                    />
                  ) : null}
                  <div>
                    <div className="text-sm font-bold text-white">{m.monthName}</div>
                    <div className="text-xs font-mono text-slate-400 mt-0.5">
                      {m.clipCount} mock clips • {m.totalDurationFormatted} total runtime
                    </div>
                  </div>
                </div>

              <div className="flex items-center gap-3">
                <div className="flex items-end gap-1 h-6 px-2 py-0.5 bg-[#101720] rounded border border-[#1B2636]">
                  {m.activityBar.map((b, i) => (
                    <div
                      key={i}
                      className="w-1 bg-[#72F5A1]/50 rounded-xs"
                      style={{ height: `${b}%` }}
                    />
                  ))}
                </div>
                <StatusBadge label="VERIFIED" variant="neon" size="sm" />
              </div>
            </div>
          );
        })}
        </div>

        {/* Safety & Persistence Disclaimer */}
        <div className="mt-8 p-4 rounded-xl bg-[#080B10] border border-[#1B2636] text-xs text-slate-400 space-y-2">
          <div className="flex items-center gap-2 text-slate-200 font-semibold">
            <ShieldCheck className="w-4 h-4 text-[#72F5A1]" />
            <span>Air-Gapped Prototype Disclaimer</span>
          </div>
          <p className="leading-relaxed">
            This report represents fictional digital forensics simulation data created client-side. No user device files, cameras, phone numbers, or wireless hardware are accessed or transmitted. Cross-device database synchronization is intentionally disabled.
          </p>
        </div>
      </div>

      {/* Footer Back action */}
      <div className="text-center">
        <button
          type="button"
          onClick={startOver}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#72F5A1] hover:bg-[#5fe08f] text-[#080B10] font-bold text-xs uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(114,245,161,0.25)]"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Simulation Gateway</span>
        </button>
      </div>
    </div>
  );
};
