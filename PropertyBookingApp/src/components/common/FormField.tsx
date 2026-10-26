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
import { fontFamilies } from '../../theme/typography';
import { Icons } from './Icons';

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
      <View style={styles.floatingLabelBadge} pointerEvents="none">
        <Text style={styles.label}>
          {label} {required && <Text style={styles.requiredStar}>*</Text>}
        </Text>
      </View>

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
            <Text style={styles.prefixText}>{prefixText}</Text>
            <Icons.ChevronDown size={12} color="#1A1A1A" />
            <View style={styles.prefixDivider} />
          </TouchableOpacity>
        )}

        {isFieldPressable ? (
          <Text
            numberOfLines={1}
            style={[
              styles.input,
              !inputProps.value ? styles.placeholderText : null,
              style,
            ]}
          >
            {inputProps.value || inputProps.placeholder}
          </Text>
        ) : (
          <TextInput
            placeholderTextColor="#444444"
            style={[styles.input, style]}
            {...inputProps}
          />
        )}

        {rightIcon && <View style={styles.rightIconContainer}>{rightIcon}</View>}
      </InputWrapper>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
};

//-------------------- Styles ----------------------
const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    position: 'relative',
  },
  floatingLabelBadge: {
    position: 'absolute',
    top: -9,
    left: 50,
    zIndex: 10,
    backgroundColor: '#F9F4EB',
    paddingHorizontal: 6,
  },
  label: {
    fontFamily: fontFamilies.bodySemiBold,
    fontSize: 12.5,
    fontWeight: '600',
    color: colors.textPrimary,
    letterSpacing: 0.2,
  },
  requiredStar: {
    color: '#C4704F',
    fontWeight: '600',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderRadius: 16,
    borderWidth: 1.2,
    borderColor: '#E6E0D4',
    height: 56,
    paddingHorizontal: 16,
  },
  inputError: {
    borderColor: colors.errorText,
    backgroundColor: '#FFF8F8',
  },
  leftIconContainer: {
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightIconContainer: {
    marginLeft: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  prefixContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 8,
  },
  prefixText: {
    fontFamily: fontFamilies.bodyMedium,
    fontSize: 15,
    fontWeight: '500',
    color: colors.textPrimary,
    marginRight: 5,
  },
  prefixDivider: {
    width: 1.2,
    height: 22,
    backgroundColor: '#E6E0D4',
    marginLeft: 8,
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontFamily: fontFamilies.bodyMedium,
    fontSize: 15,
    fontWeight: '500',
    color: colors.textPrimary,
    paddingVertical: 0,
  },
  placeholderText: {
    color: colors.textTertiary,
    fontWeight: '500',
  },
  errorText: {
    fontFamily: fontFamilies.bodyMedium,
    fontSize: 12,
    color: colors.errorText,
    marginTop: 4,
    marginLeft: 12,
  },
});
