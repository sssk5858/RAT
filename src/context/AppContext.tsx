import React, { useState, useEffect, useRef, useCallback } from 'react';
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
import {
  COUNTRY_CODES,
  DEMO_PHONE,
  DEMO_OTP,
  CONNECTION_STAGES,
  SCAN_STAGES,
  SCAN_LOG_POOL,
  generateReportData,
  getReportLocally
} from '../mock/mockData';
import { AppContext } from './AppContextContext';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [screen, setScreen] = useState<AppScreen>('welcome');
  const [historyStack, setHistoryStack] = useState<AppScreen[]>(['welcome']);

  // Login
  const [countryCode, setCountryCode] = useState<CountryCode>(COUNTRY_CODES[0]); // default +91
  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneError, setPhoneError] = useState<string | null>(null);

  // OTP
  const [otp, setOtp] = useState('');
  const [otpError, setOtpError] = useState<string | null>(null);
  const [isOtpSuccess, setIsOtpSuccess] = useState(false);

  // Device Setup
  const [deviceState, setDeviceState] = useState<DeviceSetupState>({
    bluetoothOn: false,
    wifiOn: false,
    isConnecting: false,
    connectionStep: 0,
    isConnected: false,
    showSuccessModal: false,
  });

  // Timeline
  const [timelineRange, setTimelineRange] = useState<TimelineRange>('6m'); // default 6 months
  const [report, setReport] = useState<ArchiveReportData | null>(null);

  // Scan
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [scanStageLabel, setScanStageLabel] = useState(SCAN_STAGES[0].label);
  const [scanElapsedTime, setScanElapsedTime] = useState('00:00.0');
  const [scanLogs, setScanLogs] = useState<ScanLogEntry[]>([]);

  // Modals
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isRevealModalOpen, setIsRevealModalOpen] = useState(false);
  const [activeClip, setActiveClip] = useState<FictionalClip | null>(null);

  // Report Token for standalone preview
  const [activeReportToken, setActiveReportToken] = useState<string | null>(null);

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Timers ref for clean destruction
  const connectionTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const scanIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const scanTimerStartRef = useRef<number>(0);

  const showToast = useCallback((message: string, type: ToastMessage['type'] = 'info') => {
    const id = `${Date.now()}_${Math.random()}`;
    const newToast: ToastMessage = { id, message, type, timestamp: Date.now() };
    setToasts((prev) => [...prev.slice(-4), newToast]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const navigateTo = useCallback((nextScreen: AppScreen) => {
    setHistoryStack((prev) => [...prev, nextScreen]);
    setScreen(nextScreen);
  }, []);

  const goBack = useCallback(() => {
    if (historyStack.length > 1) {
      const newStack = [...historyStack];
      newStack.pop();
      const prevScreen = newStack[newStack.length - 1];
      setHistoryStack(newStack);
      setScreen(prevScreen);
    } else {
      setScreen('welcome');
    }
  }, [historyStack]);

  // Clean-up and Reset All
  const startOver = useCallback(() => {
    if (connectionTimerRef.current) clearInterval(connectionTimerRef.current);
    if (scanIntervalRef.current) clearInterval(scanIntervalRef.current);

    setPhoneNumber('');
    setPhoneError(null);
    setOtp('');
    setOtpError(null);
    setIsOtpSuccess(false);

    setDeviceState({
      bluetoothOn: false,
      wifiOn: false,
      isConnecting: false,
      connectionStep: 0,
      isConnected: false,
      showSuccessModal: false,
    });

    setTimelineRange('6m');
    setReport(null);
    setIsScanning(false);
    setScanProgress(0);
    setScanLogs([]);

    setIsShareModalOpen(false);
    setIsRevealModalOpen(false);
    setActiveClip(null);
    setActiveReportToken(null);

    // Reset hash if present
    if (window.location.hash) {
      window.history.pushState('', document.title, window.location.pathname);
    }

    setHistoryStack(['welcome']);
    setScreen('welcome');
    showToast('Simulation reset. Returned to welcome interface.', 'info');
  }, [showToast]);

  // Handle URL hash / route detection (e.g. #/demo-report/:token or ?token=)
  useEffect(() => {
    const checkHashRoute = () => {
      const hash = window.location.hash;
      const reportMatch = hash.match(/demo-report\/([a-zA-Z0-9_-]+)/);
      if (reportMatch && reportMatch[1]) {
        const token = reportMatch[1];
        setActiveReportToken(token);
        const rep = getReportLocally(token);
        if (rep) {
          setReport(rep);
        }
        setScreen('demo_report');
      }
    };

    checkHashRoute();
    window.addEventListener('hashchange', checkHashRoute);
    return () => window.removeEventListener('hashchange', checkHashRoute);
  }, []);

  // Login validation
  const submitPhone = useCallback(() => {
    const cleanDigits = phoneNumber.replace(/\D/g, '');
    if (!cleanDigits) {
      setPhoneError('Please enter a target mobile identifier.');
      return false;
    }
    if (cleanDigits !== DEMO_PHONE) {
      setPhoneError(`Access restricted: Target ID must match authorized device.`);
      return false;
    }
    setPhoneError(null);
    navigateTo('otp');
    showToast('Target device intercepted. Enter the 6-digit authorization code.', 'info');
    return true;
  }, [phoneNumber, navigateTo, showToast]);

  // OTP Verification
  const verifyOtp = useCallback((inputCode?: string) => {
    const codeToTest = inputCode ?? otp;
    if (codeToTest === DEMO_OTP) {
      setOtpError(null);
      setIsOtpSuccess(true);
      showToast('Authentication validated. Initializing device bridge...', 'success');
      setTimeout(() => {
        navigateTo('device_setup');
      }, 1200);
      return true;
    } else {
      setOtpError('Invalid authorization code. Verification failed.');
      return false;
    }
  }, [otp, navigateTo, showToast]);

  const resendOtp = useCallback(() => {
    setOtp('');
    setOtpError(null);
    showToast('Authorization challenge refreshed. Awaiting 6-digit token.', 'info');
  }, [showToast]);

  // Device Setup Toggles
  const toggleBluetooth = useCallback(() => {
    if (deviceState.isConnecting || deviceState.isConnected) return;
    setDeviceState((prev) => ({ ...prev, bluetoothOn: !prev.bluetoothOn }));
  }, [deviceState.isConnecting, deviceState.isConnected]);

  const toggleWifi = useCallback(() => {
    if (deviceState.isConnecting || deviceState.isConnected) return;
    setDeviceState((prev) => ({ ...prev, wifiOn: !prev.wifiOn }));
  }, [deviceState.isConnecting, deviceState.isConnected]);

  const startDeviceConnection = useCallback(() => {
    if (!deviceState.bluetoothOn || !deviceState.wifiOn) {
      showToast('Please enable both simulated Bluetooth and Wi-Fi toggles first.', 'warning');
      return;
    }

    setDeviceState((prev) => ({ ...prev, isConnecting: true, connectionStep: 0 }));

    let currentStep = 0;
    // Each step takes 3200ms (~13 seconds total for authentic feel)
    const interval = setInterval(() => {
      currentStep++;
      if (currentStep < CONNECTION_STAGES.length) {
        setDeviceState((prev) => ({ ...prev, connectionStep: currentStep }));
      } else {
        clearInterval(interval);
        setDeviceState((prev) => ({
          ...prev,
          isConnecting: false,
          isConnected: true,
          showSuccessModal: true,
        }));
      }
    }, 3200);

    connectionTimerRef.current = interval;
  }, [deviceState.bluetoothOn, deviceState.wifiOn, showToast]);

  const dismissSuccessModal = useCallback(() => {
    setDeviceState((prev) => ({ ...prev, showSuccessModal: false }));
    navigateTo('timeline');
  }, [navigateTo]);

  // Scan Logic (Takes 1 minute / 60 seconds for suspenseful realistic cyber forensic feel)
  const startScan = useCallback(() => {
    navigateTo('scan');
    setIsScanning(true);
    setScanProgress(0);
    setScanLogs([]);
    scanTimerStartRef.current = Date.now();

    // Initial log
    setScanLogs([
      {
        id: 'log-0',
        time: '00:00.1',
        level: 'SYS',
        message: 'Initializing isolated virtual archive sandbox',
      },
    ]);

    let logCounter = 1;
    let lastLogTime = Date.now();
    const TOTAL_SCAN_DURATION_MS = 60000; // 60 seconds (1 minute)

    const interval = setInterval(() => {
      const now = Date.now();
      const elapsedMs = now - scanTimerStartRef.current;
      const progressFraction = Math.min(1, elapsedMs / TOTAL_SCAN_DURATION_MS);
      const currentPct = Math.min(100, Math.floor(progressFraction * 100));

      const elapsedSec = (elapsedMs / 1000).toFixed(1);
      const secondsInt = Math.floor(parseFloat(elapsedSec));
      const tenths = Math.floor((parseFloat(elapsedSec) - secondsInt) * 10);
      const minStr = Math.floor(secondsInt / 60).toString().padStart(2, '0');
      const secStr = (secondsInt % 60).toString().padStart(2, '0');
      setScanElapsedTime(`${minStr}:${secStr}.${tenths}`);

      if (progressFraction >= 1) {
        setScanProgress(100);
        setScanStageLabel('Preparing demo results');
        clearInterval(interval);

        // Generate report data deterministically
        const generated = generateReportData(timelineRange);
        setReport(generated);

        setTimeout(() => {
          setIsScanning(false);
          navigateTo('results');
          showToast('Simulated archive report ready.', 'success');
        }, 1200);
      } else {
        setScanProgress(currentPct);

        // Update stage label
        const stage = SCAN_STAGES.find(
          (s) => currentPct >= s.minPercent && currentPct <= s.maxPercent
        );
        if (stage) {
          setScanStageLabel(stage.label);
        }

        // Add log entry every ~2.8 seconds
        if (now - lastLogTime >= 2800 && logCounter < SCAN_LOG_POOL.length) {
          const poolItem = SCAN_LOG_POOL[logCounter % SCAN_LOG_POOL.length];
          logCounter++;
          lastLogTime = now;
          setScanLogs((prev) => [
            ...prev,
            {
              id: `log-${Date.now()}-${logCounter}`,
              time: `${minStr}:${secStr}.${tenths}`,
              level: poolItem.level,
              message: poolItem.message,
            },
          ]);
        }
      }
    }, 250);

    scanIntervalRef.current = interval;
  }, [timelineRange, navigateTo, showToast]);

  const cancelScan = useCallback(() => {
    if (scanIntervalRef.current) {
      clearInterval(scanIntervalRef.current);
    }
    setIsScanning(false);
    setScanProgress(0);
    setScanLogs([]);
    showToast('Simulation scan canceled.', 'info');
    navigateTo('timeline');
  }, [navigateTo, showToast]);

  // Clean-up on unmount
  useEffect(() => {
    return () => {
      if (connectionTimerRef.current) clearInterval(connectionTimerRef.current);
      if (scanIntervalRef.current) clearInterval(scanIntervalRef.current);
    };
  }, []);

  const previewReportWithToken = useCallback((token: string) => {
    setActiveReportToken(token);
    const rep = getReportLocally(token);
    if (rep) {
      setReport(rep);
    }
    window.location.hash = `/demo-report/${token}`;
    setScreen('demo_report');
    setIsShareModalOpen(false);
  }, []);

  const openShareModal = useCallback(() => setIsShareModalOpen(true), []);
  const closeShareModal = useCallback(() => setIsShareModalOpen(false), []);
  const openRevealModal = useCallback(() => setIsRevealModalOpen(true), []);
  const closeRevealModal = useCallback(() => setIsRevealModalOpen(false), []);

  const openClipPlayer = useCallback((clip: FictionalClip) => setActiveClip(clip), []);
  const closeClipPlayer = useCallback(() => setActiveClip(null), []);

  return (
    <AppContext.Provider
      value={{
        screen,
        setScreen: navigateTo,
        goBack,
        startOver,

        countryCode,
        setCountryCode,
        phoneNumber,
        setPhoneNumber,
        phoneError,
        submitPhone,

        otp,
        setOtp,
        otpError,
        isOtpSuccess,
        verifyOtp,
        resendOtp,

        deviceState,
        toggleBluetooth,
        toggleWifi,
        startDeviceConnection,
        dismissSuccessModal,

        timelineRange,
        setTimelineRange,
        report,
        setReport,

        isScanning,
        scanProgress,
        scanStageLabel,
        scanElapsedTime,
        scanLogs,
        startScan,
        cancelScan,

        isShareModalOpen,
        openShareModal,
        closeShareModal,
        isRevealModalOpen,
        openRevealModal,
        closeRevealModal,
        activeClip,
        openClipPlayer,
        closeClipPlayer,

        activeReportToken,
        previewReportWithToken,

        toasts,
        showToast,
        removeToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
