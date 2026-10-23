import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { BookingFormData } from '../../types/booking';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { borderRadius, spacing } from '../../theme/spacing';
import { shadows } from '../../theme/shadows';
import { formatDate } from '../../utils/formatters';
import { Icons } from '../common/Icons';

export interface VisitorDetailsCardProps {
  visitor: BookingFormData;
  style?: ViewStyle;
}

export const VisitorDetailsCard: React.FC<VisitorDetailsCardProps> = ({
  visitor,
  style,
}) => {
  return (
    <View style={[styles.card, shadows.card, style]}>
      <Text style={styles.title}>Visitor Details</Text>

      <View style={styles.detailRow}>
        <View style={styles.iconContainer}>
          <Icons.User size={18} color={colors.textSecondary} />
        </View>
        <Text style={styles.detailText}>{visitor.visitorName}</Text>
      </View>

      <View style={styles.detailRow}>
        <View style={styles.iconContainer}>
          <Icons.Mail size={18} color={colors.textSecondary} />
        </View>
        <Text style={styles.detailText}>{visitor.email}</Text>
      </View>

      <View style={styles.detailRow}>
        <View style={styles.iconContainer}>
          <Icons.Phone size={18} color={colors.textSecondary} />
        </View>
        <Text style={styles.detailText}>
          {visitor.countryCode} {visitor.contactNumber}
        </Text>
      </View>

      <View style={styles.detailRow}>
        <View style={styles.iconContainer}>
          <Icons.Calendar size={18} color={colors.textSecondary} />
        </View>
        <Text style={styles.detailText}>{formatDate(visitor.preferredDate)}</Text>
      </View>

      <View style={styles.detailRow}>
        <View style={styles.iconContainer}>
          <Icons.Clock size={18} color={colors.textSecondary} />
        </View>
        <Text style={styles.detailText}>{visitor.preferredTimeSlot}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: borderRadius.xxl,
    padding: spacing.xl,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    marginBottom: spacing.xl,
  },
  title: {
    fontFamily: 'serif',
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: spacing.lg,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  iconContainer: {
    width: 24,
    marginRight: spacing.md,
    alignItems: 'center',
  },
  detailText: {
    ...typography.body,
    color: colors.textPrimary,
    flex: 1,
  },
});
