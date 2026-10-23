import React from 'react';
import { useApp } from '../../context/useApp';
import { CONNECTION_STAGES } from '../../mock/mockData';
import { 
  Bluetooth, 
  Wifi, 
  CheckCircle2, 
  ArrowRight, 
  ShieldAlert, 
  Cpu, 
  Radio, 
  Key, 
  Smartphone,
  Sparkles
} from 'lucide-react';
import { StatusBadge } from '../common/StatusBadge';

export const DeviceSetupScreen: React.FC = () => {
  const {
    deviceState,
    toggleBluetooth,
    toggleWifi,
    startDeviceConnection,
    dismissSuccessModal,
    phoneNumber,
  } = useApp();

  const {
    bluetoothOn,
    wifiOn,
    isConnecting,
    connectionStep,
    showSuccessModal,
  } = deviceState;

  const bothEnabled = bluetoothOn && wifiOn;

  const stageIcons = [
    <Cpu key="0" className="w-4 h-4 text-[#72F5A1]" />,
    <Smartphone key="1" className="w-4 h-4 text-[#38BDF8]" />,
    <Radio key="2" className="w-4 h-4 text-purple-400" />,
    <Key key="3" className="w-4 h-4 text-[#72F5A1]" />,
  ];

  return (
    <div className="w-full max-w-lg mx-auto py-6 sm:py-10 px-4">
      {/* Main Connection Setup Card */}
      <div className="rounded-2xl bg-[#101720] border border-[#1B2636] p-6 sm:p-8 shadow-2xl relative overflow-hidden backdrop-blur-sm">
        {/* Terminal Header */}
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#1B2636]">
          <div className="flex items-center gap-2">
            <Radio className="w-4 h-4 text-[#38BDF8]" />
            <span className="text-[11px] font-mono text-slate-300">DEVICE_VIRTUAL_PAIRING</span>
          </div>
          <StatusBadge
            label={isConnecting ? 'ESTABLISHING BRIDGE' : bothEnabled ? 'READY TO PAIR' : 'PENDING SIM TOGGLES'}
            variant={isConnecting ? 'amber' : bothEnabled ? 'neon' : 'neutral'}
            size="sm"
            dot={isConnecting || bothEnabled}
          />
        </div>

        {/* Title */}
        <div className="text-center mb-6">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-100">
            Connect Your Mobile
          </h2>
          <p className="mt-1.5 text-xs text-slate-400 max-w-sm mx-auto">
            Simulate an air-gapped device pairing session for digital forensics analysis.
          </p>
        </div>

        {/* Clear Notice: Fictional / Demo controls */}
        <div className="mb-6 p-3 rounded-xl bg-[#080B10] border border-[#1B2636] flex items-start gap-2.5">
          <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
            <strong className="text-slate-300">Simulated Radios Notice:</strong> These controls are fictional UI toggles. They do not turn on or change actual wireless hardware or phone settings.
          </p>
        </div>

        {/* Two Simulated Radio Toggles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          {/* Bluetooth Toggle */}
          <div
            onClick={toggleBluetooth}
            className={`cursor-pointer select-none p-4 rounded-xl border transition-all ${
              bluetoothOn
                ? 'bg-[#080B10] border-[#38BDF8]/60 shadow-[0_0_15px_rgba(56,189,248,0.15)]'
                : 'bg-[#080B10]/60 border-[#1B2636] hover:border-slate-700'
            } ${isConnecting ? 'pointer-events-none opacity-80' : ''}`}
          >
            <div className="flex items-center justify-between mb-3">
              <div
                className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${
                  bluetoothOn
                    ? 'bg-[#38BDF8]/20 text-[#38BDF8]'
                    : 'bg-slate-800 text-slate-500'
                }`}
              >
                <Bluetooth className="w-5 h-5" />
              </div>
              <span
                className={`text-[10px] font-mono px-2 py-0.5 rounded-full uppercase ${
                  bluetoothOn
                    ? 'bg-[#38BDF8]/20 text-[#38BDF8] border border-[#38BDF8]/40'
                    : 'bg-slate-800 text-slate-400 border border-slate-700'
                }`}
              >
                {bluetoothOn ? 'SIM: ON' : 'SIM: OFF'}
              </span>
            </div>

            <div className="font-semibold text-sm text-slate-200">Simulated Bluetooth</div>
            <div className="text-[11px] text-slate-400 mt-0.5">Mock short-range telemetry</div>

            {/* Visual toggle switch */}
            <div className="mt-4 pt-3 border-t border-[#1B2636] flex items-center justify-between">
              <span className="text-[11px] text-slate-400 font-mono">Channel State</span>
              <div
                className={`w-10 h-5 rounded-full p-0.5 transition-colors ${
                  bluetoothOn ? 'bg-[#38BDF8]' : 'bg-slate-800 border border-slate-700'
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-white transition-transform ${
                    bluetoothOn ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </div>
            </div>
          </div>

          {/* Wi-Fi Toggle */}
          <div
            onClick={toggleWifi}
            className={`cursor-pointer select-none p-4 rounded-xl border transition-all ${
              wifiOn
                ? 'bg-[#080B10] border-[#72F5A1]/60 shadow-[0_0_15px_rgba(114,245,161,0.15)]'
                : 'bg-[#080B10]/60 border-[#1B2636] hover:border-slate-700'
            } ${isConnecting ? 'pointer-events-none opacity-80' : ''}`}
          >
            <div className="flex items-center justify-between mb-3">
              <div
                className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${
                  wifiOn
                    ? 'bg-[#72F5A1]/20 text-[#72F5A1]'
                    : 'bg-slate-800 text-slate-500'
                }`}
              >
                <Wifi className="w-5 h-5" />
              </div>
              <span
                className={`text-[10px] font-mono px-2 py-0.5 rounded-full uppercase ${
                  wifiOn
                    ? 'bg-[#72F5A1]/20 text-[#72F5A1] border border-[#72F5A1]/40'
                    : 'bg-slate-800 text-slate-400 border border-slate-700'
                }`}
              >
                {wifiOn ? 'SIM: ON' : 'SIM: OFF'}
              </span>
            </div>

            <div className="font-semibold text-sm text-slate-200">Simulated Wi-Fi</div>
            <div className="text-[11px] text-slate-400 mt-0.5">Mock high-bandwidth stream</div>

            {/* Visual toggle switch */}
            <div className="mt-4 pt-3 border-t border-[#1B2636] flex items-center justify-between">
              <span className="text-[11px] text-slate-400 font-mono">Channel State</span>
              <div
                className={`w-10 h-5 rounded-full p-0.5 transition-colors ${
                  wifiOn ? 'bg-[#72F5A1]' : 'bg-slate-800 border border-slate-700'
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-slate-900 transition-transform ${
                    wifiOn ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Animated Connection Sequence Progression */}
        {isConnecting ? (
          <div className="mb-6 p-4 rounded-xl bg-[#080B10] border border-[#1B2636]">
            <div className="text-xs font-mono text-slate-300 uppercase tracking-wider mb-3 flex items-center justify-between">
              <span>Establishing Virtual Connection</span>
              <span className="text-[#72F5A1]">{connectionStep + 1} / {CONNECTION_STAGES.length}</span>
            </div>

            <div className="space-y-3">
              {CONNECTION_STAGES.map((stage, idx) => {
                const isDone = idx < connectionStep;
                const isCurrent = idx === connectionStep;

                return (
                  <div
                    key={stage.title}
                    className={`flex items-center gap-3 p-2 rounded-lg text-xs font-mono transition-colors ${
                      isCurrent
                        ? 'bg-[#101720] border border-[#72F5A1]/40 text-slate-100 shadow-[0_0_10px_rgba(114,245,161,0.1)]'
                        : isDone
                        ? 'text-slate-300 opacity-90'
                        : 'text-slate-600 opacity-60'
                    }`}
                  >
                    <div className="w-5 h-5 flex items-center justify-center shrink-0">
                      {isDone ? (
                        <CheckCircle2 className="w-4 h-4 text-[#72F5A1]" />
                      ) : isCurrent ? (
                        <div className="w-3.5 h-3.5 border-2 border-[#72F5A1] border-t-transparent rounded-full animate-spin" />
                      ) : (
                        stageIcons[idx]
                      )}
                    </div>

                    <div className="flex-1">
                      <div className="font-semibold">{stage.title}</div>
                      <div className="text-[10px] text-slate-500">{stage.subtitle}</div>
                    </div>

                    <div className="text-[10px] uppercase">
                      {isDone ? (
                        <span className="text-[#72F5A1]">DONE</span>
                      ) : isCurrent ? (
                        <span className="text-amber-400 animate-pulse">RUNNING...</span>
                      ) : (
                        <span className="text-slate-600">QUEUED</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : null}

        {/* Action Button */}
        {!isConnecting && (
          <button
            type="button"
            onClick={startDeviceConnection}
            disabled={!bothEnabled}
            className={`w-full py-3.5 px-4 rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-2 ${
              bothEnabled
                ? 'bg-[#72F5A1] hover:bg-[#5fe08f] text-[#080B10] shadow-[0_0_20px_rgba(114,245,161,0.25)] cursor-pointer hover:scale-[1.01] active:scale-[0.99]'
                : 'bg-slate-800 text-slate-500 border border-slate-700/50 cursor-not-allowed'
            }`}
          >
            <span>Start simulated connection</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}

        {!bothEnabled && !isConnecting && (
          <p className="mt-3 text-center text-[11px] text-slate-500 font-mono">
            * Please toggle both simulated Bluetooth and Wi-Fi to ON to initialize the handshake.
          </p>
        )}
      </div>

      {/* Screen 4: Polished Connection Success Modal */}
      {showSuccessModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 xs:p-4 sm:p-6 bg-[#080B10]/85 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto"
        >
          <div className="w-full max-w-[94vw] xs:max-w-md my-auto max-h-[92vh] overflow-y-auto rounded-2xl bg-[#101720] border border-[#72F5A1]/40 p-5 xs:p-6 sm:p-8 shadow-[0_0_50px_rgba(114,245,161,0.2)] text-center relative animate-in zoom-in-95 duration-200">
            {/* Ambient cyber glow */}
            <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-48 h-48 bg-[#72F5A1]/15 blur-2xl rounded-full pointer-events-none" />

            {/* Success icon with pulsing rings */}
            <div className="relative mx-auto w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#72F5A1]/10 border border-[#72F5A1]/40 flex items-center justify-center mb-4 sm:mb-5 shadow-[0_0_25px_rgba(114,245,161,0.3)]">
              <CheckCircle2 className="w-7 h-7 sm:w-8 sm:h-8 text-[#72F5A1]" />
              <div className="absolute inset-0 rounded-full border border-[#72F5A1]/60 animate-ping opacity-30" />
            </div>

            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white mb-2 leading-snug">
              Mobile connected successfully
            </h3>

            {/* Clearly identify the device as a fictional demo device */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#080B10] border border-[#1B2636] text-[11px] sm:text-xs font-mono text-slate-300 mb-3 sm:mb-4">
              <Sparkles className="w-3.5 h-3.5 text-[#72F5A1]" />
              <span>Virtual Device · Demo Session</span>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 mb-4 sm:mb-6 leading-relaxed">
              Virtual air-gapped forensic bridge established for target{' '}
              <span className="font-mono text-slate-200 font-semibold">{phoneNumber || '9063411276'}</span>. Ready to select archive timeline.
            </p>

            {/* Locally generated session ID */}
            <div className="mb-5 sm:mb-6 p-2.5 rounded-lg bg-[#080B10] border border-[#1B2636] text-[10px] sm:text-[11px] font-mono text-slate-400 flex items-center justify-between">
              <span>LOCAL SESSION ID:</span>
              <span className="text-[#72F5A1] font-semibold">VT-SIM-78942</span>
            </div>

            <button
              type="button"
              onClick={dismissSuccessModal}
              className="w-full py-3 sm:py-3.5 px-4 rounded-xl bg-[#72F5A1] hover:bg-[#5fe08f] text-[#080B10] font-bold text-sm transition-all shadow-[0_0_20px_rgba(114,245,161,0.25)] flex items-center justify-center gap-2 cursor-pointer active:scale-98"
            >
              <span>Continue to archive</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
