export type AppScreen = 
  | 'welcome' 
  | 'otp' 
  | 'device_setup' 
  | 'timeline' 
  | 'scan' 
  | 'results' 
  | 'demo_report';

export interface CountryCode {
  code: string;
  dialCode: string;
  name: string;
  flag: string;
}

export type TimelineRange = '3m' | '6m' | '12m';

export interface TimelineOption {
  id: TimelineRange;
  label: string;
  monthsCount: number;
  description: string;
  badge?: string;
  recommended?: boolean;
}

export interface FictionalClip {
  id: string;
  title: string;
  timestamp: string;
  durationSeconds: number;
  durationFormatted: string;
  resolution: string;
  codec: string;
  sizeMb: number;
  tag: string;
  simulatedScore: number;
}

export interface MonthArchiveRecord {
  monthKey: string;
  monthName: string;
  shortMonth: string;
  year: number;
  clipCount: number;
  totalDurationMinutes: number;
  totalDurationFormatted: string;
  status: string;
  activityBar: number[]; // e.g. 8 bars representing activity distribution
  clips: FictionalClip[];
}

export interface ArchiveReportData {
  token: string;
  sessionId: string;
  timelineRange: TimelineRange;
  timelineLabel: string;
  monthsCount: number;
  generatedAt: string;
  totalClips: number;
  totalDurationMinutes: number;
  totalDurationFormatted: string;
  months: MonthArchiveRecord[];
}

export interface DeviceSetupState {
  bluetoothOn: boolean;
  wifiOn: boolean;
  isConnecting: boolean;
  connectionStep: number;
  isConnected: boolean;
  showSuccessModal: boolean;
}

export interface ScanLogEntry {
  id: string;
  time: string;
  level: 'INFO' | 'OK' | 'SIM' | 'SYS' | 'INDEX';
  message: string;
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  message: string;
  timestamp: number;
}
