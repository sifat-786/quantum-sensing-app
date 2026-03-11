import { StyleSheet } from 'react-native';

export const colors = {
  background: '#000000', // Deep black
  primary: '#00FFFF',    // Cyan
  primaryGlow: 'rgba(0, 255, 255, 0.4)',
  accent: '#39FF14',     // Neon Green
  accentGlow: 'rgba(57, 255, 20, 0.4)',
  text: '#FFFFFF',       // White text
  textSecondary: '#A0AABB', // Cool grey for secondary text
  cardBackground: '#0A0A0A', // Very dark grey for panels
  cardBorder: '#1A1A1A',
  
  // Connection States
  statusDisconnected: '#FF3333', // Sharp Red
  statusConnecting: '#FFD700',   // Yellow
  statusConnected: '#00FFFF',    // Cyan for connected
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
  shadowOpacity: 0.3, // Softer glow
  shadowRadius: 6,    // Softer radius
  elevation: 6,
});

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  card: {
    backgroundColor: colors.cardBackground,
    borderRadius: 24, // Softer premium look
    padding: 16,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    ...getGlowStyle('rgba(0,0,0,0.3)'), // Subtle base shadow
  },
});
