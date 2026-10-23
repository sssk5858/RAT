import React, { useRef, useEffect, useState } from 'react';
import { useApp } from '../../context/useApp';
import { ShieldCheck, ArrowLeft, RotateCw, CheckCircle2, KeyRound, Loader2 } from 'lucide-react';
import { StatusBadge } from '../common/StatusBadge';

export const OtpScreen: React.FC = () => {
  const {
    phoneNumber,
    countryCode,
    otp,
    setOtp,
    otpError,
    isOtpSuccess,
    verifyOtp,
    resendOtp,
    goBack,
  } = useApp();

  const [isVerifying, setIsVerifying] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Auto focus first input on mount
  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleVerify = (codeToVerify?: string) => {
    if (isVerifying) return;
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      verifyOtp(codeToVerify);
    }, 1400);
  };

  const handleDigitChange = (index: number, value: string) => {
    // Only accept numeric digit
    const cleaned = value.replace(/\D/g, '');
    const currentOtpArray = otp.padEnd(6, ' ').split('');

    if (cleaned.length > 0) {
      currentOtpArray[index] = cleaned[cleaned.length - 1];
      const newOtp = currentOtpArray.join('').trimEnd();
      setOtp(newOtp);

      // Auto advance to next box
      if (index < 5) {
        inputRefs.current[index + 1]?.focus();
      }

      // If full 6 digits entered, auto verify with delay
      if (newOtp.length === 6) {
        handleVerify(newOtp);
      }
    } else {
      // Backspace or clear
      currentOtpArray[index] = ' ';
      setOtp(currentOtpArray.join('').trimEnd());
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (pasted) {
      setOtp(pasted);
      const nextIndex = Math.min(pasted.length, 5);
      inputRefs.current[nextIndex]?.focus();
      if (pasted.length === 6) {
        handleVerify(pasted);
      }
    }
  };

  return (
    <div className="w-full max-w-md mx-auto py-6 sm:py-10 px-3 xs:px-4">
      {/* Back button */}
      <button
        type="button"
        onClick={goBack}
        className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-[#72F5A1] transition-colors mb-6 group focus:outline-none"
      >
        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
        <span>Return to Identifier Gateway</span>
      </button>

      {/* Main Terminal Card */}
      <div className="rounded-2xl bg-[#101720] border border-[#1B2636] p-4 xs:p-6 shadow-2xl relative overflow-hidden backdrop-blur-sm">
        {/* Decorative header */}
        <div className="flex items-center justify-between pb-4 mb-5 border-b border-[#1B2636]">
          <div className="flex items-center gap-2">
            <KeyRound className="w-4 h-4 text-[#72F5A1]" />
            <span className="text-[11px] font-mono text-slate-300">SECURITY_CHALLENGE</span>
          </div>
          <StatusBadge 
            label={isVerifying ? 'AUTHENTICATING' : isOtpSuccess ? 'AUTHORIZED' : 'CHALLENGE ACTIVE'} 
            variant={isOtpSuccess ? 'neon' : isVerifying ? 'amber' : 'blue'} 
            size="sm" 
            dot 
          />
        </div>

        <div className="text-center mb-6">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-100">
            Authorization Code
          </h2>
          <p className="mt-1.5 text-xs text-slate-400">
            Intercepted channel for target{' '}
            <span className="font-mono text-[#72F5A1] font-semibold">
              {countryCode.dialCode} {phoneNumber || '9063411276'}
            </span>
          </p>
          <div className="mt-3 inline-block px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700/60 text-[11px] font-mono text-slate-300">
            Enter 6-digit security token
          </div>
        </div>

        {/* 6 Digit Input Boxes - Responsive on all screen sizes */}
        <div 
          className="w-full flex justify-between items-center gap-1 xs:gap-2 sm:gap-3 mb-6" 
          onPaste={handlePaste}
        >
          {[0, 1, 2, 3, 4, 5].map((index) => {
            const digit = otp[index] || '';
            const isFilled = digit !== '' && digit !== ' ';
            const isCurrent = (otp.length === index) || (index === 5 && otp.length === 6);

            return (
              <input
                key={index}
                ref={(el) => {
                  inputRefs.current[index] = el;
                }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit.trim()}
                onChange={(e) => handleDigitChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                disabled={isOtpSuccess || isVerifying}
                className={`w-full max-w-[46px] xs:max-w-[50px] sm:max-w-[54px] aspect-square flex-1 text-center font-mono text-lg xs:text-xl font-bold rounded-lg sm:rounded-xl transition-all outline-none ${
                  isOtpSuccess
                    ? 'bg-[#72F5A1]/20 border-[#72F5A1] text-[#72F5A1]'
                    : isFilled
                    ? 'bg-[#080B10] border-[#72F5A1]/50 text-white'
                    : isCurrent
                    ? 'bg-[#080B10] border-slate-500 focus:border-[#72F5A1] focus:ring-1 focus:ring-[#72F5A1]'
                    : 'bg-[#080B10] border-[#1B2636] text-slate-400'
                } border`}
              />
            );
          })}
        </div>

        {/* Success Animation, Verifying State, or Error Message */}
        {isOtpSuccess ? (
          <div className="py-2.5 px-4 rounded-xl bg-[#72F5A1]/10 border border-[#72F5A1]/30 text-[#72F5A1] text-xs font-mono flex items-center justify-center gap-2 animate-in fade-in zoom-in-95">
            <CheckCircle2 className="w-4 h-4 text-[#72F5A1] animate-bounce" />
            <span>AUTHORIZATION CONFIRMED // INITIALIZING BRIDGE</span>
          </div>
        ) : isVerifying ? (
          <div className="py-2.5 px-4 rounded-xl bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-mono flex items-center justify-center gap-2 animate-in fade-in">
            <Loader2 className="w-4 h-4 text-amber-400 animate-spin" />
            <span>VALIDATING SECURITY CERTIFICATE...</span>
          </div>
        ) : otpError ? (
          <div className="py-2.5 px-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-mono text-center animate-in fade-in">
            {otpError}
          </div>
        ) : null}

        {/* Action Button */}
        {!isOtpSuccess && (
          <button
            type="button"
            onClick={() => handleVerify()}
            disabled={otp.length !== 6 || isVerifying}
            className={`w-full mt-5 py-3.5 px-4 rounded-xl font-semibold text-sm transition-all font-sans flex items-center justify-center gap-2 ${
              otp.length === 6 && !isVerifying
                ? 'bg-[#72F5A1] hover:bg-[#5fe08f] text-[#080B10] shadow-[0_0_20px_rgba(114,245,161,0.25)] cursor-pointer'
                : 'bg-slate-800 text-slate-500 border border-slate-700/50 cursor-not-allowed'
            }`}
          >
            {isVerifying ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-[#72F5A1]" />
                <span>Authorizing Session...</span>
              </>
            ) : (
              <span>Verify & Connect Device</span>
            )}
          </button>
        )}

        {/* Resend and Status */}
        <div className="mt-6 pt-4 border-t border-[#1B2636]/60 flex items-center justify-between text-xs">
          <button
            type="button"
            onClick={resendOtp}
            className="inline-flex items-center gap-1.5 text-slate-400 hover:text-slate-200 transition-colors font-mono"
          >
            <RotateCw className="w-3.5 h-3.5" />
            <span>Request Resend Code</span>
          </button>

          <span className="text-[11px] text-slate-500 font-mono">Encrypted Handshake</span>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-center gap-2 text-slate-500 text-xs">
        <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
        <span>Harmless prototype verification sandbox</span>
      </div>
    </div>
  );
};
