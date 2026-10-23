import React from 'react';

interface StatusBadgeProps {
  label: string;
  variant?: 'neon' | 'blue' | 'amber' | 'neutral' | 'simulation';
  dot?: boolean;
  className?: string;
  size?: 'sm' | 'md';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  label,
  variant = 'neutral',
  dot = false,
  className = '',
  size = 'md',
}) => {
  const sizeClasses = size === 'sm' ? 'px-2 py-0.5 text-[10px]' : 'px-2.5 py-1 text-xs';

  const variantStyles = {
    neon: 'bg-[#72F5A1]/10 text-[#72F5A1] border-[#72F5A1]/30 shadow-[0_0_12px_rgba(114,245,161,0.15)]',
    blue: 'bg-[#38BDF8]/10 text-[#38BDF8] border-[#38BDF8]/30',
    amber: 'bg-amber-400/10 text-amber-300 border-amber-400/30',
    neutral: 'bg-slate-800/60 text-slate-400 border-slate-700/50',
    simulation: 'bg-[#72F5A1]/10 text-[#72F5A1] border-[#72F5A1]/40 font-mono tracking-wider',
  };

  const dotColors = {
    neon: 'bg-[#72F5A1]',
    blue: 'bg-[#38BDF8]',
    amber: 'bg-amber-400',
    neutral: 'bg-slate-400',
    simulation: 'bg-[#72F5A1] animate-pulse',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-medium rounded-full border uppercase tracking-wider ${sizeClasses} ${variantStyles[variant]} ${className}`}
    >
      {dot && (
        <span
          className={`w-1.5 h-1.5 rounded-full inline-block ${dotColors[variant]}`}
        />
      )}
      <span>{label}</span>
    </span>
  );
};
