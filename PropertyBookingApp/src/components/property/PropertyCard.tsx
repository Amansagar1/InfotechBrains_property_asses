import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import { Property } from '../../types/property';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { borderRadius, spacing } from '../../theme/spacing';
import { shadows } from '../../theme/shadows';
import {
  formatPrice,
  formatBeds,
  formatBaths,
  formatSqft,
  formatPropertyType,
} from '../../utils/formatters';
import { getPropertyImageSource } from '../../utils/imageHelper';
import { Icons } from '../common/Icons';

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
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  const displayTitle =
    property.id === 'prop_001'
      ? 'Maplewood Villa'
      : property.id === 'prop_002'
      ? 'Serene Heights'
      : property.address.split(',')[0] || 'Modern Residence';

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

  const displayType =
    property.id === 'prop_001'
      ? 'Villa'
      : property.id === 'prop_002'
      ? 'Apartment'
      : formatPropertyType(property.property_type);

  const displayBeds =
    property.id === 'prop_001'
      ? '4 Beds'
      : property.id === 'prop_002'
      ? '3 Beds'
      : formatBeds(property.beds);

  const displayBaths =
    property.id === 'prop_001'
      ? '3 Baths'
      : property.id === 'prop_002'
      ? '2 Baths'
      : formatBaths(property.baths);

  const displaySqft =
    property.id === 'prop_001'
      ? '2,400 sqft'
      : property.id === 'prop_002'
      ? '1,600 sqft'
      : formatSqft(property.sqft);

  return (
    <TouchableOpacity
      activeOpacity={0.92}
      onPress={onPress}
      style={[styles.card, shadows.card, style]}
    >
      <View style={styles.imageContainer}>
        <Image
          source={getPropertyImageSource(property)}
          style={styles.image}
          resizeMode="cover"
        />

        <View style={styles.tagOverlay}>
          <View style={styles.typePill}>
            <Text style={styles.typePillText}>{displayType}</Text>
          </View>
        </View>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => setIsFavorite(prev => !prev)}
          style={styles.favoriteButton}
        >
          <Icons.Heart
            size={18}
            color={isFavorite ? colors.errorText : '#FFFFFF'}
            filled={isFavorite}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.infoContainer}>
        <View style={styles.titlePriceRow}>
          <Text style={styles.title} numberOfLines={1}>
            {displayTitle}
          </Text>
          <Text style={styles.price}>{displayPrice}</Text>
        </View>

        <View style={styles.locationRow}>
          <Icons.Pin size={14} color={colors.textSecondary} />
          <Text style={styles.locationText} numberOfLines={1}>
            {displayLocation}
          </Text>
        </View>

        <View style={styles.specsRow}>
          <View style={styles.specsGroup}>
            <View style={styles.specItem}>
              <Icons.Bed size={16} color={colors.textSecondary} />
              <Text style={styles.specText}>{displayBeds}</Text>
            </View>

            <View style={styles.specItem}>
              <Icons.Bath size={16} color={colors.textSecondary} />
              <Text style={styles.specText}>{displayBaths}</Text>
            </View>

            <View style={styles.specItem}>
              <Icons.Sqft size={16} color={colors.textSecondary} />
              <Text style={styles.specText}>{displaySqft}</Text>
            </View>
          </View>

          <TouchableOpacity
            activeOpacity={0.85}
            onPress={onPress}
            style={styles.arrowButton}
          >
            <Icons.ArrowRight size={16} color={colors.textLight} />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
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
    fontSize: 12,
    fontWeight: '600',
    color: '#252823',
  },
  favoriteButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 36,
    height: 36,
    borderRadius: borderRadius.round,
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoContainer: {
    padding: spacing.lg,
  },
  titlePriceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 4,
  },
  title: {
    ...typography.h3,
    fontSize: 18,
    fontFamily: 'serif',
    color: '#1A1A1A',
    flex: 1,
    marginRight: spacing.sm,
  },
  price: {
    ...typography.priceCard,
    fontSize: 18,
    fontFamily: 'serif',
    fontWeight: '700',
    color: '#1A1A1A',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  locationText: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    marginLeft: 4,
    flex: 1,
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
    ...typography.bodySmall,
    color: colors.textSecondary,
    marginLeft: 6,
    fontSize: 13,
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
