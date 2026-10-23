import React from 'react';
import { View, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { borderRadius, spacing } from '../../theme/spacing';

export type BadgeVariant = 'default' | 'primary' | 'accent' | 'success' | 'outline' | 'glass';

export interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
  style?: ViewStyle;
  textStyle?: TextStyle;
  icon?: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  label,
  variant = 'default',
  style,
  textStyle,
  icon,
}) => {
  const getBadgeStyle = () => {
    switch (variant) {
      case 'primary':
        return {
          container: styles.primaryContainer,
          text: styles.primaryText,
        };
      case 'accent':
        return {
          container: styles.accentContainer,
          text: styles.accentText,
        };
      case 'success':
        return {
          container: styles.successContainer,
          text: styles.successText,
        };
      case 'outline':
        return {
          container: styles.outlineContainer,
          text: styles.outlineText,
        };
      case 'glass':
        return {
          container: styles.glassContainer,
          text: styles.glassText,
        };
      default:
        return {
          container: styles.defaultContainer,
          text: styles.defaultText,
        };
    }
  };

  const badgeStyle = getBadgeStyle();

  return (
    <View style={[styles.base, badgeStyle.container, style]}>
      {icon && <View style={styles.icon}>{icon}</View>}
      <Text style={[styles.text, badgeStyle.text, textStyle]}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  base: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.round,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  text: {
    ...typography.badge,
  },
  icon: {
    marginRight: spacing.xxs,
  },

  defaultContainer: {
    backgroundColor: colors.surface,
  },
  defaultText: {
    color: colors.textPrimary,
  },

  primaryContainer: {
    backgroundColor: colors.primary,
  },
  primaryText: {
    color: colors.textLight,
  },

  accentContainer: {
    backgroundColor: colors.accent,
  },
  accentText: {
    color: colors.textPrimary,
  },

  successContainer: {
    backgroundColor: colors.success,
  },
  successText: {
    color: colors.successText,
  },

  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.border,
  },
  outlineContainer: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
  },
  outlineText: {
    color: colors.textPrimary,
  },

  glassContainer: {
    backgroundColor: colors.pillBackground,
  },
  glassText: {
    color: colors.textPrimary,
  },
});
