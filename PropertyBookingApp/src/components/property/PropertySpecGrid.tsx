import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Property } from '../../types/property';
import { colors } from '../../theme/colors';
import { fontFamilies } from '../../theme/typography';
import { spacing } from '../../theme/spacing';
import { formatBeds, formatBaths, formatSqft, formatPropertyType } from '../../utils/formatters';
import { Icons } from '../common/Icons';

export interface PropertySpecGridProps {
  property: Property;
}

export const PropertySpecGrid: React.FC<PropertySpecGridProps> = ({ property }) => {
  const bedsText = formatBeds(property.beds);
  const bathsText = formatBaths(property.baths);
  const sqftText = formatSqft(property.sqft);
  const typeText = formatPropertyType(property.property_type);

  return (
    <View style={styles.gridContainer}>
      <View style={styles.specBox}>
        <Icons.Bed size={22} color={colors.primary} />
        <Text style={styles.specValue}>{bedsText}</Text>
      </View>

      <View style={styles.specBox}>
        <Icons.Bath size={22} color={colors.primary} />
        <Text style={styles.specValue}>{bathsText}</Text>
      </View>

      <View style={styles.specBox}>
        <Icons.Sqft size={22} color={colors.primary} />
        <Text style={styles.specValue}>{sqftText}</Text>
      </View>

      <View style={styles.specBox}>
        <Icons.Home size={22} color={colors.primary} />
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
    backgroundColor: '#ECE8DF',
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 4,
    padding: spacing.xs,
  },
  specValue: {
    fontFamily: fontFamilies.bodyMedium,
    fontSize: 13.5,
    fontWeight: '600',
    color: colors.textPrimary,
    marginTop: 6,
    textAlign: 'center',
  },
});
