export const colors = {
  background: '#FAF9F6',
  card: '#FFFFFF',
  surface: '#F4F2EC',
  surfaceLight: '#FBFBF9',
  surfaceMuted: '#EFECE6',

  primary: '#264E36',
  primaryDark: '#1B3827',
  primaryLight: '#3A6A4E',

  secondary: '#A3B18A',
  secondaryLight: '#C3D0AF',
  accent: '#E9DFC8',
  accentMuted: '#F3EDE0',

  textPrimary: '#252823',
  textSecondary: '#4A4E48',
  textTertiary: '#777B75',
  textLight: '#FFFFFF',

  border: '#E7E7E2',
  borderSubtle: '#F0EFEA',

  success: '#E4F0E5',
  successText: '#1E6835',
  error: '#FCE8E6',
  errorText: '#C53030',
  warning: '#FFF4E5',
  warningText: '#B7791F',
  info: '#E8F1F5',
  infoText: '#2B6CB0',

  overlay: 'rgba(0, 0, 0, 0.4)',
  overlayLight: 'rgba(255, 255, 255, 0.85)',
  pillBackground: 'rgba(255, 255, 255, 0.92)',
} as const;

export type Colors = typeof colors;
