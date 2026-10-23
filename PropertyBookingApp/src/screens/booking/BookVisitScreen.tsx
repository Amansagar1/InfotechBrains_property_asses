import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RootStackScreenProps } from '../../types/navigation';
import { useBookingForm } from '../../hooks/useBookingForm';
import { PropertySummaryCard } from '../../components/property/PropertySummaryCard';
import { BookingForm } from '../../components/booking/BookingForm';
import { Icons } from '../../components/common/Icons';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { spacing, borderRadius } from '../../theme/spacing';
import { resolveImageUrl } from '../../utils/imageHelper';

export type BookVisitScreenProps = RootStackScreenProps<'BookVisit'>;

export const BookVisitScreen: React.FC<BookVisitScreenProps> = ({
  route,
  navigation,
}) => {
  const { property } = route.params;

  const {
    formData,
    errors,
    isSubmitting,
    submitError,
    updateField,
    submit,
  } = useBookingForm(property);

  const handleSubmit = async () => {
    const confirmation = await submit();
    if (confirmation) {
      navigation.navigate('BookingConfirmation', { confirmation });
    }
  };

  const propertySummary = {
    id: property.id,
    address: property.address,
    city: property.city,
    state: property.state,
    price: property.price,
    currency: property.currency,
    property_type: property.property_type,
    beds: property.beds,
    baths: property.baths,
    sqft: property.sqft,
    imageUrl: resolveImageUrl(property.photos?.[0]?.url),
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Image
        source={require('../../assets/images/botanical_left.png')}
        style={styles.botanicalTopRight}
        resizeMode="contain"
      />
      <Image
        source={require('../../assets/images/botanical_left.png')}
        style={styles.botanicalBottomLeft}
        resizeMode="contain"
      />
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.headerBar}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Icons.ArrowLeft size={20} color={colors.textPrimary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Book a Visit</Text>
          <View style={styles.headerRightPlaceholder} />
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <PropertySummaryCard property={propertySummary} />

          <BookingForm
            formData={formData}
            errors={errors}
            isSubmitting={isSubmitting}
            submitError={submitError}
            onUpdateField={updateField}
            onSubmit={handleSubmit}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F6F4F0',
  },
  botanicalTopRight: {
    position: 'absolute',
    right: 0,
    top: 0,
    width: 90,
    height: 180,
    opacity: 0.65,
    transform: [{ scaleX: -1 }],
    zIndex: 0,
  },
  botanicalBottomLeft: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    width: 90,
    height: 150,
    opacity: 0.75,
    zIndex: 0,
  },
  keyboardView: {
    flex: 1,
  },
  headerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.round,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ECE9E2',
  },
  headerTitle: {
    fontFamily: 'serif',
    fontSize: 22,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  headerRightPlaceholder: {
    width: 40,
  },
  scrollContent: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xxxl,
  },
});
