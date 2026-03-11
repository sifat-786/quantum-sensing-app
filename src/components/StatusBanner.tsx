import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withSequence,
  Easing,
} from 'react-native-reanimated';
import { colors, typography, globalStyles, getGlowStyle } from '../theme/theme';

export type ConnectionStatus = 'disconnected' | 'connecting' | 'connected';

interface StatusBannerProps {
  status: ConnectionStatus;
}

export const StatusBanner: React.FC<StatusBannerProps> = ({ status }) => {
  const statusColor = 
    status === 'connected' ? colors.statusConnected :
    status === 'connecting' ? colors.statusConnecting :
    colors.statusDisconnected;

  const statusText = 
    status === 'connected' ? 'Device Connected' :
    status === 'connecting' ? 'Connecting...' :
    'Device Disconnected';

  // Animation values
  const opacity = useSharedValue(1);
  const rotation = useSharedValue(0);

  useEffect(() => {
    if (status === 'disconnected') {
      // Pulse animation
      rotation.value = 0;
      opacity.value = withRepeat(
        withSequence(
          withTiming(0.4, { duration: 800 }),
          withTiming(1, { duration: 800 })
        ),
        -1, // Infinite
        true // Reverse
      );
    } else if (status === 'connecting') {
      // Spinner animation
      opacity.value = 1;
      rotation.value = withRepeat(
        withTiming(360, { duration: 1500, easing: Easing.linear }),
        -1,
        false
      );
    } else {
      // Stable connected state
      opacity.value = 1;
      rotation.value = 0;
    }
  }, [status]);

  const animatedIndicatorStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{ rotateZ: `${rotation.value}deg` }],
      backgroundColor: statusColor,
    };
  });

  return (
    <View style={styles.banner}>
      <View style={styles.leftContent}>
        <MaterialCommunityIcons 
          name={status === 'connected' ? 'usb' : 'usb'} 
          size={24} 
          color={statusColor} 
          style={getGlowStyle(statusColor)}
        />
        <Animated.View style={[styles.indicator, animatedIndicatorStyle, getGlowStyle(statusColor)]}>
          {status === 'connecting' && (
             <MaterialCommunityIcons name="loading" size={14} color={colors.background} />
          )}
        </Animated.View>
        <Text style={[typography.h2, { color: statusColor, marginLeft: 12 }]}>
          {statusText}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', // Center it at the top
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: 'transparent',
    borderWidth: 0,
    elevation: 0,
  },
  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  indicator: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginLeft: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
