import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  Platform,
} from 'react-native';
import { Property } from '../../types/property';
import { colors } from '../../theme/colors';
import { typography, fontFamilies } from '../../theme/typography';
import { borderRadius, spacing } from '../../theme/spacing';
import { shadows } from '../../theme/shadows';
import {
  formatPrice,
  formatBeds,
  formatBaths,
  formatSqft,
  formatPropertyType,
} from '../../utils/formatters';
import { PropertyImage } from '../common/PropertyImage';
import { Icons } from '../common/Icons';
import { useApp } from '../../context/AppContext';

export interface PropertyCardProps {
  property: Property;
  onPress: () => void;
  style?: ViewStyle;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  onPress,
  style,
}) => {
  const { isSaved, toggleSave } = useApp();
  const isFavorite = isSaved(property.id);

  const displayTitle = property.address ? property.address.split(',')[0] : 'Property';
  const displayPrice = formatPrice(property.price, property.currency || 'USD');
  const displayLocation =
    property.city && property.state
      ? `${property.city}, ${property.state}`
      : property.address;
  const displayType = formatPropertyType(property.property_type);
  const displayBeds = formatBeds(property.beds);
  const displayBaths = formatBaths(property.baths);
  const displaySqft = formatSqft(property.sqft);

  return (
    <View style={[styles.card, shadows.card, style]}>
      <View style={styles.imageContainer}>
        <TouchableOpacity
          activeOpacity={0.92}
          onPress={onPress}
          style={styles.imageTouchable}
          accessibilityLabel={`View details for ${displayTitle}`}
        >
          <PropertyImage
            uri={property.photos?.[0]?.url}
            style={styles.image}
            propertyType={displayType}
          />

          <View style={styles.tagOverlay}>
            <View style={styles.typePill}>
              <Text style={styles.typePillText}>{displayType}</Text>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.75}
          onPress={() => toggleSave(property)}
          style={styles.favoriteButton}
          hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
          accessibilityRole="button"
          accessibilityLabel={isFavorite ? 'Remove from saved' : 'Save property'}
        >
          <Icons.Heart
            size={18}
            color={isFavorite ? colors.errorText : '#FFFFFF'}
            filled={isFavorite}
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        activeOpacity={0.92}
        onPress={onPress}
        style={styles.infoContainer}
      >
        <View style={styles.titlePriceRow}>
          <Text style={styles.title} numberOfLines={1}>
            {displayTitle}
          </Text>
          <Text style={styles.price}>{displayPrice}</Text>
        </View>

        <View style={styles.locationRow}>
          <Icons.Pin size={16} color={colors.textSecondary} />
          <Text style={styles.locationText} numberOfLines={1}>
            {displayLocation}
          </Text>
        </View>

        <View style={styles.specsRow}>
          <View style={styles.specsGroup}>
            <View style={styles.specItem}>
              <Icons.Bed size={17} color={colors.textSecondary} />
              <Text style={styles.specText}>{displayBeds}</Text>
            </View>

            <View style={styles.specItem}>
              <Icons.Bath size={17} color={colors.textSecondary} />
              <Text style={styles.specText}>{displayBaths}</Text>
            </View>

            <View style={styles.specItem}>
              <Icons.Sqft size={17} color={colors.textSecondary} />
              <Text style={styles.specText}>{displaySqft}</Text>
            </View>
          </View>

          <View style={styles.arrowButton}>
            <Icons.ArrowRight size={17} color="#FFFFFF" />
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: 24,
    overflow: 'hidden',
    marginBottom: spacing.xl,
    borderWidth: 1,
    borderColor: '#ECE9E2',
  },
  imageContainer: {
    height: 185,
    width: '100%',
    position: 'relative',
    backgroundColor: colors.surface,
  },
  imageTouchable: {
    width: '100%',
    height: '100%',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  tagOverlay: {
    position: 'absolute',
    bottom: 12,
    left: 12,
  },
  typePill: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 14,
    paddingVertical: 5,
    borderRadius: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  typePillText: {
    fontFamily: fontFamilies.bodySemiBold,
    fontSize: 12.5,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  favoriteButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 38,
    height: 38,
    borderRadius: borderRadius.round,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 20,
    elevation: 6,
  },
  infoContainer: {
    padding: spacing.lg,
  },
  titlePriceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 6,
  },
  title: {
    ...typography.h3,
    fontSize: 20,
    fontFamily: fontFamilies.heading,
    fontWeight: '600',
    color: colors.textPrimary,
    flex: 1,
    marginRight: spacing.sm,
  },
  price: {
    ...typography.priceCard,
    fontSize: 20,
    fontFamily: fontFamilies.heading,
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
    color: colors.textSecondary,
    fontSize: 14.5,
    lineHeight: 20,
    marginLeft: 6,
    flex: 1,
    fontWeight: '500',
  },
  specsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: spacing.xs,
  },
  specsGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  specItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: spacing.lg,
  },
  specText: {
    fontFamily: fontFamilies.bodyMedium,
    color: colors.textSecondary,
    marginLeft: 6,
    fontSize: 14,
    fontWeight: '500',
  },
  arrowButton: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.round,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
