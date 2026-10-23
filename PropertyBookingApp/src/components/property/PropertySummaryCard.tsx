import React from 'react';
import { View, Text, Image, StyleSheet, ViewStyle } from 'react-native';
import { PropertySummary } from '../../types/booking';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { borderRadius, spacing } from '../../theme/spacing';
import { shadows } from '../../theme/shadows';
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
    <View style={[styles.card, shadows.card, style]}>
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
          <Icons.Pin size={13} color={colors.textSecondary} />
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
    borderRadius: 20,
    padding: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ECE9E2',
    marginBottom: spacing.xl,
  },
  thumbnail: {
    width: 82,
    height: 82,
    borderRadius: 16,
    backgroundColor: colors.surface,
  },
  info: {
    flex: 1,
    marginLeft: spacing.md,
    justifyContent: 'center',
  },
  title: {
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
  price: {
    fontFamily: 'serif',
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1A1A',
  },
});
