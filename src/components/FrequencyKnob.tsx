import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, { useSharedValue, useAnimatedStyle, withSpring, runOnJS } from 'react-native-reanimated';
import { colors, typography, getGlowStyle } from '../theme/theme';

interface FrequencyKnobProps {
  value: number;
  min: number;
  max: number;
  onChange: (val: number) => void;
}

const KNOB_SIZE = 220;
const MAX_ANGLE = 270; // Sweep of the knob
const START_ANGLE = 135; // Bottom left to bottom right

export const FrequencyKnob: React.FC<FrequencyKnobProps> = ({ value, min, max, onChange }) => {
  const angle = useSharedValue(0);

  // Initialize angle from value
  React.useEffect(() => {
    const percentage = (value - min) / (max - min);
    angle.value = withSpring(percentage * MAX_ANGLE);
  }, [value]);

  const panGesture = Gesture.Pan()
    .onUpdate((event) => {
      const centerX = KNOB_SIZE / 2;
      const centerY = KNOB_SIZE / 2;
      
      const x = event.x - centerX;
      const y = event.y - centerY;
      
      let rad = Math.atan2(y, x);
      let deg = rad * (180 / Math.PI);
      
      // Normalize angle to 0-360
      if (deg < 0) deg += 360;

      // Map to knob coordinates (START_ANGLE is 0)
      let knobAngle = deg - START_ANGLE;
      if (knobAngle < 0) knobAngle += 360;

      // Clamp to max sweep
      if (knobAngle <= MAX_ANGLE) {
        angle.value = knobAngle;
        
        const percentage = knobAngle / MAX_ANGLE;
        const newValue = Math.round(min + percentage * (max - min));
        runOnJS(onChange)(newValue);
      }
    });

  const indicatorStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { rotate: `${START_ANGLE + angle.value}deg` },
      ],
    };
  });

  return (
    <GestureHandlerRootView>
      <View style={styles.container}>
        <GestureDetector gesture={panGesture}>
          <Animated.View style={[styles.knobOuter, getGlowStyle(colors.primaryGlow)]}>
            <View style={styles.knobInner}>
              <Animated.View style={[styles.indicatorContainer, indicatorStyle]}>
                <View style={[styles.indicator, getGlowStyle(colors.primary)]} />
              </Animated.View>
              <View style={styles.centerValue}>
                <Text style={typography.metric}>{value}</Text>
                <Text style={typography.label}>Hz</Text>
              </View>
            </View>
          </Animated.View>
        </GestureDetector>
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 20,
  },
  knobOuter: {
    width: KNOB_SIZE,
    height: KNOB_SIZE,
    borderRadius: KNOB_SIZE / 2,
    backgroundColor: colors.cardBorder,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.primaryGlow,
  },
  knobInner: {
    width: KNOB_SIZE - 40,
    height: KNOB_SIZE - 40,
    borderRadius: (KNOB_SIZE - 40) / 2,
    backgroundColor: colors.cardBackground,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#333',
  },
  centerValue: {
    alignItems: 'center',
  },
  indicatorContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  indicator: {
    width: 20,
    height: 4,
    backgroundColor: colors.primary,
    borderRadius: 2,
    marginRight: 10,
  },
});
