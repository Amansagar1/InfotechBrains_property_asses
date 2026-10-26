import React from 'react';
import { View, Text, Image, StyleSheet, ViewStyle } from 'react-native';
import { PropertySummary } from '../../types/booking';
import { colors } from '../../theme/colors';
import { fontFamilies } from '../../theme/typography';
import { formatPrice } from '../../utils/formatters';
import { PropertyImage } from '../common/PropertyImage';
import { Icons } from '../common/Icons';

export interface PropertySummaryCardProps {
  property: PropertySummary;
  style?: ViewStyle;
}

export const PropertySummaryCard: React.FC<PropertySummaryCardProps> = ({
  property,
  style,
}) => {
  const displayTitle = property.address ? property.address.split(',')[0] : 'Property';
  const displayPrice = formatPrice(property.price, property.currency || 'USD');
  const locationText =
    property.city && property.state
      ? `${property.city}, ${property.state}`
      : property.address;

  return (
    <View style={[styles.card, style]}>
      <PropertyImage
        uri={property.imageUrl}
        style={styles.thumbnail}
      />

      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={1}>
          {displayTitle}
        </Text>

        <View style={styles.locationRow}>
          <Icons.Pin size={14} color={colors.textSecondary} />
          <Text style={styles.locationText} numberOfLines={1}>
            {locationText}
          </Text>
        </View>

        <Text style={styles.price}>{displayPrice}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ECE7DD',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 10,
    elevation: 3,
    marginBottom: 26,
  },
  thumbnail: {
    width: 96,
    height: 96,
    borderRadius: 18,
    backgroundColor: colors.surface,
  },
  info: {
    flex: 1,
    marginLeft: 16,
    justifyContent: 'center',
  },
  title: {
    fontFamily: fontFamilies.heading,
    fontSize: 19,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 6,
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
  price: {
    fontFamily: fontFamilies.heading,
    fontSize: 18,
    fontWeight: '600',
    color: colors.textPrimary,
  },
});
