# Vibration-Assisted Quantum Capacitance Sensing App
**Status:** FINALIZED

## Objective
Build a prototype Android mobile application (Android 8.0+) that acts as the primary control and monitoring interface for a Vibration-Assisted Quantum Capacitance Sensing Device connected to an Arduino Uno through USB OTG.

## Tech Stack
- Framework: React Native (Expo)
- Target: Android 8.0+

## Features
1. **Interactive Frequency Controller:** Large central circular dial/knob controller, prominent preset buttons (5kHz, 10kHz, 25kHz, 40kHz), large real-time animated values (2 Hz - 80 kHz). Sends `SET_FREQ:<value>`.
2. **Clean Sensor Dashboard Cards:** Minimalist data cards for Quantum Capacitance, Resonant Frequency, Impedance containing large numbers, units, and small trend indicator (no graphs inside cards).
3. **Single Real-Time Graph:** Actual chart for Cap vs Time only. Smooth animated line, auto scrolling, pause button.
4. **Device Status Panel:** Connection indicator at top, simple and clean.
5. **Experiment Controls:** Compact modern icon toolbar at bottom with Start, Pause, Stop, Export.
6. **Modern UI Styling:** Tesla/Apple Health inspired minimalist dark lab theme. Deep black/dark gradient background, cyan/neon green accents, smooth transitions, rounded cards, soft drop shadows.
7. **Experiment Logging:** Timestamp, Freq, Cap, ResFreq, Imp. Export to CSV/Excel.
8. **(Optional) Auto Frequency Sweep:** 2kHz to 60kHz (100Hz steps).
9. **(Optional) Calibration Mode:** Insert sample, calibrate baseline.

## Hardware Interface
- Device: Arduino Uno
- Serial Over USB OTG
- In: `FREQ:25000\nCAP:12.5\nRES:24.3\nIMP:3.2`
- Out: `SET_FREQ:25000`

## UI Design
- Theme: Modern Tech Dark (Background), Cyan (Primary), Neon Green (Accent), White text. Use deep blacks, soft glows, rounded corners.
- Layout: Top (Status) -> Middle (Large Frequency Control) -> Bottom (Clean Sensor Metrics & Single Graph) -> Bottom Edge (Compact Toolbar).
