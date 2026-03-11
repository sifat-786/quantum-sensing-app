# Vibration-Assisted Quantum Capacitance Sensing App
**Status:** FINALIZED

## Objective
Build a prototype Android mobile application (Android 8.0+) that acts as the primary control and monitoring interface for a Vibration-Assisted Quantum Capacitance Sensing Device connected to an Arduino Uno through USB OTG.

## Tech Stack
- Framework: React Native (Expo)
- Target: Android 8.0+

## Features
1. **Interactive Frequency Controller:** Circular dial/knob controller, preset buttons (5kHz, 10kHz, 25kHz, 40kHz), real-time animated values (2 Hz - 80 kHz). Sends `SET_FREQ:<value>`.
2. **Live Sensor Dashboard Cards:** Animated data cards for Quantum Capacitance, Resonant Frequency, Impedance, with mini sparkline graphs and color glow on updates.
3. **Real-Time Graph Area:** Actual charts (using victory-native or react-native-chart-kit) for Cap vs Time, ResFreq vs Response, Imp vs Time. Auto scrolling, pause/resume, hover data points, neon grid lines.
4. **Device Status Panel:** Connection indicator (Disconnected -> red pulse, Connecting -> yellow spinner, Connected -> green indicator), USB icon and connection animation.
5. **Experiment Controls:** Bottom toolbar with Start Experiment, Pause, Stop, Export Data.
6. **Scientific Instrument Styling:** Dark lab theme, electric blue highlights, neon green data, soft glow graphs, rounded cards, smooth transitions.
7. **Experiment Logging:** Timestamp, Freq, Cap, ResFreq, Imp. Export to CSV/Excel.
8. **(Optional) Auto Frequency Sweep:** 2kHz to 60kHz (100Hz steps).
9. **(Optional) Calibration Mode:** Insert sample, calibrate baseline.

## Hardware Interface
- Device: Arduino Uno
- Serial Over USB OTG
- In: `FREQ:25000\nCAP:12.5\nRES:24.3\nIMP:3.2`
- Out: `SET_FREQ:25000`

## UI Design
- Theme: Scientific Dark Lab (Background), Electric Blue (Primary), Neon Green (Accent), White text. Use gradients, soft glows.
- Layout: Top (Status) -> Center (Control) -> Middle (Live Data & Graphs) -> Bottom (Experiment Toolbar).
