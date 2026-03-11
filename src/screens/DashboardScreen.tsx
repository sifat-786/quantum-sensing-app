import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { StatusBanner } from '../components/StatusBanner';
import type { ConnectionStatus } from '../components/StatusBanner';
import { FrequencyControl } from '../components/FrequencyControl';
import { colors, typography, globalStyles } from '../theme/theme';

import { SensorCard } from '../components/SensorCard';
import { RealTimeChart } from '../components/RealTimeChart';
import { ExperimentToolbar } from '../components/ExperimentToolbar';
import { serialService } from '../services/SerialService';

export const DashboardScreen: React.FC = () => {
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>(serialService.getStatus());

  useEffect(() => {
    const handleStatusChange = (status: ConnectionStatus) => {
      setConnectionStatus(status);
    };

    serialService.addListener(handleStatusChange);
    serialService.connect();

    return () => {
      serialService.removeListener(handleStatusChange);
    };
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <StatusBanner status={connectionStatus} />
        
        <FrequencyControl />

        <View style={styles.sensorsRow}>
          <SensorCard title="Capacitance" value={12.5} unit="pF" color={colors.primary} />
          <SensorCard title="Res. Freq" value={25.4} unit="kHz" color={colors.accent} />
          <SensorCard title="Impedance" value={3.2} unit="kΩ" color="#FFD700" />
        </View>

        <RealTimeChart 
          title="Capacitance vs Time" 
          data={[12, 12.5, 12.3, 12.8, 13.0, 12.5]} 
          color={colors.primary}
        />
      </ScrollView>
      <ExperimentToolbar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: 16,
    paddingBottom: 100, // Extra padding so scroll content clears toolbar
  },
  sensorsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 4,
    marginHorizontal: 0,
  },
});
