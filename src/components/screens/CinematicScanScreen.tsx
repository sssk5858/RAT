import React, { useRef, useEffect } from 'react';
import { useApp } from '../../context/useApp';
import { Terminal, X, Shield, Activity, HardDrive } from 'lucide-react';
import { StatusBadge } from '../common/StatusBadge';

export const CinematicScanScreen: React.FC = () => {
  const {
    scanProgress,
    scanStageLabel,
    scanElapsedTime,
    scanLogs,
    cancelScan,
    timelineRange,
  } = useApp();

  const terminalBottomRef = useRef<HTMLDivElement>(null);

  // Scroll window to top on mount to view the scanning analysis section
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Auto-scroll terminal log to bottom on new log line
  useEffect(() => {
    terminalBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [scanLogs.length]);

  // Circumference for SVG circular progress
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (scanProgress / 100) * circumference;

  return (
    <div className="w-full max-w-4xl mx-auto py-6 sm:py-8 px-4 flex flex-col items-center">
      {/* Top Status Banner */}
      <div className="w-full flex items-center justify-between gap-4 mb-6 pb-4 border-b border-[#1B2636]">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-[#72F5A1] animate-pulse" />
          <span className="text-xs font-mono tracking-wider text-slate-300 uppercase">
            FORENSIC_DECOMPOSITION // RUNTIME: {scanElapsedTime}
          </span>
        </div>

        <button
          type="button"
          onClick={cancelScan}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono text-slate-400 hover:text-rose-400 bg-[#101720] hover:bg-rose-500/10 border border-[#1B2636] hover:border-rose-500/30 transition-all focus:outline-none"
        >
          <X className="w-3.5 h-3.5" />
          <span>Cancel Simulation</span>
        </button>
      </div>

      {/* Main Scan Display Center */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Left / Center: Circular Progress & Radar Beam */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center p-6 rounded-2xl bg-[#101720] border border-[#1B2636] relative overflow-hidden">
          {/* Subtle radar sweep line animation */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
            <div className="w-56 h-56 rounded-full border border-[#72F5A1]/40" />
            <div className="w-40 h-40 rounded-full border border-[#72F5A1]/30" />
            <div className="w-24 h-24 rounded-full border border-[#72F5A1]/20" />
            <div className="absolute w-28 h-0.5 bg-gradient-to-r from-transparent to-[#72F5A1] origin-left animate-spin" />
          </div>

          {/* SVG Circular Progress */}
          <div className="relative w-48 h-48 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90">
              {/* Background circle */}
              <circle
                cx="96"
                cy="96"
                r={radius}
                className="text-slate-800"
                strokeWidth="10"
                stroke="currentColor"
                fill="transparent"
              />
              {/* Progress circle */}
              <circle
                cx="96"
                cy="96"
                r={radius}
                stroke="#72F5A1"
                strokeWidth="10"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="transparent"
                style={{
                  transition: 'stroke-dashoffset 0.15s ease-out',
                  filter: 'drop-shadow(0 0 10px rgba(114, 245, 161, 0.4))',
                }}
              />
            </svg>

            {/* Inner Percentage Readout */}
            <div className="absolute flex flex-col items-center justify-center text-center">
              <span className="text-4xl font-extrabold font-mono text-white tracking-tighter">
                {scanProgress}%
              </span>
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#72F5A1] mt-0.5">
                ANALYZING
              </span>
            </div>
          </div>

          {/* Stage Label & Target */}
          <div className="mt-4 text-center">
            <div className="text-sm font-bold text-slate-100 font-sans tracking-wide">
              {scanStageLabel}
            </div>
            <div className="text-xs text-slate-400 font-mono mt-1">
              Timeline span: {timelineRange === '3m' ? '3 Months' : timelineRange === '6m' ? '6 Months' : '12 Months'}
            </div>
          </div>

          {/* Status badge */}
          <div className="mt-4">
            <StatusBadge label="SIMULATION ACTIVE" variant="neon" size="sm" dot />
          </div>
        </div>

        {/* Right: Scrolling Terminal Logs */}
        <div className="lg:col-span-7 flex flex-col h-[340px] rounded-2xl bg-[#080B10] border border-[#1B2636] overflow-hidden">
          {/* Terminal Title Bar */}
          <div className="flex items-center justify-between px-4 py-2.5 bg-[#101720] border-b border-[#1B2636]">
            <div className="flex items-center gap-2">
              <Terminal className="w-3.5 h-3.5 text-[#72F5A1]" />
              <span className="text-[11px] font-mono text-slate-300">
                DIAGNOSTIC_TELEMETRY.LOG
              </span>
            </div>
            <div className="flex items-center gap-2 text-[10px] font-mono text-slate-500">
              <HardDrive className="w-3 h-3 text-slate-400" />
              <span>SYNTHETIC BUFFER</span>
            </div>
          </div>

          {/* Scrolling Log Output */}
          <div className="flex-1 p-4 overflow-y-auto space-y-2 font-mono text-xs text-slate-300">
            {scanLogs.map((log) => {
              const levelColor = {
                SYS: 'text-[#38BDF8] bg-[#38BDF8]/10 border-[#38BDF8]/30',
                SIM: 'text-purple-400 bg-purple-400/10 border-purple-400/30',
                INFO: 'text-slate-400 bg-slate-800 border-slate-700',
                INDEX: 'text-amber-300 bg-amber-400/10 border-amber-400/30',
                OK: 'text-[#72F5A1] bg-[#72F5A1]/10 border-[#72F5A1]/30',
              }[log.level];

              return (
                <div key={log.id} className="flex items-start gap-2 leading-relaxed animate-in fade-in">
                  <span className="text-slate-600 select-none text-[11px]">[{log.time}]</span>
                  <span
                    className={`px-1.5 py-0.2 rounded border text-[10px] uppercase font-semibold shrink-0 ${levelColor}`}
                  >
                    {log.level}
                  </span>
                  <span className="text-slate-300 text-[11px] break-all">{log.message}</span>
                </div>
              );
            })}
            <div ref={terminalBottomRef} />
          </div>

          {/* Terminal Footer Bar */}
          <div className="px-4 py-2 bg-[#0D121A] border-t border-[#1B2636] flex items-center justify-between text-[10px] font-mono text-slate-500">
            <span>ISOLATION PROTOCOL: ACTIVE</span>
            <span className="text-[#72F5A1]">100% IN-MEMORY DEMO</span>
          </div>
        </div>
      </div>

      {/* Safety assurance notice */}
      <div className="mt-6 flex items-center gap-2 text-xs text-slate-500 font-mono">
        <Shield className="w-4 h-4 text-slate-400" />
        <span>No actual file-system access or device scanning is taking place.</span>
      </div>
    </div>
  );
};
