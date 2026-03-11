import { StyleSheet } from 'react-native';

export const colors = {
  background: '#121212', // Dark background
  primary: '#00F0FF',    // Electric Blue
  accent: '#39FF14',     // Neon Green
  text: '#FFFFFF',       // White text
  textSecondary: '#A0A0A0', // Light grey for secondary text
  cardBackground: '#1E1E1E', // Slightly lighter dark for panels
  danger: '#FF3333',     // Red for errors
};

export const typography = StyleSheet.create({
  h1: {
    fontFamily: 'Inter_700Bold',
    fontSize: 24,
    color: colors.text,
  },
  h2: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 20,
    color: colors.text,
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
  },
});

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  card: {
    backgroundColor: colors.cardBackground,
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
