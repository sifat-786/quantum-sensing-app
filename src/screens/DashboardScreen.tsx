import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { StatusBanner } from '../components/StatusBanner';
import { FrequencyControl } from '../components/FrequencyControl';
import { colors, typography, globalStyles } from '../theme/theme';

export const DashboardScreen: React.FC = () => {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <StatusBanner isConnected={false} />
      
      <FrequencyControl />

      <View style={[globalStyles.card, styles.placeholderCard]}>
        <Text style={typography.h2}>Live Sensor Data</Text>
        <Text style={[typography.bodySmall, { marginTop: 8 }]}>
          Quantum Capacitance, Resonant Frequency, and Impedance will appear here.
        </Text>
      </View>

      <View style={[globalStyles.card, styles.placeholderCard]}>
        <Text style={typography.h2}>Real-Time Graphs</Text>
        <Text style={[typography.bodySmall, { marginTop: 8 }]}>
          Cap vs Time, Freq vs Response, and Imp vs Time graphs will appear here.
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  placeholderCard: {
    minHeight: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
