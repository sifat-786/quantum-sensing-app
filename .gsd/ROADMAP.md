# Project Roadmap

## Phase 1: Project Setup & UI Foundation
**Status**: ✅ Complete
- Create React Native (Expo) application structure.
- Implement the dark space theme (Electric Blue, Neon Green).
- Build the main Dashboard layout, Frequency Control Panel, and dummy visualizers.

## Phase 2: Scientific Instrument UI Upgrade
**Status**: ✅ Complete
- Upgrade theming to scientific lab style (glows, smooth transitions, rounded cards).
- Implement interactive frequency controller dial and presets.
- Build animated live sensor dashboard cards with sparklines.
- Build real-time graphs with neon grid lines.
- Create an animated device status panel and experiment controls toolbar.

## Phase 3: Modern Minimalist UI Refinement
**Status**: ✅ Complete
- Restructure layout to Top (Status), Middle (Frequency), Bottom (Sensor Metrics/Graph).
- Enlarge frequency dial and presets for prominence.
- Simplify sensor cards (remove sparklines, keep clean metrics).
- Consolidate to a single Capacitance vs Time graph with auto-scroll and pause.
- Refine modern styling (Tesla/Apple Health inspired) with deep dark background and cyan/neon green accents.
- Implement compact, modern icon-based bottom control bar.

## Phase 4: Serial Communication & USB OTG Integration
**Status**: ✅ Complete
- Implement USB OTG serial connection manager.
- Handle connection status UI.
- Send and receive raw serial strings.

## Phase 5: Real-Time Data Parsing & Visualization
**Status**: ✅ Complete
- Parse incoming Arduino data (FREQ, CAP, RES, IMP).
- Link parsed data to the dashboard data cards and graphs.

## Phase 6: Data Logging & Advanced Features
- Implement CSV export logging.
- Add Auto Frequency Sweep and Calibration modes.
