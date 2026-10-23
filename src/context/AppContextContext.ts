import { createContext } from 'react';
import type { 
  AppScreen, 
  TimelineRange, 
  ArchiveReportData, 
  DeviceSetupState, 
  ScanLogEntry, 
  ToastMessage, 
  FictionalClip,
  CountryCode 
} from '../types';

export interface AppContextType {
  // Navigation
  screen: AppScreen;
  setScreen: (screen: AppScreen) => void;
  goBack: () => void;
  startOver: () => void;

  // Login & OTP
  countryCode: CountryCode;
  setCountryCode: (c: CountryCode) => void;
  phoneNumber: string;
  setPhoneNumber: (num: string) => void;
  phoneError: string | null;
  submitPhone: () => boolean;
  otp: string;
  setOtp: (val: string) => void;
  otpError: string | null;
  isOtpSuccess: boolean;
  verifyOtp: (inputCode?: string) => boolean;
  resendOtp: () => void;

  // Device Setup
  deviceState: DeviceSetupState;
  toggleBluetooth: () => void;
  toggleWifi: () => void;
  startDeviceConnection: () => void;
  dismissSuccessModal: () => void;

  // Timeline & Report
  timelineRange: TimelineRange;
  setTimelineRange: (range: TimelineRange) => void;
  report: ArchiveReportData | null;
  setReport: (r: ArchiveReportData | null) => void;

  // Scan
  isScanning: boolean;
  scanProgress: number;
  scanStageLabel: string;
  scanElapsedTime: string;
  scanLogs: ScanLogEntry[];
  startScan: () => void;
  cancelScan: () => void;

  // Modals & Drawers
  isShareModalOpen: boolean;
  openShareModal: () => void;
  closeShareModal: () => void;
  isRevealModalOpen: boolean;
  openRevealModal: () => void;
  closeRevealModal: () => void;
  activeClip: FictionalClip | null;
  openClipPlayer: (clip: FictionalClip) => void;
  closeClipPlayer: () => void;

  // Demo Report Route
  activeReportToken: string | null;
  previewReportWithToken: (token: string) => void;

  // Toasts
  toasts: ToastMessage[];
  showToast: (message: string, type?: ToastMessage['type']) => void;
  removeToast: (id: string) => void;
}

export const AppContext = createContext<AppContextType | null>(null);
