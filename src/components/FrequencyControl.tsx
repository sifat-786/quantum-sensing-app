import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { FrequencyKnob } from './FrequencyKnob';
import { colors, typography, globalStyles, getGlowStyle } from '../theme/theme';

export const FrequencyControl: React.FC = () => {
  const [frequency, setFrequency] = useState<number>(25000);
  const [inputValue, setInputValue] = useState<string>('25000');

  const MAX_FREQ = 80000;
  const MIN_FREQ = 2;

  const handleKnobChange = (val: number) => {
    setFrequency(val);
    setInputValue(val.toString());
  };

  const handleInputChange = (text: string) => {
    setInputValue(text);
  };

  const handleInputSubmit = () => {
    let num = parseInt(inputValue, 10);
    if (isNaN(num)) num = MIN_FREQ;

    if (num > MAX_FREQ) {
      Alert.alert('Warning', 'Frequency exceeds transducer safe range (80 kHz)');
      num = MAX_FREQ;
      setInputValue(num.toString());
    } else if (num < MIN_FREQ) {
      num = MIN_FREQ;
      setInputValue(num.toString());
    }
    setFrequency(num);
  };

  const setPreset = (val: number) => {
    setFrequency(val);
    setInputValue(val.toString());
  };

  const handleSetFrequency = () => {
    // Dummy callback for now, later will send SET_FREQ
    Alert.alert('Command Sent', `SET_FREQ:${frequency}`);
  };

  const presets = [5000, 10000, 25000, 40000];

  return (
    <View style={globalStyles.card}>
      <Text style={[typography.h2, { marginBottom: 12 }]}>Frequency Control</Text>
      
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

      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={inputValue}
          onChangeText={handleInputChange}
          onEndEditing={handleInputSubmit}
          onSubmitEditing={handleInputSubmit}
        />
        <Text style={[typography.body, { marginLeft: 8 }]}>Hz</Text>
      </View>

      <TouchableOpacity style={[styles.button, getGlowStyle(colors.primaryGlow)]} onPress={handleSetFrequency}>
        <Text style={[typography.h2, { color: colors.background }]}>Set Frequency</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  presetRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  presetButton: {
    backgroundColor: colors.cardBorder,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.primaryGlow,
  },
  presetText: {
    ...typography.label,
    color: colors.primary,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  input: {
    ...typography.h1,
    borderBottomWidth: 1,
    borderBottomColor: colors.primary,
    flex: 1,
    paddingVertical: 4,
    color: colors.primary,
  },
  button: {
    backgroundColor: colors.primary,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
});
