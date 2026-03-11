import { StyleSheet } from 'react-native';

export const colors = {
  background: '#0D0E15', // Scientific Dark Lab
  primary: '#00F0FF',    // Electric Blue
  primaryGlow: 'rgba(0, 240, 255, 0.4)',
  accent: '#39FF14',     // Neon Green
  accentGlow: 'rgba(57, 255, 20, 0.4)',
  text: '#FFFFFF',       // White text
  textSecondary: '#A0AABB', // Cool grey for secondary text
  cardBackground: '#161824', // Deep blue-grey for panels
  cardBorder: '#2A2D43',
  
  // Connection States
  statusDisconnected: '#FF2A2A', // Neon Red
  statusConnecting: '#FFD700',   // Neon Yellow
  statusConnected: '#39FF14',    // Neon Green
};

export const typography = StyleSheet.create({
  h1: {
    fontFamily: 'Inter_700Bold',
    fontSize: 24,
    color: colors.text,
    letterSpacing: 0.5,
  },
  h2: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 20,
    color: colors.text,
    letterSpacing: 0.5,
  },
  body: {
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
    color: colors.text,
  },
  bodySmall: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    color: colors.textSecondary,
  },
  label: {
    fontFamily: 'Inter_500Medium',
    fontSize: 12,
    color: colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  metric: {
    fontFamily: 'Inter_700Bold',
    fontSize: 32,
    color: colors.primary,
  }
});

export const getGlowStyle = (color: string) => ({
  shadowColor: color,
  shadowOffset: { width: 0, height: 0 },
  shadowOpacity: 0.8,
  shadowRadius: 10,
  elevation: 10,
});

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  card: {
    backgroundColor: colors.cardBackground,
    borderRadius: 16,
    padding: 16,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    ...getGlowStyle('rgba(0,0,0,0.5)'), // Subtle base shadow
  },
});
