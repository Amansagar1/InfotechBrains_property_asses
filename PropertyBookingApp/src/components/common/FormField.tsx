import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TextInputProps,
  ViewStyle,
  TouchableOpacity,
} from 'react-native';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { borderRadius, spacing } from '../../theme/spacing';

export interface FormFieldProps extends TextInputProps {
  label: string;
  required?: boolean;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  prefixText?: string;
  prefixOnPress?: () => void;
  onPress?: () => void;
  containerStyle?: ViewStyle;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  required = false,
  error,
  leftIcon,
  rightIcon,
  prefixText,
  prefixOnPress,
  onPress,
  containerStyle,
  style,
  ...inputProps
}) => {
  const isFieldPressable = typeof onPress === 'function';
  const InputWrapper = isFieldPressable ? TouchableOpacity : View;

  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={styles.label}>
        {label} {required && <Text style={styles.requiredStar}>*</Text>}
      </Text>

      <InputWrapper
        activeOpacity={0.7}
        onPress={onPress}
        style={[
          styles.inputContainer,
          error ? styles.inputError : null,
        ]}
      >
        {leftIcon && <View style={styles.leftIconContainer}>{leftIcon}</View>}

        {prefixText && (
          <TouchableOpacity
            activeOpacity={0.7}
            disabled={!prefixOnPress}
            onPress={prefixOnPress}
            style={styles.prefixContainer}
          >
            <Text style={styles.prefixText}>{prefixText} ▾</Text>
          </TouchableOpacity>
        )}

        <TextInput
          placeholderTextColor={colors.textTertiary}
          editable={!isFieldPressable}
          style={[styles.input, style]}
          pointerEvents={isFieldPressable ? 'none' : 'auto'}
          {...inputProps}
        />

        {rightIcon && <View style={styles.rightIconContainer}>{rightIcon}</View>}
      </InputWrapper>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.lg,
  },
  label: {
    ...typography.badge,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
    fontWeight: '600',
  },
  requiredStar: {
    color: colors.errorText,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.border,
    minHeight: 52,
    paddingHorizontal: spacing.md,
  },
  inputError: {
    borderColor: colors.errorText,
    backgroundColor: '#FFF8F8',
  },
  leftIconContainer: {
    marginRight: spacing.sm,
  },
  rightIconContainer: {
    marginLeft: spacing.sm,
  },
  prefixContainer: {
    paddingRight: spacing.sm,
    marginRight: spacing.sm,
    borderRightWidth: 1,
    borderRightColor: colors.border,
  },
  prefixText: {
    ...typography.body,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  input: {
    flex: 1,
    ...typography.body,
    color: colors.textPrimary,
    paddingVertical: spacing.sm,
  },
  errorText: {
    ...typography.bodySmall,
    color: colors.errorText,
    marginTop: spacing.xxs,
  },
});
