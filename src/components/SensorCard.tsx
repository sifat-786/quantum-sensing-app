import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import Svg, { Path } from 'react-native-svg';
import { colors, typography, globalStyles, getGlowStyle } from '../theme/theme';

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
      backgroundColor: `rgba(${hexToRgb(color)}, ${glowOpacity.value * 0.15})`,
      shadowColor: color,
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: glowOpacity.value * 0.8,
      shadowRadius: 10,
      elevation: glowOpacity.value > 0 ? 10 : 0,
    };
  });

  return (
    <Animated.View style={[styles.card, animatedGlowStyle]}>
      <Text style={typography.label}>{title}</Text>
      <View style={styles.dataRow}>
        <Text style={[typography.metric, { color }]}>{value.toFixed(1)}</Text>
        <Text style={[typography.bodySmall, { color, marginLeft: 4, marginBottom: 4 }]}>{unit}</Text>
      </View>
      
      <View style={styles.sparklineContainer}>
        <Svg height="30" width="100%" viewBox="0 0 100 30" preserveAspectRatio="none">
          <Path
            d="M0 25 Q 10 20, 20 25 T 40 20 T 60 25 T 80 15 T 100 25"
            stroke={color}
            strokeWidth="2"
            fill="none"
            opacity="0.5"
          />
        </Svg>
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
    borderRadius: 12,
    padding: 12,
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    minHeight: 110,
    justifyContent: 'space-between',
  },
  dataRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginTop: 8,
  },
  sparklineContainer: {
    height: 30,
    width: '100%',
    marginTop: 8,
    overflow: 'hidden',
  }
});
