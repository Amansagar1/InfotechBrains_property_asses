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
  Share,
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
import { typography, fontFamilies } from '../../theme/typography';
import { spacing, borderRadius } from '../../theme/spacing';
import { formatPrice } from '../../utils/formatters';
import { useApp } from '../../context/AppContext';

export type PropertyDetailsScreenProps = RootStackScreenProps<'PropertyDetails'>;

export const PropertyDetailsScreen: React.FC<PropertyDetailsScreenProps> = ({
  route,
  navigation,
}) => {
  //-------------------- State & Hooks ----------------------
  const { propertyId, initialProperty } = route.params;
  const { property, photos, loading, error, retry } = usePropertyDetails(
    propertyId,
    initialProperty
  );

  const [isExpandedDescription, setIsExpandedDescription] = useState<boolean>(false);
  const { isSaved, toggleSave } = useApp();
  const isFavorite = property ? isSaved(property.id) : false;

  useEffect(() => {
    StatusBar.setBarStyle('light-content');
    if (Platform.OS === 'android') {
      (StatusBar as any).setTranslucent?.(true);
      (StatusBar as any).setBackgroundColor?.('transparent');
    }
  }, []);

  //-------------------- Loading & Error States ----------------------
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

  //-------------------- Handlers ----------------------
  const handleBookVisitPress = () => {
    navigation.navigate('BookVisit', { property });
  };

  const displayTitle = property.address ? property.address.split(',')[0] : 'Property Details';
  const displayPrice = formatPrice(property.price, property.currency || 'USD');
  const displayLocation = property.address;
  const displayDescription =
    property.description ||
    `${property.property_type ? property.property_type.replace(/_/g, ' ') : 'Property'} located at ${property.address}.`;

  const handleSharePress = async () => {
    if (!property) return;
    try {
      const shareUrl = photos.length > 0 ? photos[0].url : (property as any).featured_photo;
      await Share.share(
        {
          title: displayTitle,
          message: `Explore this stunning property: ${displayTitle}\n\n📍 Location: ${displayLocation}\n💰 Price: ${displayPrice}\n🏠 Type: ${(property.property_type || 'Property').replace(/_/g, ' ')}\n🛏️ Beds: ${property.beds} | 🛁 Baths: ${property.baths} | 📐 SqFt: ${property.sqft || 'Spacious'}\n\n${displayDescription}${shareUrl ? `\n\nPhoto: ${shareUrl}` : ''}`,
        },
        {
          dialogTitle: `Share ${displayTitle}`,
        }
      );
    } catch {}
  };

  const amenitiesList =
    property.features && property.features.length > 0
      ? property.features
      : [];

  //-------------------- Render ----------------------
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
          onFavoritePress={() => {
            if (property) toggleSave(property);
          }}
          onSharePress={handleSharePress}
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

            {displayDescription.length > 120 && (
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => setIsExpandedDescription(prev => !prev)}
                style={styles.readMoreButton}
              >
                <Text style={styles.readMoreText}>
                  {isExpandedDescription ? 'Read less ↑' : 'Read more →'}
                </Text>
              </TouchableOpacity>
            )}
          </View>

          {amenitiesList.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Amenities</Text>
              <View style={styles.amenitiesGrid}>
                {amenitiesList.map((amenity, index) => (
                  <AmenityItem key={`${amenity}-${index}`} name={amenity} />
                ))}
              </View>
            </View>
          )}

          {property.agent ? (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Listing Agent</Text>
              <View style={styles.agentCard}>
                <View style={styles.agentAvatar}>
                  <Icons.User size={22} color="#0F4A3E" />
                </View>
                <View style={styles.agentInfo}>
                  <Text style={styles.agentName}>{property.agent.name}</Text>
                  <Text style={styles.agentDetail}>{property.agent.email}</Text>
                  <Text style={styles.agentDetail}>{property.agent.phone}</Text>
                </View>
              </View>
            </View>
          ) : null}
        </View>
      </ScrollView>

      <SafeAreaView edges={['bottom']} style={styles.bottomBarContainer}>
        <View style={styles.bottomBar}>
          <CustomButton
            title="Book a Visit"
            onPress={handleBookVisitPress}
            variant="primary"
            showArrow
            style={styles.bookButton}
          />

          <TouchableOpacity activeOpacity={0.8} style={styles.chatButton}>
            <Icons.Chat size={20} color={colors.textPrimary} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
};

//-------------------- Styles ----------------------
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
    paddingBottom: 135,
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
    fontFamily: fontFamilies.heading,
    fontSize: 26,
    fontWeight: '600',
    color: colors.textPrimary,
    flex: 1,
    marginRight: spacing.md,
  },
  price: {
    fontFamily: fontFamilies.heading,
    fontSize: 24,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  locationText: {
    fontFamily: fontFamilies.bodyMedium,
    fontSize: 15,
    fontWeight: '500',
    color: colors.textSecondary,
    marginLeft: 6,
  },
  section: {
    marginVertical: spacing.md,
  },
  sectionTitle: {
    fontFamily: fontFamilies.heading,
    fontSize: 21,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  descriptionText: {
    fontFamily: fontFamilies.bodyMedium,
    fontSize: 15.5,
    color: colors.textSecondary,
    lineHeight: 24,
    fontWeight: '500',
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
    borderTopWidth: 1,
    borderTopColor: '#ECEAE4',
    paddingTop: 8,
    paddingBottom: Platform.OS === 'ios' ? 8 : 4,
  },
  bottomBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
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
    height: 48,
  },
  chatButton: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.round,
    backgroundColor: '#EFE8DE',
    justifyContent: 'center',
    alignItems: 'center',
  },
  agentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 14,
    borderWidth: 1,
    borderColor: '#ECEAE4',
    marginTop: 6,
    marginBottom: 8,
  },
  agentAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#EFECE6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  agentInfo: {
    flex: 1,
  },
  agentName: {
    fontFamily: fontFamilies.bodySemiBold,
    fontSize: 16,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 2,
  },
  agentDetail: {
    fontFamily: fontFamilies.bodyMedium,
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
    fontWeight: '500',
  },
});
