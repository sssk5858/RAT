import React from 'react';
import { useApp } from '../context/useApp';
import { BrandHeader } from './common/BrandHeader';
import { CyberBackground } from './common/CyberBackground';
import { ToastContainer } from './common/Toast';
import { WelcomeLoginScreen } from './screens/WelcomeLoginScreen';
import { OtpScreen } from './screens/OtpScreen';
import { DeviceSetupScreen } from './screens/DeviceSetupScreen';
import { TimelineSelectScreen } from './screens/TimelineSelectScreen';
import { CinematicScanScreen } from './screens/CinematicScanScreen';
import { ArchiveResultsScreen } from './screens/ArchiveResultsScreen';
import { DemoReportView } from './screens/DemoReportView';
import { ShareReportModal } from './modals/ShareReportModal';
import { ClipPlayerModal } from './modals/ClipPlayerModal';
import { ShieldCheck } from 'lucide-react';

export const AppShell: React.FC = () => {
  const { screen } = useApp();

  const renderActiveScreen = () => {
    switch (screen) {
      case 'welcome':
        return <WelcomeLoginScreen />;
      case 'otp':
        return <OtpScreen />;
      case 'device_setup':
        return <DeviceSetupScreen />;
      case 'timeline':
        return <TimelineSelectScreen />;
      case 'scan':
        return <CinematicScanScreen />;
      case 'results':
        return <ArchiveResultsScreen />;
      case 'demo_report':
        return <DemoReportView />;
      default:
        return <WelcomeLoginScreen />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#080B10] text-slate-100 relative selection:bg-[#72F5A1]/30 selection:text-[#72F5A1]">
      {/* Background visual effects */}
      <CyberBackground />

      {/* Persistent Brand Header */}
      <BrandHeader />

      {/* Main Screen Content */}
      <main className="flex-1 flex flex-col justify-center w-full">
        {renderActiveScreen()}
      </main>

      {/* Footer */}
      <footer className="border-t border-[#1B2636] bg-[#080B10]/90 backdrop-blur-md py-4 px-4 sm:px-6 transition-colors">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] font-mono text-slate-500">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-[#72F5A1]" />
            <span>VAULT TRACE · Fictional Cyber-Forensics Archive Simulator</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-slate-500">AIR-GAPPED CLIENT ENGINE</span>
            <span className="hidden sm:inline text-slate-700">|</span>
            <span className="text-slate-600">ISOLATED SANDBOX</span>
          </div>
        </div>
      </footer>

      {/* Global Modals */}
      <ShareReportModal />
      <ClipPlayerModal />

      {/* Floating Toast Notification Stack */}
      <ToastContainer />
    </div>
  );
};
