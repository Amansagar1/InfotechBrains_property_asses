import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
} from 'react-native';
import { BookingFormData, BookingFormErrors } from '../../types/booking';
import { colors } from '../../theme/colors';
import { FormField } from '../common/FormField';
import { Icons } from '../common/Icons';

export interface BookingFormProps {
  formData: BookingFormData;
  errors: BookingFormErrors;
  isSubmitting: boolean;
  submitError?: string | null;
  onUpdateField: (field: keyof BookingFormData, value: string) => void;
  onSubmit: () => void;
}

const QUICK_DATES = [
  { label: 'Today', offset: 0 },
  { label: 'Tomorrow', offset: 1 },
  { label: 'In 2 Days', offset: 2 },
  { label: 'This Weekend', offset: 3 },
  { label: 'Next Monday', offset: 4 },
  { label: 'Next Week', offset: 7 },
];

const TIME_SLOT_OPTIONS = [
  '10:00 AM - 11:00 AM',
  '11:30 AM - 12:30 PM',
  '02:00 PM - 03:00 PM',
  '04:00 PM - 05:00 PM',
  '05:30 PM - 06:30 PM',
];

const COUNTRY_OPTIONS = [
  { code: '+91', country: 'India', flag: '🇮🇳' },
  { code: '+1', country: 'United States', flag: '🇺🇸' },
  { code: '+44', country: 'United Kingdom', flag: '🇬🇧' },
  { code: '+971', country: 'UAE', flag: '🇦🇪' },
  { code: '+65', country: 'Singapore', flag: '🇸🇬' },
  { code: '+61', country: 'Australia', flag: '🇦🇺' },
];

export const BookingForm: React.FC<BookingFormProps> = ({
  formData,
  errors,
  isSubmitting,
  submitError,
  onUpdateField,
  onSubmit,
}) => {
  const [showDateModal, setShowDateModal] = useState<boolean>(false);
  const [showTimeModal, setShowTimeModal] = useState<boolean>(false);
  const [showCountryModal, setShowCountryModal] = useState<boolean>(false);

  const formatDateSelection = (offsetDays: number) => {
    const d = new Date();
    d.setDate(d.getDate() + offsetDays);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const formatted = `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
    return formatted;
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
        leftIcon={<Icons.User size={20} color="#1A1A1A" />}
        autoCapitalize="words"
      />

      <FormField
        label="Email Address"
        required
        placeholder="you@example.com"
        value={formData.email}
        onChangeText={text => onUpdateField('email', text)}
        error={errors.email}
        leftIcon={<Icons.Mail size={20} color="#1A1A1A" />}
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
        leftIcon={<Icons.Phone size={20} color="#1A1A1A" />}
        prefixText={formData.countryCode || '+91'}
        prefixOnPress={() => setShowCountryModal(true)}
      />

      <FormField
        label="Preferred Visit Date"
        required
        placeholder="Select a date"
        value={formData.preferredDate}
        error={errors.preferredDate}
        leftIcon={<Icons.Calendar size={20} color="#1A1A1A" />}
        rightIcon={<Icons.Calendar size={20} color="#1A1A1A" />}
        onPress={() => setShowDateModal(true)}
      />

      <FormField
        label="Preferred Time Slot"
        required
        placeholder="Select a time slot"
        value={formData.preferredTimeSlot}
        error={errors.preferredTimeSlot}
        leftIcon={<Icons.Clock size={20} color="#1A1A1A" />}
        rightIcon={<Icons.ChevronDown size={18} color="#1A1A1A" />}
        onPress={() => setShowTimeModal(true)}
      />

      {submitError ? (
        <View style={styles.errorBanner}>
          <Text style={styles.errorBannerText}>{submitError}</Text>
        </View>
      ) : null}

      <TouchableOpacity
        activeOpacity={0.88}
        disabled={isSubmitting}
        onPress={onSubmit}
        style={[styles.submitButton, isSubmitting && styles.submitButtonDisabled]}
      >
        <Text style={styles.submitButtonText}>
          {isSubmitting ? 'Scheduling Visit...' : 'Submit Request'}
        </Text>
        {!isSubmitting && <Icons.ArrowRight size={18} color="#FFFFFF" />}
      </TouchableOpacity>

      <View style={styles.trustBadge}>
        <Icons.Lock size={14} color="#6B7280" />
        <Text style={styles.trustText}>Your information is safe with us.</Text>
      </View>

      {/* Date Selection Modal */}
      <Modal
        visible={showDateModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowDateModal(false)}
      >
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => setShowDateModal(false)}
          style={styles.modalOverlay}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Preferred Date</Text>
            {QUICK_DATES.map(item => {
              const dateStr = formatDateSelection(item.offset);
              const isSelected = formData.preferredDate === dateStr;
              return (
                <TouchableOpacity
                  key={item.label}
                  activeOpacity={0.7}
                  onPress={() => {
                    onUpdateField('preferredDate', dateStr);
                    setShowDateModal(false);
                  }}
                  style={[styles.modalItem, isSelected && styles.modalItemActive]}
                >
                  <Text style={[styles.modalItemText, isSelected && styles.modalItemTextActive]}>
                    {item.label}
                  </Text>
                  <Text style={styles.modalItemSubtext}>{dateStr}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Time Slot Selection Modal */}
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
            {TIME_SLOT_OPTIONS.map(slot => {
              const isSelected = formData.preferredTimeSlot === slot;
              return (
                <TouchableOpacity
                  key={slot}
                  activeOpacity={0.7}
                  onPress={() => {
                    onUpdateField('preferredTimeSlot', slot);
                    setShowTimeModal(false);
                  }}
                  style={[styles.modalItem, isSelected && styles.modalItemActive]}
                >
                  <Text style={[styles.modalItemText, isSelected && styles.modalItemTextActive]}>
                    {slot}
                  </Text>
                  {isSelected && <Icons.Checkmark size={18} color="#264E36" />}
                </TouchableOpacity>
              );
            })}
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Country Code Modal */}
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
            {COUNTRY_OPTIONS.map(item => {
              const isSelected = formData.countryCode === item.code;
              return (
                <TouchableOpacity
                  key={item.code}
                  activeOpacity={0.7}
                  onPress={() => {
                    onUpdateField('countryCode', item.code);
                    setShowCountryModal(false);
                  }}
                  style={[styles.modalItem, isSelected && styles.modalItemActive]}
                >
                  <Text style={[styles.modalItemText, isSelected && styles.modalItemTextActive]}>
                    {item.flag}  {item.country} ({item.code})
                  </Text>
                  {isSelected && <Icons.Checkmark size={18} color="#264E36" />}
                </TouchableOpacity>
              );
            })}
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    paddingHorizontal: 0,
    marginTop: 0,
  },
  sectionTitle: {
    fontFamily: 'serif',
    fontSize: 24,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 6,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 24,
    lineHeight: 20,
  },
  errorBanner: {
    backgroundColor: '#FDE8E8',
    padding: 12,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#F8B4B4',
  },
  errorBannerText: {
    fontSize: 13,
    color: '#9B1C1C',
    textAlign: 'center',
  },
  submitButton: {
    backgroundColor: '#264E36',
    height: 56,
    borderRadius: 28,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    marginBottom: 18,
    shadowColor: '#264E36',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 3,
  },
  submitButtonDisabled: {
    opacity: 0.7,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    marginRight: 10,
  },
  trustBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 36,
  },
  trustText: {
    fontSize: 13,
    color: '#6B7280',
    marginLeft: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    width: '100%',
    maxWidth: 360,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 5,
  },
  modalTitle: {
    fontFamily: 'serif',
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 16,
  },
  modalItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: 12,
    marginBottom: 4,
  },
  modalItemActive: {
    backgroundColor: '#F3EFE6',
  },
  modalItemText: {
    fontSize: 14.5,
    color: '#1A1A1A',
    fontWeight: '500',
  },
  modalItemTextActive: {
    color: '#264E36',
    fontWeight: '700',
  },
  modalItemSubtext: {
    fontSize: 13,
    color: '#8A867E',
  },
});

