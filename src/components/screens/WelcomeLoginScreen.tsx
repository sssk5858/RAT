import React, { useState } from 'react';
import { useApp } from '../../context/useApp';
import { COUNTRY_CODES, DEMO_PHONE } from '../../mock/mockData';
import { ShieldCheck, ArrowRight, Smartphone, Lock, Terminal, Cpu, ChevronDown, Loader2 } from 'lucide-react';
import { StatusBadge } from '../common/StatusBadge';

export const WelcomeLoginScreen: React.FC = () => {
  const {
    countryCode,
    setCountryCode,
    phoneNumber,
    setPhoneNumber,
    phoneError,
    submitPhone,
  } = useApp();

  const [isAuthorizing, setIsAuthorizing] = useState(false);

  const handleProceed = () => {
    if (isAuthorizing) return;
    setIsAuthorizing(true);
    setTimeout(() => {
      setIsAuthorizing(false);
      submitPhone();
    }, 1200);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleProceed();
    }
  };

  const handleQuickFill = () => {
    setPhoneNumber(DEMO_PHONE);
  };

  return (
    <div className="w-full max-w-md mx-auto py-6 sm:py-10 px-4">
      {/* Top Tagline Card */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#101720] border border-[#1B2636] mb-3">
          <Terminal className="w-3.5 h-3.5 text-[#72F5A1]" />
          <span className="text-[11px] font-mono uppercase tracking-wider text-slate-300">
            Cyber-Forensic Demo Engine
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-100 font-sans">
          Simulated Archive <span className="text-[#72F5A1]">Intelligence</span>
        </h1>
        <p className="mt-2 text-xs sm:text-sm text-slate-400 max-w-sm mx-auto leading-relaxed">
          Inspect fictional video timeline decompositions, metadata clusters, and forensic duration indices in a harmless prototype.
        </p>
      </div>

      {/* Main Terminal Box */}
      <div className="rounded-2xl bg-[#101720] border border-[#1B2636] p-6 shadow-2xl relative overflow-hidden backdrop-blur-sm">
        {/* Subtle decorative top bar */}
        <div className="flex items-center justify-between pb-4 mb-5 border-b border-[#1B2636]">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-rose-500/70" />
            <div className="w-2.5 h-2.5 rounded-full bg-amber-500/70" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#72F5A1]/70" />
            <span className="text-[11px] font-mono text-slate-400 ml-1">AUTH_GATEWAY // DEMO</span>
          </div>
          <StatusBadge label="READY" variant="neon" size="sm" dot />
        </div>

        {/* System Diagnostic Status Grid */}
        <div className="grid grid-cols-2 gap-2 mb-6 p-3 rounded-xl bg-[#080B10]/80 border border-[#1B2636]/60">
          <div className="flex items-center gap-2">
            <Cpu className="w-3.5 h-3.5 text-[#38BDF8]" />
            <div>
              <div className="text-[9px] font-mono text-slate-500 uppercase">Engine Sandbox</div>
              <div className="text-[11px] font-mono font-medium text-slate-300">LOCAL MEMORY</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Lock className="w-3.5 h-3.5 text-[#72F5A1]" />
            <div>
              <div className="text-[9px] font-mono text-slate-500 uppercase">Hardware Access</div>
              <div className="text-[11px] font-mono font-medium text-[#72F5A1]">AIR-GAPPED (0%)</div>
            </div>
          </div>
        </div>

        {/* Login Form */}
        <div className="space-y-4">
          <div>
            <label
              htmlFor="mobile-number-input"
              className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5 flex items-center justify-between"
            >
              <span>Target Mobile Identifier</span>
              <span className="text-[10px] text-slate-500 lowercase">simulated only</span>
            </label>

            {/* Input Group with Compact Country Selector and Visible Mobile Input */}
            <div className="flex rounded-xl bg-[#080B10] border border-[#1B2636] focus-within:border-[#72F5A1]/60 focus-within:ring-1 focus-within:ring-[#72F5A1]/40 transition-all overflow-hidden">
              {/* Compact Country Selector */}
              <div
                className="relative shrink-0 flex items-center justify-between gap-1 bg-[#0D121A] border-r border-[#1B2636] px-2.5 py-3 w-[82px] sm:w-[98px] cursor-pointer hover:bg-[#16202E] transition-colors group select-none"
                title="Select country code"
              >
                <div className="flex items-center gap-1 text-xs font-mono font-medium text-slate-200 pointer-events-none">
                  <span className="text-sm leading-none">{countryCode.flag}</span>
                  <span className="font-semibold text-slate-100 tracking-tight">{countryCode.dialCode}</span>
                </div>
                <ChevronDown className="w-3 h-3 text-slate-400 group-hover:text-slate-200 transition-colors shrink-0 pointer-events-none" />

                <select
                  aria-label="Country Code"
                  value={countryCode.code}
                  onChange={(e) => {
                    const found = COUNTRY_CODES.find((c) => c.code === e.target.value);
                    if (found) setCountryCode(found);
                  }}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer bg-transparent"
                >
                  {COUNTRY_CODES.map((c) => (
                    <option key={c.code} value={c.code} className="bg-[#101720] text-slate-200 py-1 font-sans">
                      {c.flag} {c.dialCode} — {c.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Mobile Number Input with Expanded Available Space */}
              <div className="relative flex-1 min-w-0 flex items-center">
                <input
                  id="mobile-number-input"
                  type="tel"
                  inputMode="numeric"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Enter mobile number"
                  className="w-full min-w-0 bg-transparent px-3 py-3 text-sm font-mono text-slate-100 placeholder-slate-600 focus:outline-none"
                />
                {phoneNumber && (
                  <button
                    type="button"
                    onClick={() => setPhoneNumber('')}
                    className="mr-2.5 text-xs text-slate-500 hover:text-slate-300 p-1 rounded transition-colors"
                    title="Clear input"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>

            {/* Inline Error Message */}
            {phoneError && (
              <p className="mt-2 text-xs text-rose-400 font-mono flex items-center gap-1.5 animate-in fade-in">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                {phoneError}
              </p>
            )}
          </div>

          {/* Quick Demo Autofill Pill */}
          <div className="flex items-center justify-between text-xs pt-1">
            <span className="text-[11px] text-slate-500 font-mono">Authorized Target:</span>
            <button
              type="button"
              onClick={handleQuickFill}
              className="text-[11px] text-[#72F5A1] hover:text-[#72F5A1]/80 hover:underline font-mono"
            >
              Autofill Target ID
            </button>
          </div>

          {/* Submit Action */}
          <button
            type="button"
            onClick={handleProceed}
            disabled={isAuthorizing}
            className={`w-full mt-2 flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl font-semibold text-sm transition-all transform ${isAuthorizing
                ? 'bg-[#101720] border border-[#72F5A1]/50 text-[#72F5A1] cursor-wait'
                : 'bg-[#72F5A1] hover:bg-[#5fe08f] text-[#080B10] hover:scale-[1.01] active:scale-[0.99] shadow-[0_0_20px_rgba(114,245,161,0.25)]'
              } focus:outline-none focus:ring-2 focus:ring-[#72F5A1]`}
          >
            {isAuthorizing ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-[#72F5A1]" />
                <span>Authorizing Target Access...</span>
              </>
            ) : (
              <>
                <Smartphone className="w-4 h-4" />
                <span>Continue to Simulated Auth</span>
                <ArrowRight className="w-4 h-4 ml-0.5" />
              </>
            )}
          </button>
        </div>

        {/* Low-emphasis demo disclosure */}
        <div className="mt-6 pt-4 border-t border-[#1B2636]/60 text-center">
          <div className="flex items-center justify-center gap-1.5 text-slate-500 text-[11px]">
            <ShieldCheck className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span>Air-gapped verification bridge. Zero device data collected.</span>
          </div>
        </div>
      </div>

      {/* Security notice footer */}
      <div className="mt-6 text-center text-[11px] text-slate-600 font-mono">
        VAULT TRACE FORENSIC SIMULATOR // BUILD 2026.10-DEMO
      </div>
    </div>
  );
};
