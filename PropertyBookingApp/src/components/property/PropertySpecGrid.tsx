import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Property } from '../../types/property';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { formatBeds, formatBaths, formatSqft, formatPropertyType } from '../../utils/formatters';
import { Icons } from '../common/Icons';

export interface PropertySpecGridProps {
  property: Property;
}

export const PropertySpecGrid: React.FC<PropertySpecGridProps> = ({ property }) => {
  const bedsText = property.id === 'prop_001' ? '4 Beds' : formatBeds(property.beds);
  const bathsText = property.id === 'prop_001' ? '3 Baths' : formatBaths(property.baths);
  const sqftText = property.id === 'prop_001' ? '2,400 sqft' : formatSqft(property.sqft);
  const typeText =
    property.id === 'prop_001'
      ? 'Villa'
      : formatPropertyType(property.property_type);

  return (
    <View style={styles.gridContainer}>
      <View style={styles.specBox}>
        <Icons.Bed size={22} color={colors.textPrimary} />
        <Text style={styles.specValue}>{bedsText}</Text>
      </View>

      <View style={styles.specBox}>
        <Icons.Bath size={22} color={colors.textPrimary} />
        <Text style={styles.specValue}>{bathsText}</Text>
      </View>

      <View style={styles.specBox}>
        <Icons.Sqft size={22} color={colors.textPrimary} />
        <Text style={styles.specValue}>{sqftText}</Text>
      </View>

      <View style={styles.specBox}>
        <Icons.Home size={22} color={colors.textPrimary} />
        <Text style={styles.specValue} numberOfLines={1}>
          {typeText}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  gridContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: spacing.lg,
  },
  specBox: {
    flex: 1,
    height: 78,
    backgroundColor: '#EFECE6',
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 4,
    padding: spacing.xs,
  },
  specValue: {
    fontSize: 12,
    fontWeight: '600',
    color: '#252823',
    marginTop: 6,
    textAlign: 'center',
  },
});
