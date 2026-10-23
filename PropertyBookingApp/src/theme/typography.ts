import { Platform, TextStyle } from 'react-native';

export const fontFamilies = {
  heading: Platform.select({
    ios: 'Georgia',
    android: 'serif',
    default: 'serif',
  }),
  body: Platform.select({
    ios: 'System',
    android: 'sans-serif',
    default: 'sans-serif',
  }),
  bodyMedium: Platform.select({
    ios: 'System',
    android: 'sans-serif-medium',
    default: 'sans-serif-medium',
  }),
  bodySemiBold: Platform.select({
    ios: 'System',
    android: 'sans-serif-medium',
    default: 'sans-serif-medium',
  }),
};

export const typography = {
  h1: {
    fontFamily: fontFamilies.heading,
    fontSize: 28,
    lineHeight: 36,
    fontWeight: '700' as TextStyle['fontWeight'],
  },
  h2: {
    fontFamily: fontFamilies.heading,
    fontSize: 22,
    lineHeight: 28,
    fontWeight: '700' as TextStyle['fontWeight'],
  },
  h3: {
    fontFamily: fontFamilies.heading,
    fontSize: 18,
    lineHeight: 24,
    fontWeight: '600' as TextStyle['fontWeight'],
  },
  subtitle: {
    fontFamily: fontFamilies.body,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '400' as TextStyle['fontWeight'],
  },
  labelUpper: {
    fontFamily: fontFamilies.bodySemiBold,
    fontSize: 11,
    lineHeight: 14,
    letterSpacing: 1.2,
    textTransform: 'uppercase' as TextStyle['textTransform'],
    fontWeight: '600' as TextStyle['fontWeight'],
  },
  bodyLarge: {
    fontFamily: fontFamilies.body,
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '400' as TextStyle['fontWeight'],
  },
  body: {
    fontFamily: fontFamilies.body,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '400' as TextStyle['fontWeight'],
  },
  bodySmall: {
    fontFamily: fontFamilies.body,
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '400' as TextStyle['fontWeight'],
  },
  priceLarge: {
    fontFamily: fontFamilies.heading,
    fontSize: 22,
    lineHeight: 26,
    fontWeight: '700' as TextStyle['fontWeight'],
  },
  priceCard: {
    fontFamily: fontFamilies.heading,
    fontSize: 18,
    lineHeight: 22,
    fontWeight: '700' as TextStyle['fontWeight'],
  },
  button: {
    fontFamily: fontFamilies.bodySemiBold,
    fontSize: 15,
    lineHeight: 20,
    fontWeight: '600' as TextStyle['fontWeight'],
  },
  badge: {
    fontFamily: fontFamilies.bodyMedium,
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '500' as TextStyle['fontWeight'],
  },
};

export type Typography = typeof typography;
