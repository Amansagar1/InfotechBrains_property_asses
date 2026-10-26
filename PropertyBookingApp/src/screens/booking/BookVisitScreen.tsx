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
import Svg, { Path } from 'react-native-svg';
import { RootStackScreenProps } from '../../types/navigation';
import { useBookingForm } from '../../hooks/useBookingForm';
import { PropertySummaryCard } from '../../components/property/PropertySummaryCard';
import { BookingForm } from '../../components/booking/BookingForm';
import { Icons } from '../../components/common/Icons';
import { resolveImageUrl } from '../../utils/imageHelper';
import { fontFamilies } from '../../theme/typography';
import { colors } from '../../theme/colors';
import { useApp } from '../../context/AppContext';

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

  const { addBookedVisit, updateUserProfile } = useApp();

  const handleSubmit = async () => {
    const confirmation = await submit();
    if (confirmation) {
      addBookedVisit(confirmation);
      updateUserProfile({
        name: confirmation.visitor.visitorName,
        email: confirmation.visitor.email,
        phone: `${confirmation.visitor.countryCode ? confirmation.visitor.countryCode + ' ' : ''}${confirmation.visitor.contactNumber}`,
      });
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
    imageUrl: property.photos?.[0]?.url,
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/*-------------------- Top Left Watercolor Tint ----------------------*/}
      <View style={styles.topLeftWatercolor} pointerEvents="none">
        <Svg width={180} height={180} viewBox="0 0 180 180">
          <Path
            d="M 0,0 L 180,0 C 140,50 90,95 60,135 C 30,165 15,175 0,180 Z"
            fill="#EADECB"
            opacity={0.38}
          />
        </Svg>
      </View>

      {/*-------------------- Top Right Botanical Branch ----------------------*/}
      <View style={styles.topRightBotanicalContainer} pointerEvents="none">
        <Svg width={190} height={200} viewBox="0 0 190 200" style={styles.blobSvg}>
          <Path
            d="M 70,0 C 130,-10 190,25 190,95 C 190,160 140,195 85,180 C 35,165 10,135 5,85 C 0,35 15,10 70,0 Z"
            fill="#E5D9C2"
            opacity={0.68}
          />
        </Svg>
        <Image
          source={require('../../assets/images/details_botanical_clean.png')}
          style={styles.topRightBranch}
          resizeMode="contain"
        />
      </View>

      {/*-------------------- Bottom Left Sage Leaves ----------------------*/}
      <View style={styles.bottomLeftContainer} pointerEvents="none">
        <Svg width={180} height={170} viewBox="0 0 180 170">
          <Path
            d="M 0,170 C 0,120 20,70 50,40 C 45,70 70,120 140,170 Z"
            fill="#CAD6BA"
            opacity={0.4}
          />
          <Path
            d="M 0,170 C 0,110 15,60 38,15 C 35,50 55,110 105,170 Z"
            fill="#98A783"
            opacity={0.82}
          />
          <Path
            d="M 0,165 Q 25,90 38,15"
            stroke="#7C8D67"
            strokeWidth="1.2"
            fill="none"
          />
          <Path
            d="M 16,110 Q 35,95 55,102"
            stroke="#7C8D67"
            strokeWidth="1"
            fill="none"
          />
          <Path
            d="M 24,75 Q 38,65 48,70"
            stroke="#7C8D67"
            strokeWidth="1"
            fill="none"
          />
        </Svg>
      </View>

      {/*-------------------- Bottom Right Forest Green Leaf ----------------------*/}
      <View style={styles.bottomRightContainer} pointerEvents="none">
        <Svg width={150} height={160} viewBox="0 0 150 160">
          <Path
            d="M 150,15 C 95,35 45,75 22,160 L 150,160 Z"
            fill="#18301F"
            opacity={0.95}
          />
          <Path
            d="M 150,15 Q 85,75 22,160"
            stroke="#355D42"
            strokeWidth="1.6"
            fill="none"
          />
          <Path
            d="M 105,55 Q 125,44 145,46"
            stroke="#355D42"
            strokeWidth="1"
            fill="none"
          />
          <Path
            d="M 78,82 Q 100,70 122,76"
            stroke="#355D42"
            strokeWidth="1"
            fill="none"
          />
          <Path
            d="M 54,110 Q 75,98 96,106"
            stroke="#355D42"
            strokeWidth="1"
            fill="none"
          />
          <Path
            d="M 34,135 Q 52,126 70,132"
            stroke="#355D42"
            strokeWidth="1"
            fill="none"
          />
        </Svg>
      </View>

      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        {/*-------------------- Header Bar ----------------------*/}
        <View style={styles.headerBar}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigation.goBack()}
            style={styles.backButton}
            hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
          >
            <Icons.ArrowLeft size={22} color={colors.textPrimary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Book a Visit</Text>
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

//-------------------- Styles ----------------------
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F9F4EB',
  },
  topLeftWatercolor: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 180,
    height: 180,
    zIndex: 0,
  },
  topRightBotanicalContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 200,
    height: 220,
    zIndex: 0,
  },
  blobSvg: {
    position: 'absolute',
    top: -20,
    right: -10,
  },
  topRightBranch: {
    position: 'absolute',
    top: 16,
    right: -2,
    width: 110,
    height: 200,
    transform: [{ rotate: '12deg' }],
  },
  bottomLeftContainer: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    width: 180,
    height: 170,
    zIndex: 0,
  },
  bottomRightContainer: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: 150,
    height: 160,
    zIndex: 0,
  },
  keyboardView: {
    flex: 1,
    zIndex: 1,
  },
  headerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 16,
  },
  backButton: {
    padding: 4,
    marginRight: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontFamily: fontFamilies.headingSemiBold,
    fontSize: 24,
    fontWeight: '600',
    color: colors.textPrimary,
    letterSpacing: -0.3,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
});

