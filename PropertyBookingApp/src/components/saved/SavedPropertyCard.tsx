import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import { SavedPropertyItem } from '../../constants/savedProperties';
import { Icons } from '../common/Icons';
import { fontFamilies } from '../../theme/typography';

export interface SavedPropertyCardProps {
  property: SavedPropertyItem;
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
  const isForSale = property.listingType === 'For Sale';

  return (
    <TouchableOpacity
      activeOpacity={0.92}
      onPress={onPress}
      style={[styles.card, style]}
    >
      {/* Property Image Container */}
      <View style={styles.imageContainer}>
        <Image
          source={property.localImage}
          style={styles.image}
          resizeMode="cover"
        />

        {/* Top Left Badge: For Sale / For Rent */}
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
            {property.listingType}
          </Text>
        </View>

        {/* Top Right Floating White Circle with Dark Green Heart */}
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

      {/* Property Information */}
      <View style={styles.infoContainer}>
        {/* Row 1: Title and Price */}
        <View style={styles.titlePriceRow}>
          <Text style={styles.title} numberOfLines={1}>
            {property.title}
          </Text>
          <Text style={styles.price}>{property.priceDisplay}</Text>
        </View>

        {/* Row 2: Location with Pin Icon */}
        <View style={styles.locationRow}>
          <Icons.Pin size={14} color="#6B7280" />
          <Text style={styles.locationText} numberOfLines={1}>
            {property.locationDisplay}
          </Text>
        </View>

        {/* Row 3: Specs (Beds, Baths, Sqft, Pipe Divider, Property Type) */}
        <View style={styles.specsRow}>
          <View style={styles.specItem}>
            <Icons.Bed size={16} color="#4B5563" />
            <Text style={styles.specText}>{property.beds} Beds</Text>
          </View>

          <View style={styles.specItem}>
            <Icons.Bath size={16} color="#4B5563" />
            <Text style={styles.specText}>{property.baths} Baths</Text>
          </View>

          <View style={styles.specItem}>
            <Icons.ExpandSquare size={14} color="#4B5563" />
            <Text style={styles.specText}>{property.sqftDisplay}</Text>
          </View>

          <View style={styles.pipeDivider} />

          <View style={styles.specItem}>
            <Icons.Home size={15} color="#4B5563" />
            <Text style={styles.specText}>{property.propertyTypeDisplay}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

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
    fontSize: 21,
    lineHeight: 26,
    fontWeight: '700',
    color: '#111827',
    flex: 1,
    marginRight: 8,
  },
  price: {
    fontFamily: fontFamilies.heading,
    fontSize: 21,
    lineHeight: 26,
    fontWeight: '700',
    color: '#0A4D3C',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 13,
  },
  locationText: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 5,
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
    fontSize: 13,
    color: '#374151',
    marginLeft: 5,
    fontWeight: '500',
  },
  pipeDivider: {
    width: 1,
    height: 13,
    backgroundColor: '#E5E7EB',
    marginRight: 12,
  },
});
