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
import { RootStackScreenProps } from '../../types/navigation';
import { shadows } from '../../theme/shadows';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { spacing, borderRadius } from '../../theme/spacing';
import { Icons } from '../../components/common/Icons';
import { CustomButton } from '../../components/common/CustomButton';
import { formatPrice, formatDate } from '../../utils/formatters';
import { getPropertyImageSource } from '../../utils/imageHelper';

export type BookingConfirmationScreenProps = RootStackScreenProps<'BookingConfirmation'>;

export const BookingConfirmationScreen: React.FC<BookingConfirmationScreenProps> = ({
  route,
  navigation,
}) => {
  const { confirmation } = route.params;

  const handleBackToHome = () => {
    navigation.popToTop();
  };

  const property = confirmation.property;
  const visitor = confirmation.visitor;

  const displayTitle =
    property.id === 'prop_001'
      ? 'Maplewood Villa'
      : property.id === 'prop_002'
      ? 'Serene Heights'
      : property.address.split(',')[0] || 'Modern Home';

  const displayPrice =
    property.id === 'prop_001'
      ? '₹ 2.4 Cr'
      : property.id === 'prop_002'
      ? '₹ 1.35 Cr'
      : formatPrice(property.price, property.currency);

  const locationText =
    property.id === 'prop_001'
      ? 'Whitefield, Bangalore'
      : property.id === 'prop_002'
      ? 'Sarjapur Road, Bangalore'
      : property.city && property.state
      ? `${property.city}, ${property.state}`
      : property.address;

  return (
    <SafeAreaView style={styles.safeArea}>
      <Image
        source={require('../../assets/images/botanical_left.png')}
        style={styles.botanicalTopLeft}
        resizeMode="contain"
      />
      <Image
        source={require('../../assets/images/botanical_left.png')}
        style={styles.botanicalBottom}
        resizeMode="contain"
      />
      <View style={styles.headerBar}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={handleBackToHome}
          style={styles.headerButton}
        >
          <Icons.ArrowLeft size={20} color={colors.textPrimary} />
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={handleBackToHome}
          style={styles.headerButton}
        >
          <Icons.Close size={20} color={colors.textPrimary} />
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
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

        {/* Unified Card matching Mockup Screen 4 */}
        <View style={[styles.unifiedCard, shadows.card]}>
          <View style={styles.propertyRow}>
            <Image
              source={getPropertyImageSource(property)}
              style={styles.propertyThumbnail}
              resizeMode="cover"
            />
            <View style={styles.propertyInfo}>
              <Text style={styles.propertyTitle} numberOfLines={1}>
                {displayTitle}
              </Text>
              <View style={styles.locationRow}>
                <Icons.Pin size={13} color={colors.textSecondary} />
                <Text style={styles.locationText} numberOfLines={1}>
                  {locationText}
                </Text>
              </View>
              <Text style={styles.propertyPrice}>
                {displayPrice}
              </Text>
            </View>
          </View>

          <View style={styles.cardDivider} />

          <View style={styles.visitorSection}>
            <Text style={styles.visitorSectionTitle}>Visitor Details</Text>

            <View style={styles.detailRow}>
              <View style={styles.iconContainer}>
                <Icons.User size={18} color="#252823" />
              </View>
              <Text style={styles.detailText}>{visitor.visitorName}</Text>
            </View>

            <View style={styles.detailRow}>
              <View style={styles.iconContainer}>
                <Icons.Mail size={18} color="#252823" />
              </View>
              <Text style={styles.detailText}>{visitor.email}</Text>
            </View>

            <View style={styles.detailRow}>
              <View style={styles.iconContainer}>
                <Icons.Phone size={18} color="#252823" />
              </View>
              <Text style={styles.detailText}>
                {visitor.countryCode} {visitor.contactNumber}
              </Text>
            </View>

            <View style={styles.detailRow}>
              <View style={styles.iconContainer}>
                <Icons.Calendar size={18} color="#252823" />
              </View>
              <Text style={styles.detailText}>
                {formatDate(visitor.preferredDate)}
              </Text>
            </View>

            <View style={styles.detailRow}>
              <View style={styles.iconContainer}>
                <Icons.Clock size={18} color="#252823" />
              </View>
              <Text style={styles.detailText}>
                {visitor.preferredTimeSlot}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.disclaimerBox}>
          <Text style={styles.disclaimerIcon}>ⓘ</Text>
          <Text style={styles.disclaimerText}>
            This is a simulated booking request. No actual appointment has been reserved yet.
          </Text>
        </View>

        <View style={styles.actionButtons}>
          <CustomButton
            title="Back to Home"
            onPress={handleBackToHome}
            variant="primary"
            style={styles.primaryButton}
          />

          <CustomButton
            title="View My Requests"
            onPress={handleBackToHome}
            variant="outline"
            style={styles.secondaryButton}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FAF9F6',
  },
  botanicalTopLeft: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: 80,
    height: 180,
    opacity: 0.7,
    zIndex: 0,
  },
  botanicalBottom: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    width: 90,
    height: 140,
    opacity: 0.7,
    zIndex: 0,
  },
  headerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.round,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ECE9E2',
  },
  scrollContent: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xxxl,
  },
  illustrationContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: spacing.md,
    height: 160,
  },
  illustrationImage: {
    width: 280,
    height: 160,
  },
  title: {
    fontFamily: 'serif',
    fontSize: 26,
    lineHeight: 32,
    fontWeight: '700',
    color: '#1A1A1A',
    textAlign: 'center',
    marginBottom: spacing.xs,
  },
  subtitle: {
    ...typography.subtitle,
    color: '#777B75',
    textAlign: 'center',
    marginBottom: spacing.xl,
    paddingHorizontal: spacing.md,
  },
  unifiedCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: '#ECE9E2',
    marginBottom: spacing.xl,
  },
  propertyRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  propertyThumbnail: {
    width: 78,
    height: 78,
    borderRadius: 14,
    backgroundColor: colors.surface,
  },
  propertyInfo: {
    flex: 1,
    marginLeft: spacing.md,
    justifyContent: 'center',
  },
  propertyTitle: {
    fontFamily: 'serif',
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  locationText: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    marginLeft: 4,
  },
  propertyPrice: {
    fontFamily: 'serif',
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  cardDivider: {
    height: 1,
    backgroundColor: '#ECE9E2',
    marginVertical: spacing.md,
  },
  visitorSection: {
    paddingTop: 2,
  },
  visitorSectionTitle: {
    fontFamily: 'serif',
    fontSize: 15,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: spacing.md,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  iconContainer: {
    width: 22,
    marginRight: spacing.md,
    alignItems: 'center',
  },
  detailText: {
    ...typography.body,
    fontSize: 14,
    color: '#252823',
    flex: 1,
  },
  disclaimerBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
    paddingHorizontal: spacing.sm,
    marginBottom: spacing.xl,
  },
  disclaimerIcon: {
    fontSize: 16,
    color: colors.textSecondary,
    marginRight: spacing.sm,
  },
  disclaimerText: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    flex: 1,
    lineHeight: 18,
  },
  actionButtons: {
    marginTop: spacing.sm,
  },
  primaryButton: {
    marginBottom: spacing.md,
  },
  secondaryButton: {
    backgroundColor: '#FFFFFF',
    borderColor: '#D8D4CA',
  },
});

