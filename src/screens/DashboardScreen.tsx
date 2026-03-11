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
import type { TelemetryData } from '../services/SerialService';

export const DashboardScreen: React.FC = () => {
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>(serialService.getStatus());
  const [telemetry, setTelemetry] = useState<TelemetryData | null>(null);
  const [capHistory, setCapHistory] = useState<number[]>(new Array(20).fill(12.0));

  useEffect(() => {
    const handleStatusChange = (status: ConnectionStatus) => {
      setConnectionStatus(status);
    };

    const handleData = (data: TelemetryData) => {
      setTelemetry(data);
      setCapHistory(prev => {
        const next = [...prev, data.cap];
        if (next.length > 20) {
          next.shift();
        }
        return next;
      });
    };

    serialService.addListener(handleStatusChange);
    serialService.addDataListener(handleData);
    serialService.connect();

    return () => {
      serialService.removeListener(handleStatusChange);
      serialService.removeDataListener(handleData);
    };
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <StatusBanner status={connectionStatus} />
        
        <FrequencyControl />

        <View style={styles.sensorsRow}>
          <SensorCard title="Capacitance" value={telemetry ? parseFloat(telemetry.cap.toFixed(2)) : 0.0} unit="pF" color={colors.primary} />
          <SensorCard title="Res. Freq" value={telemetry ? parseFloat(telemetry.res.toFixed(1)) : 0.0} unit="kHz" color={colors.accent} />
          <SensorCard title="Impedance" value={telemetry ? parseFloat(telemetry.imp.toFixed(1)) : 0.0} unit="kΩ" color="#FFD700" />
        </View>

        <RealTimeChart 
          title="Capacitance vs Time" 
          data={capHistory} 
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
