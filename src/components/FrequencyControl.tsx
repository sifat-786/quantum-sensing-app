import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FrequencyKnob } from './FrequencyKnob';
import { colors, typography, getGlowStyle } from '../theme/theme';
import { serialService } from '../services/SerialService';
import type { TelemetryData } from '../services/SerialService';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export const FrequencyControl: React.FC = () => {
  const [frequency, setFrequency] = useState<number>(25000);
  const [isSweeping, setIsSweeping] = useState<boolean>(false);

  useEffect(() => {
    const handleData = (data: TelemetryData) => {
      // If we are sweeping via service, update local dial to follow the simulation
      if (isSweeping) {
        setFrequency(data.freq);
      }
    };
    serialService.addDataListener(handleData);
    return () => serialService.removeDataListener(handleData);
  }, [isSweeping]);

  const MAX_FREQ = 80000;
  const MIN_FREQ = 2;

  const handleKnobChange = (val: number) => {
    if (isSweeping) return; // Prevent manual override during sweep
    setFrequency(val);
    serialService.sendCommand(`SET_FREQ:${val}`);
  };

  const setPreset = (val: number) => {
    if (isSweeping) return;
    setFrequency(val);
    serialService.sendCommand(`SET_FREQ:${val}`);
  };

  const toggleSweep = () => {
    const nextState = !isSweeping;
    setIsSweeping(nextState);
    serialService.sendCommand(nextState ? 'SWEEP_START' : 'SWEEP_STOP');
  };

  const presets = [5000, 10000, 25000, 40000];

  return (
    <View style={styles.container}>
      <FrequencyKnob 
        value={frequency} 
        min={MIN_FREQ} 
        max={MAX_FREQ} 
        onChange={handleKnobChange} 
      />

      <View style={styles.presetRow}>
        {presets.map(p => (
          <TouchableOpacity key={p} style={styles.presetButton} onPress={() => setPreset(p)}>
            <Text style={styles.presetText}>{p / 1000}k</Text>
          </TouchableOpacity>
        ))}

        <TouchableOpacity 
          style={[styles.sweepButton, isSweeping && styles.sweepActive]} 
          onPress={toggleSweep}
        >
          <MaterialCommunityIcons name="wave" size={16} color={isSweeping ? colors.primary : colors.textSecondary} />
          <Text style={[styles.sweepText, isSweeping && {color: colors.primary}]}>Auto Sweep</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 16,
  },
  presetRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  presetButton: {
    backgroundColor: 'transparent',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    marginHorizontal: 6,
    marginBottom: 8,
  },
  presetText: {
    ...typography.label,
    color: colors.textSecondary,
  },
  sweepButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 255, 255, 0.05)',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(0, 255, 255, 0.2)',
    marginHorizontal: 6,
    marginBottom: 8,
  },
  sweepActive: {
    backgroundColor: 'rgba(0, 255, 255, 0.1)',
    borderColor: colors.primary,
    ...getGlowStyle('rgba(0, 255, 255, 0.3)'),
  },
  sweepText: {
    ...typography.label,
    color: colors.textSecondary,
    marginLeft: 6,
  }
});
