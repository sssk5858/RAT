import React from 'react';

export const CyberBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden" aria-hidden="true">
      {/* Background Cyber Grid */}
      <div className="absolute inset-0 cyber-grid opacity-30" />

      {/* Radial ambient lighting */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[450px] bg-gradient-to-b from-[#72F5A1]/5 via-[#38BDF8]/5 to-transparent blur-3xl rounded-full" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[400px] bg-[#38BDF8]/5 blur-3xl rounded-full" />

      {/* Corner Cyber Crosshairs */}
      <div className="absolute top-4 left-4 w-6 h-6 border-t border-l border-[#1B2636]" />
      <div className="absolute top-4 right-4 w-6 h-6 border-t border-r border-[#1B2636]" />
      <div className="absolute bottom-4 left-4 w-6 h-6 border-b border-l border-[#1B2636]" />
      <div className="absolute bottom-4 right-4 w-6 h-6 border-b border-r border-[#1B2636]" />

      {/* Decorative technical coordinate stamps */}
      <div className="absolute bottom-2 left-6 text-[9px] font-mono text-slate-700 select-none hidden md:block">
        SYS.SEC // LATENCY: 0.12MS // SANDBOX: ACTIVE
      </div>
      <div className="absolute bottom-2 right-6 text-[9px] font-mono text-slate-700 select-none hidden md:block">
        ISOLATION: 100% // NO-HARDWARE-ACCESS
      </div>
    </div>
  );
};
