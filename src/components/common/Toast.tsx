import React from 'react';
import { useApp } from '../../context/useApp';
import { CheckCircle2, Info, AlertTriangle, AlertCircle, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div
      aria-live="polite"
      className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none px-4 sm:px-0"
    >
      {toasts.map((toast) => {
        const icons = {
          success: <CheckCircle2 className="w-4 h-4 text-[#72F5A1] shrink-0" />,
          info: <Info className="w-4 h-4 text-[#38BDF8] shrink-0" />,
          warning: <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />,
          error: <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />,
        };

        const borderColors = {
          success: 'border-[#72F5A1]/40 shadow-[0_4px_20px_rgba(114,245,161,0.15)]',
          info: 'border-[#38BDF8]/40 shadow-[0_4px_20px_rgba(56,189,248,0.15)]',
          warning: 'border-amber-400/40 shadow-[0_4px_20px_rgba(251,191,36,0.15)]',
          error: 'border-rose-400/40 shadow-[0_4px_20px_rgba(244,63,94,0.15)]',
        };

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-3 rounded-xl bg-[#101720]/95 backdrop-blur-md border ${borderColors[toast.type]} text-slate-200 transition-all transform animate-in fade-in slide-in-from-bottom-2 duration-200`}
            role="status"
          >
            {icons[toast.type]}
            <p className="text-xs font-medium leading-relaxed flex-1 font-sans">
              {toast.message}
            </p>
            <button
              type="button"
              onClick={() => removeToast(toast.id)}
              className="text-slate-400 hover:text-slate-200 p-0.5 rounded transition-colors"
              aria-label="Dismiss toast"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
