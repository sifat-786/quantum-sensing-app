import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, typography, globalStyles } from '../theme/theme';

interface StatusBannerProps {
  isConnected: boolean;
}

export const StatusBanner: React.FC<StatusBannerProps> = ({ isConnected }) => {
  return (
    <View
      style={[
        globalStyles.card,
        styles.banner,
        { backgroundColor: isConnected ? colors.cardBackground : colors.danger },
      ]}
    >
      <View style={[styles.indicator, { backgroundColor: isConnected ? colors.accent : colors.background }]} />
      <Text style={typography.h2}>
        {isConnected ? 'Device Connected' : 'Device Disconnected'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  indicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 12,
  },
});
