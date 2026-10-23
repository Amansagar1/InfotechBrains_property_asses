import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { borderRadius, spacing } from '../../theme/spacing';
import { CustomButton } from './CustomButton';
import { Icons } from './Icons';

export interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  style?: ViewStyle;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = 'Something went wrong',
  message = 'We could not fetch the property details. Please check your internet connection.',
  onRetry,
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.iconCircle}>
        <Icons.Close size={28} color={colors.errorText} />
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>
      {onRetry && (
        <CustomButton
          title="Try Again"
          onPress={onRetry}
          variant="primary"
          style={styles.retryButton}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: spacing.xxl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: borderRadius.round,
    backgroundColor: colors.error,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  title: {
    ...typography.h3,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
    textAlign: 'center',
  },
  message: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: spacing.xl,
    maxWidth: 320,
  },
  retryButton: {
    minWidth: 160,
  },
});
