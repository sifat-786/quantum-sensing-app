import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { StatusBanner } from '../components/StatusBanner';
import { FrequencyControl } from '../components/FrequencyControl';
import { colors, typography, globalStyles } from '../theme/theme';

import { SensorCard } from '../components/SensorCard';
import { RealTimeChart } from '../components/RealTimeChart';
import { ExperimentToolbar } from '../components/ExperimentToolbar';

export const DashboardScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <StatusBanner status="disconnected" />
        
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
        
        <RealTimeChart 
          title="Res Freq vs Response" 
          data={[24.0, 24.5, 25.4, 25.1, 24.8, 25.4]} 
          color={colors.accent}
          yAxisSuffix="k"
        />

        <RealTimeChart 
          title="Impedance vs Time" 
          data={[3.0, 3.1, 3.2, 3.1, 3.0, 3.2]} 
          color="#FFD700"
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
