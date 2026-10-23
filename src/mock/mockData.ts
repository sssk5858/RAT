import type { CountryCode, FictionalClip, MonthArchiveRecord, ArchiveReportData, TimelineRange } from '../types';

export const DEMO_PHONE = '9063411276';
export const DEMO_OTP = '796600';

export const COUNTRY_CODES: CountryCode[] = [
  { code: 'IN', dialCode: '+91', name: 'India', flag: '🇮🇳' },
  { code: 'US', dialCode: '+1', name: 'United States', flag: '🇺🇸' },
  { code: 'GB', dialCode: '+44', name: 'United Kingdom', flag: '🇬🇧' },
  { code: 'AE', dialCode: '+971', name: 'United Arab Emirates', flag: '🇦🇪' },
  { code: 'SG', dialCode: '+65', name: 'Singapore', flag: '🇸🇬' },
  { code: 'AU', dialCode: '+61', name: 'Australia', flag: '🇦🇺' },
  { code: 'DE', dialCode: '+49', name: 'Germany', flag: '🇩🇪' },
  { code: 'CA', dialCode: '+1', name: 'Canada', flag: '🇨🇦' },
  { code: 'JP', dialCode: '+81', name: 'Japan', flag: '🇯🇵' },
];

export const CONNECTION_STAGES = [
  { title: 'Initializing demo session', subtitle: 'Spinning up local isolated virtual environment' },
  { title: 'Preparing virtual device profile', subtitle: 'Synthesizing harmless sandbox telemetry' },
  { title: 'Establishing simulated channel', subtitle: 'Negotiating mock handshake over virtual bridge' },
  { title: 'Verifying demo handshake', subtitle: 'Virtual session authenticated safely' },
];

export const SCAN_STAGES = [
  { label: 'Initializing virtual archive', minPercent: 0, maxPercent: 20 },
  { label: 'Indexing simulated monthly records', minPercent: 20, maxPercent: 45 },
  { label: 'Analyzing placeholder media metadata', minPercent: 45, maxPercent: 70 },
  { label: 'Building timeline report', minPercent: 70, maxPercent: 90 },
  { label: 'Preparing demo results', minPercent: 90, maxPercent: 100 },
];

export const SCAN_LOG_POOL = [
  { level: 'SYS' as const, message: 'Isolated sandbox environment instantiated in memory' },
  { level: 'SIM' as const, message: 'Simulated bridge interface bound to virtual loopback' },
  { level: 'INFO' as const, message: 'Parsing timeline request bounds from current session' },
  { level: 'INDEX' as const, message: 'Scanning placeholder metadata clusters [Sector 0x7F]' },
  { level: 'OK' as const, message: 'Telemetry mock hash validated: SIM-SHA256-PASS' },
  { level: 'SIM' as const, message: 'Constructing simulated chronological video index' },
  { level: 'INFO' as const, message: 'Allocating mock duration buffers and resolution tags' },
  { level: 'SYS' as const, message: 'Verifying zero file-system access constraints' },
  { level: 'INDEX' as const, message: 'Simulated bucket aggregation completed: 100% synthetic' },
  { level: 'OK' as const, message: 'Encrypted mock container signature verified' },
  { level: 'SIM' as const, message: 'Synthesizing activity frequency charts for report' },
  { level: 'INFO' as const, message: 'Formatting forensic timestamp display matrices' },
  { level: 'SYS' as const, message: 'Parsing temporal video sequence headers' },
  { level: 'INDEX' as const, message: 'Extracting synthetic keyframe index for October partition' },
  { level: 'INDEX' as const, message: 'Extracting synthetic keyframe index for September partition' },
  { level: 'INFO' as const, message: 'Cross-referencing duration clusters with local telemetry' },
  { level: 'SIM' as const, message: 'Generating placeholder audio-spectral fingerprints' },
  { level: 'SYS' as const, message: 'Validating memory buffer integrity [Pool 0xBF80]' },
  { level: 'INDEX' as const, message: 'Compiling monthly aggregation metrics' },
  { level: 'OK' as const, message: 'Virtual session telemetry sealed and verified' },
  { level: 'SYS' as const, message: 'Finalizing interactive report dashboard' },
];

// Simple deterministic hash based on string
function simpleHash(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const SHORT_MONTHS = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

const CLIP_TAGS = [
  'Ambient Loop', 'Spectral Telemetry', 'Synthetic Motion', 
  'Grid Sweep', 'Sensor Mock', 'Virtual Keyframe', 'Wireframe Flow'
];

export function generateClipsForMonth(monthKey: string, count: number): FictionalClip[] {
  const clips: FictionalClip[] = [];
  const baseHash = simpleHash(monthKey);
  const [yearStr, monthStr] = monthKey.split('-');
  const year = parseInt(yearStr, 10);
  const monthIdx = parseInt(monthStr, 10) - 1;

  for (let i = 1; i <= Math.min(count, 8); i++) {
    const itemSeed = (baseHash + i * 37) % 1000;
    const day = (itemSeed % 28) + 1;
    const hour = (itemSeed % 24).toString().padStart(2, '0');
    const minute = ((itemSeed * 3) % 60).toString().padStart(2, '0');
    const second = ((itemSeed * 7) % 60).toString().padStart(2, '0');
    const durationSec = 45 + (itemSeed % 210); // 45s to 255s
    const durMin = Math.floor(durationSec / 60);
    const durSec = durationSec % 60;
    const tag = CLIP_TAGS[(itemSeed + i) % CLIP_TAGS.length];
    const size = ((itemSeed % 40) + 12.4).toFixed(1);

    clips.push({
      id: `CLIP-${year}-${(monthIdx + 1).toString().padStart(2, '0')}-${i.toString().padStart(3, '0')}`,
      title: `Archive Clip #${i.toString().padStart(3, '0')} · ${tag}`,
      timestamp: `${SHORT_MONTHS[monthIdx]} ${day.toString().padStart(2, '0')}, ${year} • ${hour}:${minute}:${second}`,
      durationSeconds: durationSec,
      durationFormatted: durMin > 0 ? `${durMin}m ${durSec}s` : `${durSec}s`,
      resolution: i % 3 === 0 ? '4K UHD (Simulated)' : '1080p FHD (Simulated)',
      codec: 'H.264 / AVC (Mock)',
      sizeMb: parseFloat(size),
      tag,
      simulatedScore: 85 + (itemSeed % 15),
    });
  }

  return clips;
}

export function generateReportData(timelineRange: TimelineRange, referenceDate = new Date()): ArchiveReportData {
  const countMap: Record<TimelineRange, number> = {
    '3m': 3,
    '6m': 6,
    '12m': 12,
  };
  const monthsCount = countMap[timelineRange];

  const months: MonthArchiveRecord[] = [];
  let totalClips = 0;
  let totalMinutes = 0;

  // Deterministic target total hours between 100h and 200h
  const rangeTargetHours: Record<TimelineRange, number> = {
    '3m': 138, // ~138 hours
    '6m': 168, // ~168 hours
    '12m': 186, // ~186 hours
  };
  const targetMinutesTotal = rangeTargetHours[timelineRange] * 60 + 42;
  const baseMinutesPerMonth = Math.floor(targetMinutesTotal / monthsCount);

  // Compute month records backwards from referenceDate
  for (let i = 0; i < monthsCount; i++) {
    const d = new Date(referenceDate.getFullYear(), referenceDate.getMonth() - i, 1);
    const year = d.getFullYear();
    const monthIdx = d.getMonth();
    const monthKey = `${year}-${(monthIdx + 1).toString().padStart(2, '0')}`;
    
    // Deterministic clip count between 22 and 46
    const hash = simpleHash(`VAULT-${monthKey}`);
    const clipCount = 22 + (hash % 25);
    
    // Vary monthly minutes slightly (+/- 14%) so each month is unique but total stays in 100-200hr range
    const variation = ((hash % 29) - 14) / 100;
    const monthMinutes = Math.round(baseMinutesPerMonth * (1 + variation));
    const hours = Math.floor(monthMinutes / 60);
    const mins = monthMinutes % 60;
    const durationFormatted = `${hours}h ${mins}m`;

    // Activity bar: 8 bars with deterministic heights (20% to 100%)
    const activityBar: number[] = [];
    for (let b = 0; b < 8; b++) {
      const barVal = 25 + ((hash * (b + 3) + b * 17) % 75);
      activityBar.push(barVal);
    }

    const clips = generateClipsForMonth(monthKey, clipCount);

    totalClips += clipCount;
    totalMinutes += monthMinutes;

    months.push({
      monthKey,
      monthName: `${MONTH_NAMES[monthIdx]} ${year}`,
      shortMonth: SHORT_MONTHS[monthIdx],
      year,
      clipCount,
      totalDurationMinutes: monthMinutes,
      totalDurationFormatted: durationFormatted,
      status: 'Indexed — Demo',
      activityBar,
      clips,
    });
  }

  const totalHours = Math.floor(totalMinutes / 60);
  const totalMins = totalMinutes % 60;
  const totalDurationFormatted = `${totalHours}h ${totalMins}m`;

  const token = generateSecureToken();
  const sessionId = `VT-SIM-${(simpleHash(token) % 90000 + 10000)}`;

  const labelMap: Record<TimelineRange, string> = {
    '3m': 'Last 3 Months',
    '6m': 'Last 6 Months',
    '12m': 'Last 12 Months',
  };

  const report: ArchiveReportData = {
    token,
    sessionId,
    timelineRange,
    timelineLabel: labelMap[timelineRange],
    monthsCount,
    generatedAt: formatReportDate(referenceDate),
    totalClips,
    totalDurationMinutes: totalMinutes,
    totalDurationFormatted,
    months,
  };

  // Cache report locally for demo link retrieval
  saveReportLocally(report);

  return report;
}

export function formatReportDate(d: Date): string {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
    timeZoneName: 'short'
  };
  return new Intl.DateTimeFormat('en-US', options).format(d);
}

export function generateSecureToken(): string {
  try {
    if (typeof crypto !== 'undefined' && crypto.randomUUID) {
      return crypto.randomUUID().replace(/-/g, '').slice(0, 16);
    }
  } catch {
    // fallback
  }
  return Math.random().toString(36).substring(2, 10) + Math.random().toString(36).substring(2, 10);
}

const STORAGE_PREFIX = 'vaulttrace_report_';

export function saveReportLocally(report: ArchiveReportData): void {
  try {
    localStorage.setItem(`${STORAGE_PREFIX}${report.token}`, JSON.stringify(report));
  } catch (err) {
    console.warn('Unable to write to localStorage in sandbox', err);
  }
}

export function getReportLocally(token: string): ArchiveReportData | null {
  try {
    const raw = localStorage.getItem(`${STORAGE_PREFIX}${token}`);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (err) {
    console.warn('Unable to read from localStorage', err);
  }

  // If not found in localStorage (e.g. fresh session or different tab),
  // generate a deterministic fallback report using the token so the demo link preview is fully functional!
  if (token && token.length >= 6) {
    const fallback = generateReportData('6m');
    fallback.token = token;
    fallback.sessionId = `VT-SIM-${(simpleHash(token) % 90000 + 10000)}`;
    return fallback;
  }

  return null;
}
