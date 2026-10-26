import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';
import { RootStackScreenProps } from '../../types/navigation';
import { Icons } from '../../components/common/Icons';
import { formatPrice, formatDate } from '../../utils/formatters';
import { PropertyImage } from '../../components/common/PropertyImage';
import { fontFamilies } from '../../theme/typography';
import { colors } from '../../theme/colors';

export type BookingConfirmationScreenProps = RootStackScreenProps<'BookingConfirmation'>;

export const BookingConfirmationScreen: React.FC<BookingConfirmationScreenProps> = ({
  route,
  navigation,
}) => {
  const { confirmation } = route.params;

  const handleBackToHome = () => {
    navigation.popToTop();
  };

  const handleViewRequests = () => {
    (navigation as any).navigate('MainTabs', { screen: 'Visits' });
  };

  const property = confirmation.property;
  const visitor = confirmation.visitor;

  const displayTitle = property.address ? property.address.split(',')[0] : 'Property';
  const displayPrice = formatPrice(property.price, property.currency || 'USD');
  const locationText =
    property.city && property.state
      ? `${property.city}, ${property.state}`
      : property.address;

  return (
    <SafeAreaView style={styles.safeArea}>
      {/*-------------------- Top Left Botanical ----------------------*/}
      <View style={styles.topLeftWatercolor} pointerEvents="none">
        <Svg width={180} height={190} viewBox="0 0 180 190">
          <Path
            d="M 0,0 L 150,0 C 130,40 100,80 65,115 C 35,150 15,170 0,185 Z"
            fill="#3E5235"
            opacity={0.88}
          />
        </Svg>
        <Image
          source={require('../../assets/images/details_botanical_clean.png')}
          style={styles.topLeftBranch}
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
        </Svg>
      </View>

      {/*-------------------- Bottom Right Forest Leaf ----------------------*/}
      <View style={styles.bottomRightContainer} pointerEvents="none">
        <Svg width={140} height={150} viewBox="0 0 140 150">
          <Path
            d="M 140,30 C 85,50 40,85 25,150 L 140,150 Z"
            fill="#18301F"
            opacity={0.92}
          />
          <Path
            d="M 140,30 Q 80,80 25,150"
            stroke="#355D42"
            strokeWidth="1.5"
            fill="none"
          />
        </Svg>
      </View>

      {/*-------------------- Top Header Bar ----------------------*/}
      <View style={styles.headerBar}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={handleBackToHome}
          style={styles.headerIconButton}
          hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
        >
          <Icons.ArrowLeft size={22} color="#C8D4BC" />
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={handleBackToHome}
          style={styles.headerIconButton}
          hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
        >
          <Icons.Close size={22} color="#1A1A1A" />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/*-------------------- House Illustration ----------------------*/}
        <View style={styles.illustrationContainer}>
          <Image
            source={require('../../assets/images/confirmation_house.png')}
            style={styles.illustrationImage}
            resizeMode="contain"
          />
        </View>

        <Text style={styles.title}>Visit Request Submitted!</Text>
        <Text style={styles.subtitle}>
          Your property visit request has been submitted successfully. We will get
          back to you soon.
        </Text>

        {/*-------------------- Summary Card ----------------------*/}
        <View style={styles.unifiedCard}>
          <View style={styles.propertyRow}>
            <PropertyImage
              uri={property.imageUrl}
              style={styles.propertyThumbnail}
            />
            <View style={styles.propertyInfo}>
              <Text style={styles.propertyTitle} numberOfLines={1}>
                {displayTitle}
              </Text>
              <View style={styles.locationRow}>
                <Icons.Pin size={14} color={colors.textSecondary} />
                <Text style={styles.locationText} numberOfLines={1}>
                  {locationText}
                </Text>
              </View>
              <Text style={styles.propertyPrice}>{displayPrice}</Text>
            </View>
          </View>

          <View style={styles.cardDivider} />

          {/*-------------------- Visitor Details Section ----------------------*/}
          <View style={styles.visitorSection}>
            <Text style={styles.visitorSectionTitle}>Visitor Details</Text>

            <View style={styles.detailRow}>
              <View style={styles.iconContainer}>
                <Icons.User size={18} color={colors.primary} />
              </View>
              <Text style={styles.detailText}>
                {visitor.visitorName}
              </Text>
            </View>

            <View style={styles.detailRow}>
              <View style={styles.iconContainer}>
                <Icons.Mail size={18} color={colors.primary} />
              </View>
              <Text style={styles.detailText}>
                {visitor.email}
              </Text>
            </View>

            <View style={styles.detailRow}>
              <View style={styles.iconContainer}>
                <Icons.Phone size={18} color={colors.primary} />
              </View>
              <Text style={styles.detailText}>
                {visitor.countryCode ? `${visitor.countryCode} ` : ''}{visitor.contactNumber}
              </Text>
            </View>

            <View style={styles.detailRow}>
              <View style={styles.iconContainer}>
                <Icons.Calendar size={18} color={colors.primary} />
              </View>
              <Text style={styles.detailText}>
                {formatDate(visitor.preferredDate)}
              </Text>
            </View>

            <View style={styles.detailRow}>
              <View style={styles.iconContainer}>
                <Icons.Clock size={18} color={colors.primary} />
              </View>
              <Text style={styles.detailText}>
                {visitor.preferredTimeSlot}
              </Text>
            </View>
          </View>
        </View>

        {/*-------------------- Disclaimer Box ----------------------*/}
        <View style={styles.disclaimerBox}>
          <Icons.Info size={18} color="#6B7280" />
          <Text style={styles.disclaimerText}>
            This is a simulated booking request.{'\n'}No actual appointment has been reserved yet.
          </Text>
        </View>

        {/*-------------------- Action Buttons ----------------------*/}
        <View style={styles.actionButtons}>
          <TouchableOpacity
            activeOpacity={0.88}
            onPress={handleBackToHome}
            style={styles.primaryButton}
          >
            <Text style={styles.primaryButtonText}>Back to Home</Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.88}
            onPress={handleViewRequests}
            style={styles.secondaryButton}
          >
            <Text style={styles.secondaryButtonText}>View My Requests</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
    left: 0,
    top: 0,
    width: 180,
    height: 190,
    zIndex: 0,
  },
  topLeftBranch: {
    position: 'absolute',
    top: 5,
    left: 0,
    width: 110,
    height: 190,
    transform: [{ rotate: '5deg' }],
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
    width: 140,
    height: 150,
    zIndex: 0,
  },
  headerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 4,
    zIndex: 1,
  },
  headerIconButton: {
    padding: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
    zIndex: 1,
  },
  illustrationContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
    marginBottom: 8,
  },
  illustrationImage: {
    width: 200,
    height: 150,
  },
  title: {
    fontFamily: fontFamilies.heading,
    fontSize: 25,
    fontWeight: '600',
    color: colors.textPrimary,
    textAlign: 'center',
    marginBottom: 6,
    letterSpacing: -0.3,
  },
  subtitle: {
    fontFamily: fontFamilies.bodyMedium,
    fontSize: 14,
    lineHeight: 20,
    color: colors.textSecondary,
    textAlign: 'center',
    paddingHorizontal: 16,
    marginBottom: 16,
    fontWeight: '500',
  },
  unifiedCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 16,
    borderWidth: 1,
    borderColor: '#ECE7DD',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 10,
    elevation: 3,
    marginBottom: 14,
  },
  propertyRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  propertyThumbnail: {
    width: 86,
    height: 86,
    borderRadius: 16,
    backgroundColor: '#F5EFE6',
  },
  propertyInfo: {
    flex: 1,
    marginLeft: 16,
    justifyContent: 'center',
  },
  propertyTitle: {
    fontFamily: fontFamilies.heading,
    fontSize: 19,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 5,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  locationText: {
    fontFamily: fontFamilies.bodyMedium,
    fontSize: 14,
    fontWeight: '500',
    color: colors.textSecondary,
    marginLeft: 6,
  },
  propertyPrice: {
    fontFamily: fontFamilies.heading,
    fontSize: 18,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  cardDivider: {
    height: 1,
    backgroundColor: '#EFEBE2',
    marginVertical: 16,
  },
  visitorSection: {
    paddingTop: 2,
  },
  visitorSectionTitle: {
    fontFamily: fontFamilies.heading,
    fontSize: 16,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 14,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconContainer: {
    width: 24,
    alignItems: 'center',
    marginRight: 12,
  },
  detailText: {
    fontFamily: fontFamilies.bodyMedium,
    fontSize: 14.5,
    color: colors.textPrimary,
    fontWeight: '500',
    flex: 1,
  },
  disclaimerBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: 4,
    marginBottom: 14,
  },
  disclaimerText: {
    fontFamily: fontFamilies.bodyMedium,
    fontSize: 13,
    color: colors.textTertiary,
    marginLeft: 10,
    lineHeight: 18,
    flex: 1,
    fontWeight: '500',
  },
  actionButtons: {
    marginBottom: 20,
  },
  primaryButton: {
    backgroundColor: '#264E36',
    height: 54,
    borderRadius: 27,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    shadowColor: '#264E36',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.22,
    shadowRadius: 8,
    elevation: 3,
  },
  primaryButtonText: {
    fontFamily: fontFamilies.bodySemiBold,
    fontSize: 15.5,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  secondaryButton: {
    backgroundColor: '#F5EFE4',
    height: 54,
    borderRadius: 27,
    borderWidth: 1.2,
    borderColor: '#4A4A4A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryButtonText: {
    fontFamily: fontFamilies.bodySemiBold,
    fontSize: 15.5,
    fontWeight: '600',
    color: colors.textPrimary,
  },
});


