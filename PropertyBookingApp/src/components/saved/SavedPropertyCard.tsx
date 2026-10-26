import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import { Property } from '../../types/property';
import { Icons } from '../common/Icons';
import { PropertyImage } from '../common/PropertyImage';
import { formatPrice, formatBeds, formatBaths, formatSqft, formatPropertyType } from '../../utils/formatters';
import { fontFamilies } from '../../theme/typography';
import { colors } from '../../theme/colors';

export interface SavedPropertyCardProps {
  property: Property;
  isSaved?: boolean;
  onPress: () => void;
  onToggleSave: () => void;
  style?: ViewStyle;
}

export const SavedPropertyCard: React.FC<SavedPropertyCardProps> = ({
  property,
  isSaved = true,
  onPress,
  onToggleSave,
  style,
}) => {
  const isForSale = property.type === 'sale';
  const displayTitle = property.address ? property.address.split(',')[0] : 'Property';
  const displayPrice = formatPrice(property.price, property.currency || 'USD');
  const displayLocation =
    property.city && property.state
      ? `${property.city}, ${property.state}`
      : property.address;
  const displayType = formatPropertyType(property.property_type);

  return (
    <TouchableOpacity
      activeOpacity={0.92}
      onPress={onPress}
      style={[styles.card, style]}
    >
      <View style={styles.imageContainer}>
        <PropertyImage
          uri={property.photos?.[0]?.url}
          style={styles.image}
          propertyType={displayType}
        />

        <View
          style={[
            styles.badgePill,
            isForSale ? styles.badgeForSale : styles.badgeForRent,
          ]}
        >
          <Text
            style={[
              styles.badgeText,
              isForSale ? styles.badgeTextForSale : styles.badgeTextForRent,
            ]}
          >
            {isForSale ? 'For Sale' : 'For Rent'}
          </Text>
        </View>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={onToggleSave}
          style={styles.favoriteButton}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Icons.Heart
            size={19}
            color={isSaved ? '#0A3B32' : '#9CA3AF'}
            filled={isSaved}
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
          <Icons.Pin size={16} color={colors.textSecondary} />
          <Text style={styles.locationText} numberOfLines={1}>
            {displayLocation}
          </Text>
        </View>

        <View style={styles.specsRow}>
          <View style={styles.specItem}>
            <Icons.Bed size={16} color={colors.textSecondary} />
            <Text style={styles.specText}>{formatBeds(property.beds)}</Text>
          </View>

          <View style={styles.specItem}>
            <Icons.Bath size={16} color={colors.textSecondary} />
            <Text style={styles.specText}>{formatBaths(property.baths)}</Text>
          </View>

          <View style={styles.specItem}>
            <Icons.ExpandSquare size={14} color={colors.textSecondary} />
            <Text style={styles.specText}>{formatSqft(property.sqft)}</Text>
          </View>

          <View style={styles.pipeDivider} />

          <View style={styles.specItem}>
            <Icons.Home size={15} color={colors.textSecondary} />
            <Text style={styles.specText}>{displayType}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

//-------------------- Styles ----------------------
const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    overflow: 'hidden',
    marginBottom: 18,
    borderWidth: 1,
    borderColor: '#ECEAE4',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  imageContainer: {
    height: 195,
    width: '100%',
    position: 'relative',
    backgroundColor: '#EBE8E1',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  badgePill: {
    position: 'absolute',
    top: 13,
    left: 13,
    paddingHorizontal: 13,
    paddingVertical: 5,
    borderRadius: 18,
  },
  badgeForSale: {
    backgroundColor: '#0F766E',
  },
  badgeForRent: {
    backgroundColor: '#FEF3C7',
  },
  badgeText: {
    fontSize: 12.5,
    fontWeight: '600',
    letterSpacing: 0.2,
  },
  badgeTextForSale: {
    color: '#FFFFFF',
  },
  badgeTextForRent: {
    color: '#1C1917',
  },
  favoriteButton: {
    position: 'absolute',
    top: 13,
    right: 13,
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 5,
    elevation: 3,
  },
  infoContainer: {
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 16,
  },
  titlePriceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 5,
  },
  title: {
    fontFamily: fontFamilies.heading,
    fontSize: 20,
    lineHeight: 25,
    fontWeight: '600',
    color: colors.textPrimary,
    flex: 1,
    marginRight: 8,
  },
  price: {
    fontFamily: fontFamilies.heading,
    fontSize: 20,
    lineHeight: 25,
    fontWeight: '600',
    color: colors.primary,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 13,
  },
  locationText: {
    fontFamily: fontFamilies.bodyMedium,
    fontSize: 14,
    color: colors.textSecondary,
    fontWeight: '500',
    marginLeft: 6,
    flex: 1,
  },
  specsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'nowrap',
  },
  specItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },
  specText: {
    fontFamily: fontFamilies.bodyMedium,
    fontSize: 13.5,
    color: colors.textSecondary,
    marginLeft: 6,
    fontWeight: '500',
  },
  pipeDivider: {
    width: 1,
    height: 13,
    backgroundColor: '#E5E7EB',
    marginRight: 12,
  },
});
