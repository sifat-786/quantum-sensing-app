import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FrequencyKnob } from './FrequencyKnob';
import { colors, typography } from '../theme/theme';

export const FrequencyControl: React.FC = () => {
  const [frequency, setFrequency] = useState<number>(25000);

  const MAX_FREQ = 80000;
  const MIN_FREQ = 2;

  const handleKnobChange = (val: number) => {
    setFrequency(val);
  };

  const setPreset = (val: number) => {
    setFrequency(val);
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
});
