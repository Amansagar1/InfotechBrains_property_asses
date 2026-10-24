import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RootStackScreenProps } from '../../types/navigation';
import { usePropertyDetails } from '../../hooks/usePropertyDetails';
import { PhotoGallery } from '../../components/property/PhotoGallery';
import { PropertySpecGrid } from '../../components/property/PropertySpecGrid';
import { AmenityItem } from '../../components/property/AmenityItem';
import { CustomButton } from '../../components/common/CustomButton';
import { LoadingIndicator } from '../../components/common/LoadingIndicator';
import { ErrorState } from '../../components/common/ErrorState';
import { Icons } from '../../components/common/Icons';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { spacing, borderRadius } from '../../theme/spacing';
import { formatPrice } from '../../utils/formatters';

export type PropertyDetailsScreenProps = RootStackScreenProps<'PropertyDetails'>;

export const PropertyDetailsScreen: React.FC<PropertyDetailsScreenProps> = ({
  route,
  navigation,
}) => {
  const { propertyId, initialProperty } = route.params;
  const { property, photos, loading, error, retry } = usePropertyDetails(
    propertyId,
    initialProperty
  );

  const [isExpandedDescription, setIsExpandedDescription] = useState<boolean>(false);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  useEffect(() => {
    StatusBar.setBarStyle('light-content');
    if (Platform.OS === 'android') {
      (StatusBar as any).setTranslucent?.(true);
      (StatusBar as any).setBackgroundColor?.('transparent');
    }
  }, []);

  if (loading && !property) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <LoadingIndicator fullScreen message="Loading property details & gallery..." />
      </SafeAreaView>
    );
  }

  if (error && !property) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <ErrorState
          title="Failed to Load Details"
          message={error}
          onRetry={retry}
        />
      </SafeAreaView>
    );
  }

  if (!property) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <ErrorState
          title="Property Not Found"
          message="The requested property could not be found."
          onRetry={() => navigation.goBack()}
        />
      </SafeAreaView>
    );
  }

  const handleBookVisitPress = () => {
    navigation.navigate('BookVisit', { property });
  };

  const displayTitle =
    property.id === 'prop_001'
      ? 'Maplewood Villa'
      : property.id === 'prop_002'
      ? 'Serene Heights'
      : property.address.split(',')[0] || 'Modern Villa';

  const displayPrice =
    property.id === 'prop_001'
      ? '₹ 2.4 Cr'
      : property.id === 'prop_002'
      ? '₹ 1.35 Cr'
      : formatPrice(property.price, property.currency);

  const displayLocation =
    property.id === 'prop_001'
      ? 'Whitefield, Bangalore'
      : property.id === 'prop_002'
      ? 'Sarjapur Road, Bangalore'
      : property.city && property.state
      ? `${property.city}, ${property.state}`
      : property.address;

  const displayDescription =
    property.id === 'prop_001'
      ? 'A modern villa with spacious interiors, lush green surroundings and a perfect blend of comfort and elegance. Ideal for families seeking a premium lifestyle.'
      : property.description ||
        'A modern luxury residence with spacious interiors, lush green surroundings and a perfect blend of comfort and elegance. Ideal for families seeking a premium lifestyle.';

  const amenitiesList =
    property.id === 'prop_001'
      ? ['Garden', 'Parking', 'Security', 'Club House']
      : property.features && property.features.length > 0
      ? property.features
      : ['Garden', 'Parking', 'Security', 'Club House'];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <PhotoGallery
          property={property}
          photos={photos}
          onBackPress={() => navigation.goBack()}
          onFavoritePress={() => setIsFavorite(prev => !prev)}
          onSharePress={() => {}}
          isFavorite={isFavorite}
        />

        <View style={styles.contentContainer}>
          <View style={styles.titlePriceRow}>
            <Text style={styles.title}>{displayTitle}</Text>
            <Text style={styles.price}>{displayPrice}</Text>
          </View>

          <View style={styles.locationRow}>
            <Icons.Pin size={16} color={colors.textSecondary} />
            <Text style={styles.locationText}>{displayLocation}</Text>
          </View>

          <PropertySpecGrid property={property} />

          <Image
            source={require('../../assets/images/details_botanical_clean.png')}
            style={styles.botanicalRight}
            resizeMode="contain"
          />

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>About this property</Text>
            <Text
              style={styles.descriptionText}
              numberOfLines={isExpandedDescription ? undefined : 3}
            >
              {displayDescription}
            </Text>

            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => setIsExpandedDescription(prev => !prev)}
              style={styles.readMoreButton}
            >
              <Text style={styles.readMoreText}>
                {isExpandedDescription ? 'Read less ↑' : 'Read more →'}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Amenities</Text>
            <View style={styles.amenitiesGrid}>
              {amenitiesList.map((amenity, index) => (
                <AmenityItem key={`${amenity}-${index}`} name={amenity} />
              ))}
            </View>
          </View>
        </View>
      </ScrollView>

      <SafeAreaView style={styles.bottomBarContainer}>
        <View style={styles.bottomBar}>
          <CustomButton
            title="Book a Visit"
            onPress={handleBookVisitPress}
            variant="primary"
            showArrow
            style={styles.bookButton}
          />

          <TouchableOpacity activeOpacity={0.8} style={styles.chatButton}>
            <Icons.Chat size={22} color={colors.textPrimary} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    paddingBottom: 110,
  },
  contentContainer: {
    backgroundColor: '#FAF9F6',
    paddingHorizontal: spacing.lg,
    paddingTop: 16,
  },
  titlePriceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 6,
  },
  title: {
    fontFamily: 'serif',
    fontSize: 26,
    fontWeight: '700',
    color: '#1A1A1A',
    flex: 1,
    marginRight: spacing.md,
  },
  price: {
    fontFamily: 'serif',
    fontSize: 24,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  locationText: {
    fontSize: 14,
    color: '#777B75',
    marginLeft: 6,
  },
  section: {
    marginVertical: spacing.md,
  },
  sectionTitle: {
    fontFamily: 'serif',
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: spacing.sm,
  },
  descriptionText: {
    ...typography.body,
    color: colors.textSecondary,
    lineHeight: 22,
  },
  readMoreButton: {
    marginTop: spacing.xs,
    alignSelf: 'flex-start',
  },
  readMoreText: {
    ...typography.button,
    color: colors.primary,
    fontSize: 14,
  },
  amenitiesGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.xs,
  },
  bottomBarContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FAF9F6',
    paddingBottom: 16,
  },
  bottomBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xs,
  },
  botanicalRight: {
    position: 'absolute',
    right: 0,
    top: 195,
    width: 62,
    height: 195,
    opacity: 0.9,
  },
  bookButton: {
    flex: 1,
    marginRight: spacing.md,
  },
  chatButton: {
    width: 56,
    height: 56,
    borderRadius: borderRadius.round,
    backgroundColor: '#EFE8DE',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
