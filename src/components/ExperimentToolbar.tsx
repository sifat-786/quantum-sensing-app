import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors, typography, getGlowStyle } from '../theme/theme';
import { serialService } from '../services/SerialService';
import { exportSessionToCSV } from '../utils/ExportUtils';

export const ExperimentToolbar: React.FC = () => {
  const [isRunning, setIsRunning] = useState(false);

  const toggleExperiment = () => {
    const nextState = !isRunning;
    setIsRunning(nextState);
    serialService.sendCommand(nextState ? 'START' : 'PAUSE');
  };

  const stopExperiment = () => {
    setIsRunning(false);
    serialService.sendCommand('STOP');
  };

  const handleExport = async () => {
    const data = serialService.getSessionLog();
    if (data.length === 0) {
      alert("No data to export. Run an experiment first.");
      return;
    }
    await exportSessionToCSV(data);
  };

  return (
    <View style={styles.container}>
      
      <TouchableOpacity 
        style={[styles.button, isRunning ? styles.buttonActive : {}]} 
        onPress={toggleExperiment}
      >
        <MaterialCommunityIcons 
          name={isRunning ? 'pause' : 'play'} 
          size={28} 
          color={colors.primary} 
        />
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={stopExperiment}>
        <MaterialCommunityIcons name="stop" size={28} color={colors.statusDisconnected} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleExport}>
        <MaterialCommunityIcons name="download" size={28} color={colors.textSecondary} />
      </TouchableOpacity>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 32, // Floating above edge
    alignSelf: 'center', // Center horizontally
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(10, 10, 14, 0.95)', // Very dark pill
    borderRadius: 50, // Pill shaped
    borderWidth: 1,
    borderColor: colors.cardBorder,
    paddingVertical: 6,
    paddingHorizontal: 12,
    ...getGlowStyle('rgba(0, 255, 255, 0.1)'), // Subtle cyan glow
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    borderRadius: 25,
    marginHorizontal: 8,
  },
  buttonActive: {
    backgroundColor: 'rgba(0, 255, 255, 0.1)', // Subtle highlight when active
  },
});
