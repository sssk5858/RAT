import React from 'react';
import { useApp } from '../../context/useApp';
import { StatusBadge } from './StatusBadge';
import { RotateCcw } from 'lucide-react';

export const BrandHeader: React.FC = () => {
  const { screen, startOver } = useApp();

  return (
    <header className="sticky top-0 z-40 border-b border-[#1B2636] bg-[#080B10]/90 backdrop-blur-md px-4 sm:px-6 py-3 transition-colors">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-3">
        {/* Brand Mark and Title */}
        <div 
          onClick={() => {
            if (screen !== 'welcome') {
              startOver();
            }
          }}
          className="flex items-center gap-3 cursor-pointer group select-none"
          title="VAULT TRACE — Home"
        >
          {/* Cyber Shield / Vault Inline SVG */}
          <div className="relative flex items-center justify-center w-9 h-9 rounded-lg bg-[#101720] border border-[#1B2636] group-hover:border-[#72F5A1]/50 group-hover:shadow-[0_0_15px_rgba(114,245,161,0.2)] transition-all">
            <svg
              className="w-5 h-5 text-[#72F5A1]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polygon points="12 2 2 7 12 12 22 7 12 2" />
              <polyline points="2 17 12 22 22 17" />
              <polyline points="2 12 12 17 22 12" />
            </svg>
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#72F5A1] animate-ping opacity-75" />
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#72F5A1]" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-base sm:text-lg font-bold tracking-wider text-slate-100 font-mono-num uppercase group-hover:text-white transition-colors">
                VAULT <span className="text-[#72F5A1]">TRACE</span>
              </span>
              <span className="hidden sm:inline-block text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-slate-800/80 text-slate-400 border border-slate-700/60">
                v2.4
              </span>
            </div>
            <p className="text-[11px] text-slate-400 tracking-tight font-medium hidden xs:block">
              Digital Archive Intelligence
            </p>
          </div>
        </div>

        {/* Persistent Simulation Notice & Header Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Persistent Simulation Indicator */}
          <div className="flex items-center">
            <StatusBadge
              label="SIMULATION"
              variant="simulation"
              dot={true}
              size="sm"
            />
          </div>

          {/* Reset / Start Over Button */}
          {screen !== 'welcome' && (
            <button
              type="button"
              onClick={startOver}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-400 hover:text-slate-200 bg-[#101720] hover:bg-[#16202E] border border-[#1B2636] transition-all hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-slate-600"
              title="Reset simulation and start over"
            >
              <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
              <span className="hidden md:inline">Reset</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
