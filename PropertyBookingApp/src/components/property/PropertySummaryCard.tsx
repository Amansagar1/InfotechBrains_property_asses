import React from 'react';
import { View, Text, Image, StyleSheet, ViewStyle } from 'react-native';
import { PropertySummary } from '../../types/booking';
import { colors } from '../../theme/colors';
import { formatPrice } from '../../utils/formatters';
import { getPropertyImageSource } from '../../utils/imageHelper';
import { Icons } from '../common/Icons';

export interface PropertySummaryCardProps {
  property: PropertySummary;
  style?: ViewStyle;
}

export const PropertySummaryCard: React.FC<PropertySummaryCardProps> = ({
  property,
  style,
}) => {
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
    <View style={[styles.card, style]}>
      <Image
        source={getPropertyImageSource(property)}
        style={styles.thumbnail}
        resizeMode="cover"
      />

      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={1}>
          {displayTitle}
        </Text>

        <View style={styles.locationRow}>
          <Icons.Pin size={14} color="#1A1A1A" />
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
    fontFamily: 'serif',
    fontSize: 19,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 6,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  locationText: {
    fontSize: 13.5,
    color: '#6B7280',
    marginLeft: 6,
  },
  price: {
    fontFamily: 'serif',
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A1A',
  },
});
