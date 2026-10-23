import { colors } from './colors';
import { typography, fontFamilies } from './typography';
import { spacing, borderRadius } from './spacing';
import { shadows } from './shadows';

export const theme = {
  colors,
  typography,
  fontFamilies,
  spacing,
  borderRadius,
  shadows,
} as const;

export type Theme = typeof theme;

export * from './colors';
export * from './typography';
export * from './spacing';
export * from './shadows';
