import React from 'react';
import { useApp } from '../../context/useApp';
import type { TimelineOption } from '../../types';
import { Calendar, ArrowRight, ArrowLeft, Clock, ShieldCheck, Check } from 'lucide-react';
import { StatusBadge } from '../common/StatusBadge';

export const TimelineSelectScreen: React.FC = () => {
  const {
    timelineRange,
    setTimelineRange,
    startScan,
    goBack,
  } = useApp();

  // Dynamic calculation of month spans from current date
  const now = new Date();
  const formatMonthYear = (offsetMonths: number) => {
    const d = new Date(now.getFullYear(), now.getMonth() - offsetMonths, 1);
    const month = d.toLocaleDateString('en-US', { month: 'short' });
    const year = d.getFullYear();
    return `${month} ${year}`;
  };

  const currentMonthLabel = formatMonthYear(0);

  const options: (TimelineOption & { span: string })[] = [
    {
      id: '3m',
      label: 'Last 3 Months',
      monthsCount: 3,
      description: 'Recent timeline slice. Quick synthesis of immediate placeholder telemetry.',
      span: `${formatMonthYear(2)} – ${currentMonthLabel}`,
    },
    {
      id: '6m',
      label: 'Last 6 Months',
      monthsCount: 6,
      description: 'Standard forensic index. Comprehensive bi-annual simulated archive distribution.',
      recommended: true,
      badge: 'RECOMMENDED',
      span: `${formatMonthYear(5)} – ${currentMonthLabel}`,
    },
    {
      id: '12m',
      label: 'Last 12 Months',
      monthsCount: 12,
      description: 'Full annual archive sweep. Complete synthetic cross-season temporal model.',
      span: `${formatMonthYear(11)} – ${currentMonthLabel}`,
    },
  ];

  const handleBeginAnalysis = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    startScan();
  };

  return (
    <div className="w-full max-w-2xl mx-auto py-6 sm:py-10 px-4">
      {/* Back button */}
      <button
        type="button"
        onClick={goBack}
        className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-[#72F5A1] transition-colors mb-6 group focus:outline-none"
      >
        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
        <span>Return to Device Setup</span>
      </button>

      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#101720] border border-[#1B2636] mb-3">
          <Calendar className="w-3.5 h-3.5 text-[#72F5A1]" />
          <span className="text-[11px] font-mono uppercase tracking-wider text-slate-300">
            Temporal Indexing Parameters
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-100">
          Select Archive Timeline
        </h1>
        <p className="mt-2 text-xs sm:text-sm text-slate-400 max-w-md mx-auto">
          Choose a period for the simulated archive analysis. Fictional video clips and duration metrics will be generated deterministically for this span.
        </p>
      </div>

      {/* Timeline Selection Cards */}
      <div className="grid grid-cols-1 gap-4 mb-8">
        {options.map((opt) => {
          const isSelected = timelineRange === opt.id;

          return (
            <div
              key={opt.id}
              onClick={() => setTimelineRange(opt.id)}
              className={`relative cursor-pointer select-none rounded-2xl p-5 border transition-all ${
                isSelected
                  ? 'bg-[#101720] border-[#72F5A1] shadow-[0_0_20px_rgba(114,245,161,0.15)] ring-1 ring-[#72F5A1]/50'
                  : 'bg-[#101720]/70 border-[#1B2636] hover:border-slate-700 hover:bg-[#101720]'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  {/* Calendar / Clock Icon */}
                  <div
                    className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                      isSelected
                        ? 'bg-[#72F5A1]/15 text-[#72F5A1] border border-[#72F5A1]/40'
                        : 'bg-[#080B10] text-slate-400 border border-[#1B2636]'
                    }`}
                  >
                    <Calendar className="w-5 h-5" />
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-bold text-slate-100">
                        {opt.label}
                      </h3>
                      {opt.badge && (
                        <StatusBadge
                          label={opt.badge}
                          variant="neon"
                          size="sm"
                        />
                      )}
                    </div>

                    <p className="text-xs text-slate-400 mt-1 leading-relaxed max-w-md">
                      {opt.description}
                    </p>

                    <div className="mt-2.5 flex items-center gap-2 text-[11px] font-mono text-slate-400">
                      <Clock className="w-3.5 h-3.5 text-slate-500" />
                      <span className="text-slate-300 font-semibold">{opt.span}</span>
                      <span className="text-slate-600">•</span>
                      <span className="text-slate-400">{opt.monthsCount} monthly clusters</span>
                    </div>
                  </div>
                </div>

                {/* Radio selection circle */}
                <div className="self-end sm:self-center shrink-0">
                  <div
                    className={`w-6 h-6 rounded-full border flex items-center justify-center transition-all ${
                      isSelected
                        ? 'bg-[#72F5A1] border-[#72F5A1] text-[#080B10]'
                        : 'border-slate-700 bg-[#080B10]'
                    }`}
                  >
                    {isSelected && <Check className="w-4 h-4 stroke-[3]" />}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Explanatory demo disclaimer box */}
      <div className="mb-6 p-3.5 rounded-xl bg-[#080B10] border border-[#1B2636] flex items-center gap-3 text-xs text-slate-400">
        <ShieldCheck className="w-4 h-4 text-[#72F5A1] shrink-0" />
        <p className="leading-relaxed">
          <strong className="text-slate-300">Synthetic Timeline Model:</strong> All month buckets, clip numbers, and durations are generated dynamically on client execution.
        </p>
      </div>

      {/* Primary Action Button */}
      <button
        type="button"
        onClick={handleBeginAnalysis}
        className="w-full py-4 px-6 rounded-xl bg-[#72F5A1] hover:bg-[#5fe08f] text-[#080B10] font-bold text-base transition-all shadow-[0_0_25px_rgba(114,245,161,0.25)] flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-[#72F5A1]"
      >
        <span>Begin analysis</span>
        <ArrowRight className="w-5 h-5 ml-1" />
      </button>
    </div>
  );
};
