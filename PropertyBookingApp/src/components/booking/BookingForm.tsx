import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
} from 'react-native';
import { BookingFormData, BookingFormErrors } from '../../types/booking';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { borderRadius, spacing } from '../../theme/spacing';
import { COUNTRY_CODES, TIME_SLOTS } from '../../constants/config';
import { FormField } from '../common/FormField';
import { CustomButton } from '../common/CustomButton';
import { Icons } from '../common/Icons';

export interface BookingFormProps {
  formData: BookingFormData;
  errors: BookingFormErrors;
  isSubmitting: boolean;
  submitError?: string | null;
  onUpdateField: (field: keyof BookingFormData, value: string) => void;
  onSubmit: () => void;
}

export const BookingForm: React.FC<BookingFormProps> = ({
  formData,
  errors,
  isSubmitting,
  submitError,
  onUpdateField,
  onSubmit,
}) => {
  const [showTimeModal, setShowTimeModal] = useState<boolean>(false);
  const [showCountryModal, setShowCountryModal] = useState<boolean>(false);

  const setQuickDate = (daysAhead: number) => {
    const d = new Date();
    d.setDate(d.getDate() + daysAhead);
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    onUpdateField('preferredDate', `${yyyy}-${mm}-${dd}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Your Details</Text>
      <Text style={styles.sectionSubtitle}>
        Fill in your details to schedule a property visit.
      </Text>

      <FormField
        label="Full Name"
        required
        placeholder="Enter your name"
        value={formData.visitorName}
        onChangeText={text => onUpdateField('visitorName', text)}
        error={errors.visitorName}
        leftIcon={<Icons.User size={18} color={colors.textSecondary} />}
        autoCapitalize="words"
      />

      <FormField
        label="Email Address"
        required
        placeholder="you@example.com"
        value={formData.email}
        onChangeText={text => onUpdateField('email', text)}
        error={errors.email}
        leftIcon={<Icons.Mail size={18} color={colors.textSecondary} />}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <FormField
        label="Contact Number"
        required
        placeholder="Enter your number"
        value={formData.contactNumber}
        onChangeText={text => onUpdateField('contactNumber', text)}
        error={errors.contactNumber}
        keyboardType="phone-pad"
        leftIcon={<Icons.Phone size={18} color={colors.textSecondary} />}
        prefixText={formData.countryCode}
        prefixOnPress={() => setShowCountryModal(true)}
      />

      <FormField
        label="Preferred Visit Date"
        required
        placeholder="Select a date"
        value={formData.preferredDate}
        onChangeText={text => onUpdateField('preferredDate', text)}
        error={errors.preferredDate}
        leftIcon={<Icons.Calendar size={18} color={colors.textSecondary} />}
        rightIcon={<Icons.Calendar size={18} color={colors.textSecondary} />}
      />

      <FormField
        label="Preferred Time Slot"
        required
        placeholder="Select a time slot"
        value={formData.preferredTimeSlot}
        error={errors.preferredTimeSlot}
        leftIcon={<Icons.Clock size={18} color={colors.textSecondary} />}
        rightIcon={<Icons.ChevronDown size={18} color={colors.textSecondary} />}
        onPress={() => setShowTimeModal(true)}
      />

      {submitError && (
        <View style={styles.errorBanner}>
          <Text style={styles.errorBannerText}>{submitError}</Text>
        </View>
      )}

      <CustomButton
        title={isSubmitting ? 'Scheduling Visit...' : 'Submit Request'}
        onPress={onSubmit}
        variant="primary"
        loading={isSubmitting}
        disabled={isSubmitting}
        showArrow={!isSubmitting}
        style={styles.submitButton}
      />

      <View style={styles.trustBadge}>
        <Icons.Lock size={14} color={colors.textSecondary} />
        <Text style={styles.trustText}>Your information is safe with us.</Text>
      </View>

      <Modal
        visible={showTimeModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowTimeModal(false)}
      >
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => setShowTimeModal(false)}
          style={styles.modalOverlay}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Preferred Time Slot</Text>
            {TIME_SLOTS.map(slot => (
              <TouchableOpacity
                key={slot}
                activeOpacity={0.7}
                onPress={() => {
                  onUpdateField('preferredTimeSlot', slot);
                  setShowTimeModal(false);
                }}
                style={[
                  styles.slotItem,
                  formData.preferredTimeSlot === slot && styles.slotItemActive,
                ]}
              >
                <Text
                  style={[
                    styles.slotText,
                    formData.preferredTimeSlot === slot && styles.slotTextActive,
                  ]}
                >
                  {slot}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>

      <Modal
        visible={showCountryModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowCountryModal(false)}
      >
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => setShowCountryModal(false)}
          style={styles.modalOverlay}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Country Code</Text>
            {COUNTRY_CODES.map(item => (
              <TouchableOpacity
                key={item.value}
                activeOpacity={0.7}
                onPress={() => {
                  onUpdateField('countryCode', item.value);
                  setShowCountryModal(false);
                }}
                style={[
                  styles.slotItem,
                  formData.countryCode === item.value && styles.slotItemActive,
                ]}
              >
                <Text
                  style={[
                    styles.slotText,
                    formData.countryCode === item.value && styles.slotTextActive,
                  ]}
                >
                  {item.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.card,
    borderRadius: borderRadius.xxl,
    padding: spacing.xl,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
  },
  sectionTitle: {
    fontFamily: 'serif',
    fontSize: 24,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: spacing.xxs,
  },
  sectionSubtitle: {
    ...typography.subtitle,
    color: colors.textSecondary,
    marginBottom: spacing.xl,
  },
  quickDateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: -spacing.sm,
    marginBottom: spacing.lg,
    flexWrap: 'wrap',
  },
  quickDateLabel: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    marginRight: spacing.sm,
  },
  quickChip: {
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xxs,
    borderRadius: borderRadius.round,
    marginRight: spacing.xs,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
  },
  quickChipText: {
    ...typography.bodySmall,
    fontSize: 11,
    color: colors.textPrimary,
  },
  errorBanner: {
    backgroundColor: colors.error,
    padding: spacing.md,
    borderRadius: borderRadius.md,
    marginBottom: spacing.lg,
  },
  errorBannerText: {
    ...typography.bodySmall,
    color: colors.errorText,
    textAlign: 'center',
  },
  submitButton: {
    marginTop: spacing.sm,
    marginBottom: spacing.lg,
  },
  trustBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  trustText: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    marginLeft: spacing.xs,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
  },
  modalContent: {
    backgroundColor: colors.card,
    borderRadius: borderRadius.xl,
    padding: spacing.xl,
    width: '100%',
    maxWidth: 360,
  },
  modalTitle: {
    ...typography.h3,
    color: colors.textPrimary,
    marginBottom: spacing.lg,
  },
  slotItem: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.md,
    marginBottom: spacing.xs,
  },
  slotItemActive: {
    backgroundColor: colors.surface,
  },
  slotText: {
    ...typography.body,
    color: colors.textPrimary,
  },
  slotTextActive: {
    color: colors.primary,
    fontWeight: '600',
  },
});
