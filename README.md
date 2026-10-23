# VAULT TRACE — Digital Archive Intelligence

> **Cyber-Forensics Video Archive Simulator (Harmless Interactive Prank Prototype)**

VAULT TRACE is a fictional digital forensics web application simulating video archive decomposition, chronological metadata indexing, and telemetry analysis. It is designed as an educational, interactive prank prototype featuring high-fidelity cyber aesthetics, cinematic scan animations, realistic diagnostic logs, and a final playful reveal.

---

## 🔒 Safety & Simulation Disclosure

- **Zero Real Access:** The application runs **100% in-browser**. It never accesses real private files, device sensors, camera, microphone, contacts, or wireless hardware.
- **No Credentials Collected:** Mobile numbers entered in the interface are never transmitted, validated against real telecom carriers, or stored on any server.
- **Simulated Radios:** Bluetooth and Wi-Fi toggles are fictional UI controls that do not interact with actual device hardware.
- **Deterministic Mock Data:** All video clip titles, timestamps, durations, and activity histograms are generated using local deterministic pseudo-random models.
- **Fixed Target & OTP:** Target access is restricted to authorized ID **`9063411276`** with fixed verification code **`796600`**.

---

## 🚀 Quick Start

### Prerequisites
- Node.js (v18+ or v22+)
- npm (v9+)

### Installation
```bash
npm install
```

### Development Server
```bash
npm run dev
```
Starts the Vite local development server (typically at `http://localhost:5173`).

### Production Build & Type Checking
```bash
npm run build
```
Executes TypeScript compilation (`tsc -b`) and Vite production bundling into `dist/`.

### Linting
```bash
npm run lint
```
Runs ESLint with React and TypeScript rules.

### Production Preview
```bash
npm run preview
```
Previews the built production bundle locally.

---

## 🔑 Required Credentials

| Parameter | Value | Note |
|---|---|---|
| **Target Mobile ID** | **`9063411276`** | Click **Autofill Target ID** to populate |
| **Verification OTP** | **`796600`** | Fixed authorization token (hidden from UI) |
| **Bluetooth / Wi-Fi** | Toggle both **ON** | Fictional UI toggles required for demo handshake |

---

## 🖥️ Screen-by-Screen Journey

1. **Screen 1 — Welcome & Login:**
   - Brand mark, system diagnostic grid (`Engine Sandbox: LOCAL MEMORY`, `Hardware Access: AIR-GAPPED`).
   - Country code selector (defaults to `+91` India) and mobile number input with validation.
   - Quick demo autofill button and persistent simulation disclosure.
2. **Screen 2 — Demo OTP Verification:**
   - Segmented 6-digit input with auto-advance, backspace navigation, and clipboard paste support.
   - Validates locally against fixed demo code `482916`. Friendly inline error on invalid input.
   - Resend code action and autofill demo button.
3. **Screen 3 — Device Setup:**
   - Simulated Bluetooth and Wi-Fi toggle cards with channel state indicators.
   - Animated 4-stage connection progression (`Initializing demo session`, `Preparing virtual device profile`, `Establishing simulated channel`, `Verifying demo handshake`).
4. **Screen 4 — Connection Success Modal:**
   - Polished success modal with pulsing rings and green checkmark.
   - Clearly labels device as `Virtual Device · Demo Session` with local session ID `VT-SIM-78942`.
5. **Screen 5 — Timeline Selection:**
   - Selectable cards for **Last 3 Months**, **Last 6 Months** (default / recommended), and **Last 12 Months**.
   - Dynamically calculates chronological month labels from the current date with boundary handling.
6. **Screen 6 — Cinematic Scan:**
   - Full-page scanning dashboard with animated SVG circular progress (0–100%).
   - Animated radar sweep beam, elapsed runtime counter (`00:04.2`), and current stage label.
   - Scrolling terminal log showing harmless fictional diagnostic messages.
   - Cancel simulation button with clean timer destruction.
7. **Screen 7 — Video Archive Results:**
   - Top summary strip (Total clips, total duration, timeline range, sandbox status).
   - Month cards sorted newest to oldest with activity histogram mini-bars and clip counters.
   - Interactive search and filter for months and clip tags.
   - Sort selector (Newest, Oldest, Most Clips, Longest Duration).
8. **Screen 8 — Monthly Detail & Simulated Player:**
   - Expandable accordion displaying fictional clip metadata (resolution, codec, file size, timestamps).
   - Video player modal featuring a real-time HTML5 Canvas cyber waveform visualizer, audio level bars, scrub bar, and `SIMULATED ARCHIVE RECORDING` watermark.
9. **Screen 9 — Share Report Modal:**
   - Generates a local cryptographic token and origin-relative URL (`#/demo-report/<token>`).
   - One-click copy with clipboard fallback and confirmation toast.
   - Regenerate token and preview report actions.
10. **Screen 10 — Demo Report Page (`#/demo-report/:token`):**
    - Standalone view displaying the verified simulated archive report.
    - Handles invalid tokens gracefully with a return gateway button.
11. **Screen 11 — Playful Reveal:**
    - Accessible at any time via the **Reveal Prank** header button or results banner.
    - Cheerful animation explaining the harmless nature of the prank.
    - Start Over button that cancels outstanding timers and resets the session cleanly.

---

## 🎨 Visual Design & Aesthetics

- **Color Palette:**
  - Base Background: Near-black (`#080B10`)
  - Layered Charcoal Panels: (`#101720`, `#0D121A`)
  - Accent Neon Green: (`#72F5A1`)
  - Accent Muted Cyan/Blue: (`#38BDF8`)
  - Borders: (`#1B2636`)
- **Cyber Elements:**
  - Fine 32px cyber grid background with radial ambient glows.
  - CRT scanline effect with `prefers-reduced-motion` support.
  - Monospaced tabular numerals (`font-mono-num`) and technical tags.
  - Responsive layout optimized for mobile, tablet, and desktop viewports.

---

## ⚙️ Technical Stack

- **Framework:** React 19 + TypeScript
- **Bundler:** Vite 8
- **Styling:** Tailwind CSS v4 (`@tailwindcss/vite`) + Custom Cyber Tokens
- **Icons:** Lucide React (`lucide-react`)
- **State Management:** Custom React Context with State Machine Navigation

---

## ⚠️ Limitations & Scope

- **Simulation Only:** This prototype contains no real surveillance, forensics, or data recovery capabilities.
- **Air-Gapped Client Memory:** Data is deterministic and stored in-browser (`localStorage` / local state). Cross-device persistence is intentionally omitted to protect user privacy.
- **Browser Compatibility:** Works across all modern evergreen browsers (Chrome, Edge, Firefox, Safari).
