import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { colors, typography } from '../theme/theme';

interface SensorCardProps {
  title: string;
  value: number;
  unit: string;
  color?: string;
}

export const SensorCard: React.FC<SensorCardProps> = ({ 
  title, 
  value, 
  unit, 
  color = colors.primary 
}) => {
  const glowOpacity = useSharedValue(0);

  // Trigger glow animation when value changes
  useEffect(() => {
    glowOpacity.value = withSequence(
      withTiming(0.8, { duration: 150 }),
      withTiming(0, { duration: 500 })
    );
  }, [value]);

  const animatedGlowStyle = useAnimatedStyle(() => {
    return {
      borderColor: color,
      borderWidth: 1,
      backgroundColor: `rgba(${hexToRgb(color)}, ${glowOpacity.value * 0.05})`, // Very subtle
      shadowColor: color,
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: glowOpacity.value * 0.4,
      shadowRadius: 6,
      elevation: glowOpacity.value > 0 ? 6 : 0,
    };
  });

  return (
    <Animated.View style={[styles.card, animatedGlowStyle]}>
      <Text style={[typography.label, { fontSize: 10 }]}>{title}</Text>
      <View style={styles.dataRow}>
        <Text style={[typography.metric, { color, fontSize: 24 }]}>{value.toFixed(1)}</Text>
        <Text style={[typography.bodySmall, { color, marginLeft: 2 }]}>{unit}</Text>
      </View>
    </Animated.View>
  );
};

// Helper to convert hex to rgb for rgba strings
function hexToRgb(hex: string) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? 
    `${parseInt(result[1] || '0', 16)}, ${parseInt(result[2] || '0', 16)}, ${parseInt(result[3] || '0', 16)}` 
    : '0, 240, 255'; // Fallback to primary
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: colors.cardBackground,
    borderRadius: 16,
    padding: 12,
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    justifyContent: 'center',
  },
  dataRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginTop: 4,
  },
});
