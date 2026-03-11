import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors, typography, getGlowStyle } from '../theme/theme';

export const ExperimentToolbar: React.FC = () => {
  const [isRunning, setIsRunning] = useState(false);

  const toggleExperiment = () => setIsRunning(!isRunning);

  return (
    <View style={[styles.container, getGlowStyle('rgba(0,0,0,0.8)')]}>
      
      <TouchableOpacity 
        style={[styles.button, isRunning ? styles.buttonActive : {}]} 
        onPress={toggleExperiment}
      >
        <MaterialCommunityIcons 
          name={isRunning ? 'pause' : 'play'} 
          size={24} 
          color={isRunning ? colors.statusConnecting : colors.statusConnected} 
        />
        <Text style={[
          styles.buttonText, 
          { color: isRunning ? colors.statusConnecting : colors.statusConnected }
        ]}>
          {isRunning ? 'Pause' : 'Start'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button}>
        <MaterialCommunityIcons name="stop" size={24} color={colors.statusDisconnected} />
        <Text style={[styles.buttonText, { color: colors.statusDisconnected }]}>Stop</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button}>
        <MaterialCommunityIcons name="download" size={24} color={colors.primary} />
        <Text style={[styles.buttonText, { color: colors.primary }]}>Export</Text>
      </TouchableOpacity>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'rgba(22, 24, 36, 0.95)', // Glassy dark card Background
    borderTopWidth: 1,
    borderTopColor: colors.cardBorder,
    paddingVertical: 12,
    paddingBottom: 24, // Safe area padding for standard devices
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  buttonActive: {
    backgroundColor: 'rgba(255, 215, 0, 0.1)', // Subtle highlight when paused/active
  },
  buttonText: {
    ...typography.label,
    marginTop: 4,
  }
});
