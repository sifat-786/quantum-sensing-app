# Project Roadmap

## Phase 1: Project Setup & UI Foundation
- Create React Native (Expo) application structure.
- Implement the dark space theme (Electric Blue, Neon Green).
- Build the main Dashboard layout, Frequency Control Panel, and dummy visualizers.

## Phase 2: Serial Communication & USB OTG Integration
- Implement USB OTG serial connection manager.
- Handle connection status UI.
- Send and receive raw serial strings.

## Phase 3: Real-Time Data Parsing & Visualization
- Parse incoming Arduino data (FREQ, CAP, RES, IMP).
- Integrate `react-native-chart-kit` for Cap, Freq, Imp real-time graphs.

## Phase 4: Data Logging & Advanced Features
- Implement CSV export logging.
- Add Auto Frequency Sweep and Calibration modes.
