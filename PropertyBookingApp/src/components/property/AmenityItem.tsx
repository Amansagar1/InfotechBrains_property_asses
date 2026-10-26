import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';
import { fontFamilies } from '../../theme/typography';
import { Icons } from '../common/Icons';

export interface AmenityItemProps {
  name: string;
}

export const AmenityItem: React.FC<AmenityItemProps> = ({ name }) => {
  const getAmenityIcon = (label: string) => {
    const lower = label.toLowerCase();
    if (lower.includes('garden') || lower.includes('yard')) {
      return <Icons.Garden size={23} color={colors.primary} />;
    }
    if (lower.includes('parking') || lower.includes('garage')) {
      return <Icons.Parking size={23} color={colors.primary} />;
    }
    if (lower.includes('security')) {
      return <Icons.Security size={23} color={colors.primary} />;
    }
    if (lower.includes('club') || lower.includes('house')) {
      return <Icons.ClubHouse size={23} color={colors.primary} />;
    }
    return <Icons.Home size={23} color={colors.primary} />;
  };

  const formatAmenityName = (str: string) => {
    return str
      .replace(/_/g, ' ')
      .split(' ')
      .map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
      .join(' ');
  };

  return (
    <View style={styles.container}>
      <View style={styles.iconBox}>{getAmenityIcon(name)}</View>
      <Text style={styles.name} numberOfLines={1}>
        {formatAmenityName(name)}
      </Text>
    </View>
  );
};

//-------------------- Styles ----------------------
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  iconBox: {
    width: '100%',
    height: 72,
    borderRadius: 18,
    backgroundColor: '#ECE8DF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    fontFamily: fontFamilies.bodyMedium,
    color: colors.textPrimary,
    marginTop: 6,
    textAlign: 'center',
    fontSize: 13,
    fontWeight: '600',
  },
});
