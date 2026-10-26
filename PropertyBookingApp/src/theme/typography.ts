import { Platform, TextStyle } from 'react-native';

export const fontFamilies = {
  heading: Platform.select({
    ios: 'Fraunces-SemiBold',
    android: 'Fraunces-SemiBold',
    default: 'Fraunces-SemiBold',
  }),
  headingSemiBold: Platform.select({
    ios: 'Fraunces-SemiBold',
    android: 'Fraunces-SemiBold',
    default: 'Fraunces-SemiBold',
  }),
  headingBold: Platform.select({
    ios: 'Fraunces-Bold',
    android: 'Fraunces-Bold',
    default: 'Fraunces-Bold',
  }),
  body: Platform.select({
    ios: 'Outfit-Medium',
    android: 'Outfit-Medium',
    default: 'Outfit-Medium',
  }),
  bodyMedium: Platform.select({
    ios: 'Outfit-Medium',
    android: 'Outfit-Medium',
    default: 'Outfit-Medium',
  }),
  bodySemiBold: Platform.select({
    ios: 'Outfit-SemiBold',
    android: 'Outfit-SemiBold',
    default: 'Outfit-SemiBold',
  }),
  bodyBold: Platform.select({
    ios: 'Outfit-Bold',
    android: 'Outfit-Bold',
    default: 'Outfit-Bold',
  }),
};

export const typography = {
  h1: {
    fontFamily: fontFamilies.heading,
    fontSize: 28,
    lineHeight: 36,
    fontWeight: '600' as TextStyle['fontWeight'],
  },
  h2: {
    fontFamily: fontFamilies.heading,
    fontSize: 22,
    lineHeight: 28,
    fontWeight: '600' as TextStyle['fontWeight'],
  },
  h3: {
    fontFamily: fontFamilies.heading,
    fontSize: 18,
    lineHeight: 24,
    fontWeight: '600' as TextStyle['fontWeight'],
  },
  subtitle: {
    fontFamily: fontFamilies.bodyMedium,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '500' as TextStyle['fontWeight'],
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
    fontFamily: fontFamilies.bodyMedium,
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '500' as TextStyle['fontWeight'],
  },
  body: {
    fontFamily: fontFamilies.bodyMedium,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '500' as TextStyle['fontWeight'],
  },
  bodySmall: {
    fontFamily: fontFamilies.bodyMedium,
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '500' as TextStyle['fontWeight'],
  },
  priceLarge: {
    fontFamily: fontFamilies.heading,
    fontSize: 22,
    lineHeight: 26,
    fontWeight: '600' as TextStyle['fontWeight'],
  },
  priceCard: {
    fontFamily: fontFamilies.heading,
    fontSize: 18,
    lineHeight: 22,
    fontWeight: '600' as TextStyle['fontWeight'],
  },
  button: {
    fontFamily: fontFamilies.bodySemiBold,
    fontSize: 15,
    lineHeight: 20,
    fontWeight: '600' as TextStyle['fontWeight'],
  },
  badge: {
    fontFamily: fontFamilies.bodySemiBold,
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '600' as TextStyle['fontWeight'],
  },
};

export type Typography = typeof typography;
