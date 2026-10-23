import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/useApp';
import { X, Play, Pause, Volume2, VolumeX, ShieldAlert, Film, Maximize2 } from 'lucide-react';
import { StatusBadge } from '../common/StatusBadge';

export const ClipPlayerModal: React.FC = () => {
  const { activeClip, closeClipPlayer } = useApp();
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTimeSec, setCurrentTimeSec] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeClipPlayer();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [closeClipPlayer]);

  // Simulated player playback timer
  useEffect(() => {
    if (!activeClip || !isPlaying) return;

    const interval = setInterval(() => {
      setCurrentTimeSec((prev) => {
        if (prev >= activeClip.durationSeconds) {
          return 0; // loop
        }
        return prev + 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [activeClip, isPlaying]);

  // Cyber canvas visualizer animation (spectral waveforms & grid telemetry)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !activeClip) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let phase = 0;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Cyber background grid
      ctx.fillStyle = '#090D14';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Grid lines
      ctx.strokeStyle = 'rgba(27, 38, 54, 0.4)';
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 30) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += 30) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      if (isPlaying) {
        phase += 0.04;
      }

      // Draw spectral sine waves
      ctx.lineWidth = 2;
      for (let w = 0; w < 3; w++) {
        ctx.beginPath();
        ctx.strokeStyle = w === 0 ? '#72F5A1' : w === 1 ? '#38BDF8' : 'rgba(168, 85, 247, 0.7)';
        for (let x = 0; x < canvas.width; x += 4) {
          const freq = 0.015 + w * 0.008;
          const amp = 30 + w * 15;
          const y = canvas.height / 2 + Math.sin(x * freq + phase * (w + 1)) * amp * Math.cos(phase * 0.5);
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      // Simulated radar reticle in corner
      ctx.strokeStyle = 'rgba(114, 245, 161, 0.5)';
      ctx.beginPath();
      ctx.arc(60, 60, 35, 0, Math.PI * 2);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(60, 25);
      ctx.lineTo(60, 95);
      ctx.moveTo(25, 60);
      ctx.lineTo(95, 60);
      ctx.stroke();

      // Audio frequency bars at bottom
      const bars = 24;
      const barWidth = 6;
      const spacing = 4;
      const startX = canvas.width - (bars * (barWidth + spacing)) - 20;
      for (let b = 0; b < bars; b++) {
        const height = isPlaying
          ? Math.abs(Math.sin(phase * 2 + b * 0.4)) * 40 + 8
          : 6;
        ctx.fillStyle = b > 18 ? '#F59E0B' : '#72F5A1';
        ctx.fillRect(startX + b * (barWidth + spacing), canvas.height - 20 - height, barWidth, height);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animationFrameId);
  }, [isPlaying, activeClip]);

  if (!activeClip) return null;

  const currentMin = Math.floor(currentTimeSec / 60);
  const currentSec = currentTimeSec % 60;
  const currentFormatted = `${currentMin.toString().padStart(2, '0')}:${currentSec.toString().padStart(2, '0')}`;
  const totalMin = Math.floor(activeClip.durationSeconds / 60);
  const totalSec = activeClip.durationSeconds % 60;
  const totalFormatted = `${totalMin.toString().padStart(2, '0')}:${totalSec.toString().padStart(2, '0')}`;

  const progressPercent = (currentTimeSec / activeClip.durationSeconds) * 100;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#080B10]/85 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div className="w-full max-w-2xl rounded-2xl bg-[#101720] border border-[#1B2636] shadow-2xl overflow-hidden flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#1B2636] bg-[#0D121A]">
          <div className="flex items-center gap-2.5">
            <Film className="w-4 h-4 text-[#72F5A1]" />
            <span className="text-xs font-mono font-semibold text-slate-200 uppercase">
              {activeClip.title}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <StatusBadge label="SIMULATED STREAM" variant="simulation" size="sm" />
            <button
              type="button"
              onClick={closeClipPlayer}
              className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
              aria-label="Close clip player"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Video Canvas Area */}
        <div className="relative aspect-video w-full bg-black flex items-center justify-center overflow-hidden">
          {activeClip.timestamp.toLowerCase().includes('oct') || activeClip.id.includes('-10-') ? (
            <img 
              src="/OCT.jpeg" 
              alt="October Intercept Preview" 
              className="absolute inset-0 w-full h-full object-cover opacity-35" 
            />
          ) : activeClip.timestamp.toLowerCase().includes('sep') || activeClip.id.includes('-09-') ? (
            <img 
              src="/Sept.png" 
              alt="September Intercept Preview" 
              className="absolute inset-0 w-full h-full object-cover opacity-35" 
            />
          ) : null}

          <canvas
            ref={canvasRef}
            width={640}
            height={360}
            className="relative z-10 w-full h-full object-cover opacity-90"
          />

          {/* Watermark Overlay */}
          <div className="absolute top-4 left-4 flex items-center gap-2 px-2.5 py-1 rounded bg-[#080B10]/80 border border-[#72F5A1]/30 backdrop-blur-sm text-[10px] font-mono text-[#72F5A1]">
            <span className="w-2 h-2 rounded-full bg-[#72F5A1] animate-ping" />
            <span>SIMULATED ARCHIVE RECORDING // NO DEVICE ACCESS</span>
          </div>

          <div className="absolute top-4 right-4 text-[10px] font-mono text-slate-400 bg-black/60 px-2 py-0.5 rounded">
            {activeClip.resolution}
          </div>

          {/* Center Play Overlay on Pause */}
          {!isPlaying && (
            <div 
              onClick={() => setIsPlaying(true)}
              className="absolute inset-0 flex items-center justify-center bg-black/40 cursor-pointer"
            >
              <div className="w-16 h-16 rounded-full bg-[#72F5A1]/20 border border-[#72F5A1] flex items-center justify-center text-[#72F5A1] hover:scale-110 transition-transform">
                <Play className="w-7 h-7 ml-1" />
              </div>
            </div>
          )}
        </div>

        {/* Playback Controls & Scrubber */}
        <div className="p-4 bg-[#0D121A] border-t border-[#1B2636] space-y-3">
          {/* Progress bar */}
          <div className="relative w-full h-1.5 bg-slate-800 rounded-full overflow-hidden cursor-pointer">
            <div
              className="h-full bg-[#72F5A1] transition-all"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          {/* Button Row */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-8 h-8 rounded-lg bg-[#101720] hover:bg-slate-800 border border-[#1B2636] flex items-center justify-center text-slate-200 transition-colors"
                aria-label={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
              </button>

              <button
                type="button"
                onClick={() => setIsMuted(!isMuted)}
                className="w-8 h-8 rounded-lg bg-[#101720] hover:bg-slate-800 border border-[#1B2636] flex items-center justify-center text-slate-200 transition-colors"
                aria-label={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted ? <VolumeX className="w-4 h-4 text-slate-500" /> : <Volume2 className="w-4 h-4 text-slate-300" />}
              </button>

              <span className="text-xs font-mono text-slate-400">
                <span className="text-white">{currentFormatted}</span> / {totalFormatted}
              </span>
            </div>

            {/* Metadata tags */}
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                {activeClip.codec}
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                {activeClip.sizeMb} MB
              </span>
              <button
                type="button"
                onClick={() => {}}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white"
                title="Simulated Fullscreen"
              >
                <Maximize2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Safety Footer */}
        <div className="px-5 py-2.5 bg-[#080B10] border-t border-[#1B2636] flex items-center gap-2 text-xs text-slate-400">
          <ShieldAlert className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span className="text-[11px]">
            This video preview is synthesized dynamically in-browser for demo visualization. No actual camera or video files were accessed.
          </span>
        </div>
      </div>
    </div>
  );
};
