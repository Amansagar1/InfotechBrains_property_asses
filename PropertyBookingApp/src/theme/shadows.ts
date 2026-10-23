import { Platform, ViewStyle } from 'react-native';

export const shadows = {
  none: {
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  } as ViewStyle,

  card: Platform.select({
    ios: {
      shadowColor: '#252823',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.06,
      shadowRadius: 12,
    },
    android: {
      elevation: 2,
    },
    default: {},
  }) as ViewStyle,

  cardHover: Platform.select({
    ios: {
      shadowColor: '#252823',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.1,
      shadowRadius: 18,
    },
    android: {
      elevation: 4,
    },
    default: {},
  }) as ViewStyle,

  button: Platform.select({
    ios: {
      shadowColor: '#264E36',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.25,
      shadowRadius: 8,
    },
    android: {
      elevation: 3,
    },
    default: {},
  }) as ViewStyle,

  modal: Platform.select({
    ios: {
      shadowColor: '#252823',
      shadowOffset: { width: 0, height: -4 },
      shadowOpacity: 0.08,
      shadowRadius: 16,
    },
    android: {
      elevation: 8,
    },
    default: {},
  }) as ViewStyle,
};

export type Shadows = typeof shadows;
