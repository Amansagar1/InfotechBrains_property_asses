import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
  View,
} from 'react-native';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { borderRadius, spacing } from '../../theme/spacing';
import { shadows } from '../../theme/shadows';
import { Icons } from './Icons';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';

export interface CustomButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  loading?: boolean;
  disabled?: boolean;
  showArrow?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  icon?: React.ReactNode;
}

export const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  loading = false,
  disabled = false,
  showArrow = false,
  style,
  textStyle,
  icon,
}) => {
  const isPrimary = variant === 'primary';
  const isSecondary = variant === 'secondary';
  const isOutline = variant === 'outline';
  const isGhost = variant === 'ghost';

  const containerStyles = [
    styles.base,
    isPrimary && styles.primary,
    isSecondary && styles.secondary,
    isOutline && styles.outline,
    isGhost && styles.ghost,
    (disabled || loading) && styles.disabled,
    isPrimary && !disabled && shadows.button,
    style,
  ];

  const labelStyles = [
    styles.textBase,
    isPrimary && styles.textPrimary,
    isSecondary && styles.textSecondary,
    isOutline && styles.textOutline,
    isGhost && styles.textGhost,
    disabled && styles.textDisabled,
    textStyle,
  ];

  const arrowColor = isPrimary ? colors.textLight : isOutline ? colors.primary : colors.textPrimary;

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      disabled={disabled || loading}
      style={containerStyles}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={isPrimary ? colors.textLight : colors.primary}
        />
      ) : (
        <View style={styles.contentRow}>
          {icon && <View style={styles.iconContainer}>{icon}</View>}
          <Text style={labelStyles}>{title}</Text>
          {showArrow && (
            <View style={styles.arrowContainer}>
              <Icons.ArrowRight size={16} color={arrowColor} />
            </View>
          )}
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    height: 54,
    borderRadius: borderRadius.round,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
    flexDirection: 'row',
  },
  primary: {
    backgroundColor: colors.primary,
  },
  secondary: {
    backgroundColor: colors.surface,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: colors.border,
  },
  ghost: {
    backgroundColor: 'transparent',
  },
  disabled: {
    opacity: 0.5,
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    marginRight: spacing.sm,
  },
  arrowContainer: {
    marginLeft: spacing.sm,
  },
  textBase: {
    ...typography.button,
  },
  textPrimary: {
    color: colors.textLight,
  },
  textSecondary: {
    color: colors.textPrimary,
  },
  textOutline: {
    color: colors.textPrimary,
  },
  textGhost: {
    color: colors.primary,
  },
  textDisabled: {
    color: colors.textTertiary,
  },
});
