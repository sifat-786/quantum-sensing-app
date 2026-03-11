import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Slider from '@react-native-community/slider';
import { colors, typography, globalStyles } from '../theme/theme';

export const FrequencyControl: React.FC = () => {
  const [frequency, setFrequency] = useState<number>(25000);
  const [inputValue, setInputValue] = useState<string>('25000');

  const MAX_FREQ = 80000;
  const MIN_FREQ = 2;

  const handleSliderChange = (val: number) => {
    setFrequency(Math.round(val));
    setInputValue(Math.round(val).toString());
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

  const handleSetFrequency = () => {
    // Dummy callback for now, later will send SET_FREQ
    Alert.alert('Command Sent', `SET_FREQ:${frequency}`);
  };

  return (
    <View style={globalStyles.card}>
      <Text style={typography.h2}>Frequency Control</Text>

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

      <Slider
        style={styles.slider}
        minimumValue={MIN_FREQ}
        maximumValue={MAX_FREQ}
        value={frequency}
        onValueChange={handleSliderChange}
        minimumTrackTintColor={colors.primary}
        maximumTrackTintColor={colors.textSecondary}
        thumbTintColor={colors.primary}
      />

      <TouchableOpacity style={styles.button} onPress={handleSetFrequency}>
        <Text style={[typography.h2, { color: colors.background }]}>Set Frequency</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
  },
  input: {
    ...typography.h1,
    borderBottomWidth: 1,
    borderBottomColor: colors.primary,
    flex: 1,
    paddingVertical: 4,
    color: colors.primary,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  button: {
    backgroundColor: colors.primary,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
});
