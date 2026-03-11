import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { StatusBanner } from '../components/StatusBanner';
import { FrequencyControl } from '../components/FrequencyControl';
import { colors, typography, globalStyles } from '../theme/theme';

import { SensorCard } from './SensorCard';

export const DashboardScreen: React.FC = () => {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <StatusBanner status="disconnected" />
      
      <FrequencyControl />

      <View style={styles.sensorsRow}>
        <SensorCard title="Capacitance" value={12.5} unit="pF" color={colors.primary} />
        <SensorCard title="Res. Freq" value={25.4} unit="kHz" color={colors.accent} />
        <SensorCard title="Impedance" value={3.2} unit="kΩ" color="#FFD700" />
      </View>

      <View style={globalStyles.card}>
        <Text style={typography.h2}>Real-Time Graphs</Text>
        <Text style={[typography.body, { marginTop: 8 }]}>Charts will be implemented here (Phase 3)</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: 16,
  },
  sensorsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 12,
    marginHorizontal: -4, // Counteract card horizontal margins
  },
});
