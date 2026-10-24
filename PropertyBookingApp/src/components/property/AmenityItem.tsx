import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { Icons } from '../common/Icons';

export interface AmenityItemProps {
  name: string;
}

export const AmenityItem: React.FC<AmenityItemProps> = ({ name }) => {
  const getAmenityIcon = (label: string) => {
    const lower = label.toLowerCase();
    if (lower.includes('garden') || lower.includes('yard')) {
      return <Icons.Garden size={22} color={colors.textPrimary} />;
    }
    if (lower.includes('parking') || lower.includes('garage')) {
      return <Icons.Parking size={22} color={colors.textPrimary} />;
    }
    if (lower.includes('security')) {
      return <Icons.Security size={22} color={colors.textPrimary} />;
    }
    if (lower.includes('club') || lower.includes('house')) {
      return <Icons.ClubHouse size={22} color={colors.textPrimary} />;
    }
    // Default
    return <Icons.Home size={22} color={colors.textPrimary} />;
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
    backgroundColor: '#EFECE6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    ...typography.bodySmall,
    color: '#252823',
    marginTop: 6,
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '500',
  },
});
