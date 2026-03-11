# Vibration-Assisted Quantum Capacitance Sensing App
**Status:** FINALIZED

## Objective
Build a prototype Android mobile application (Android 8.0+) that acts as the primary control and monitoring interface for a Vibration-Assisted Quantum Capacitance Sensing Device connected to an Arduino Uno through USB OTG.

## Tech Stack
- Framework: React Native (Expo)
- Target: Android 8.0+

## Features
1. **Frequency Control Panel:** Slider, numeric input, "Set Frequency" (2 Hz - 80 kHz). Sends `SET_FREQ:<value>`. Warns if > 80 kHz.
2. **Real-Time Sensor Dashboard:** Displays Quantum Capacitance (1-100 pF), Resonant Frequency, Impedance.
3. **Real-Time Graph Visualization:** Auto-scrolling graphs for Cap vs Time, Freq vs Response, Imp vs Time. (using victory-native or react-native-chart-kit).
4. **Device Connection Manager:** Detect USB OTG, auto-reconnect, display status.
5. **Experiment Logging:** Timestamp, Freq, Cap, ResFreq, Imp. Export to CSV/Excel.
6. **(Optional) Auto Frequency Sweep:** 2kHz to 60kHz (100Hz steps).
7. **(Optional) Calibration Mode:** Insert sample, calibrate baseline.

## Hardware Interface
- Device: Arduino Uno
- Serial Over USB OTG
- In: `FREQ:25000\nCAP:12.5\nRES:24.3\nIMP:3.2`
- Out: `SET_FREQ:25000`

## UI Design
- Theme: Dark (Background), Electric Blue (Primary), Neon Green (Accent), White text.
- Layout: Top (Status) -> Center (Control) -> Middle (Live Data) -> Bottom (Graphs).
