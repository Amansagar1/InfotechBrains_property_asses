import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import { ScheduledVisit } from '../../types/visit';
import { Icons } from '../common/Icons';
import { PropertyImage } from '../common/PropertyImage';
import { fontFamilies } from '../../theme/typography';
import { colors } from '../../theme/colors';

export interface VisitCardProps {
  visit: ScheduledVisit;
  onPressDetails: () => void;
  onPressMore: () => void;
  style?: ViewStyle;
}

export const VisitCard: React.FC<VisitCardProps> = ({
  visit,
  onPressDetails,
  onPressMore,
  style,
}) => {
  const isUpcoming = visit.status === 'upcoming';
  const imageUrl = visit.property?.photos?.[0]?.url || (visit as any).imageUrl || '';

  return (
    <View style={[styles.card, style]}>
      <View style={styles.topRow}>
        <TouchableOpacity activeOpacity={0.9} onPress={onPressDetails}>
          <PropertyImage
            uri={imageUrl}
            style={styles.propertyThumb}
          />
        </TouchableOpacity>

        <View style={styles.middleColumn}>
          <View
            style={[
              styles.statusBadge,
              isUpcoming ? styles.statusBadgeUpcoming : styles.statusBadgeCompleted,
            ]}
          >
            <Text
              style={[
                styles.statusText,
                isUpcoming ? styles.statusTextUpcoming : styles.statusTextCompleted,
              ]}
            >
              {isUpcoming ? 'Upcoming' : 'Completed'}
            </Text>
          </View>

          <TouchableOpacity activeOpacity={0.8} onPress={onPressDetails}>
            <Text style={styles.title} numberOfLines={1}>
              {visit.title}
            </Text>
          </TouchableOpacity>

          <View style={styles.locationRow}>
            <Icons.Pin size={14} color={colors.textSecondary} />
            <Text style={styles.locationText} numberOfLines={1}>
              {visit.location}
            </Text>
          </View>

          <View style={styles.priceRow}>
            <Text style={styles.priceText}>{visit.priceDisplay}</Text>
            {visit.priceSuffix && (
              <Text style={styles.priceSuffixText}>{visit.priceSuffix}</Text>
            )}
          </View>

          <View style={styles.specsRow}>
            <View style={styles.specItem}>
              <Icons.Bed size={15} color={colors.textSecondary} />
              <Text style={styles.specText}>{visit.beds} Beds</Text>
            </View>

            <View style={styles.specItem}>
              <Icons.Bath size={15} color={colors.textSecondary} />
              <Text style={styles.specText}>{visit.baths} Baths</Text>
            </View>

            <View style={styles.specItem}>
              <Icons.ExpandSquare size={13} color={colors.textSecondary} />
              <Text style={styles.specText}>{visit.sqftDisplay}</Text>
            </View>
          </View>
        </View>

        <View style={styles.dateBadge}>
          <Text style={styles.dateDay}>{visit.day}</Text>
          <Text style={styles.dateMonth}>{visit.month}</Text>
          <Text style={styles.dateYear}>{visit.year}</Text>
        </View>
      </View>

      <View style={styles.bottomRow}>
        <View style={styles.timePill}>
          <Icons.Clock size={13} color="#111827" />
          <Text style={styles.timeText} numberOfLines={1}>
            {visit.timeSlot}
          </Text>
        </View>

        <TouchableOpacity
          activeOpacity={0.85}
          onPress={onPressDetails}
          style={styles.detailsButton}
        >
          <Text style={styles.detailsButtonText}>View Details</Text>
          <Icons.ArrowRight size={13} color="#111827" />
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.75}
          onPress={onPressMore}
          style={styles.moreButton}
          hitSlop={{ top: 14, bottom: 14, left: 14, right: 14 }}
        >
          <Icons.MoreVertical size={16} color="#111827" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

//-------------------- Styles ----------------------
const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    borderWidth: 1,
    borderColor: '#ECEAE4',
    marginBottom: 16,
    padding: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  propertyThumb: {
    width: 104,
    height: 118,
    borderRadius: 16,
    backgroundColor: '#EBE8E1',
  },
  middleColumn: {
    flex: 1,
    marginLeft: 12,
    marginRight: 6,
  },
  statusBadge: {
    paddingHorizontal: 9,
    paddingVertical: 3,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginBottom: 3,
  },
  statusBadgeUpcoming: {
    backgroundColor: '#FEF3C7',
  },
  statusBadgeCompleted: {
    backgroundColor: '#D1FAE5',
  },
  statusText: {
    fontSize: 11,
    fontWeight: '600',
  },
  statusTextUpcoming: {
    color: '#92400E',
  },
  statusTextCompleted: {
    color: '#065F46',
  },
  title: {
    fontFamily: fontFamilies.heading,
    fontSize: 18,
    lineHeight: 22,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 2,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  locationText: {
    fontFamily: fontFamilies.bodyMedium,
    fontSize: 13.5,
    color: colors.textSecondary,
    fontWeight: '500',
    marginLeft: 4,
    flex: 1,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 5,
  },
  priceText: {
    fontFamily: fontFamilies.heading,
    fontSize: 17,
    lineHeight: 22,
    fontWeight: '600',
    color: colors.primary,
  },
  priceSuffixText: {
    fontFamily: fontFamilies.bodyMedium,
    fontSize: 13,
    color: colors.textSecondary,
    marginLeft: 2,
    fontWeight: '500',
  },
  specsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'nowrap',
  },
  specItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 8,
  },
  specText: {
    fontFamily: fontFamilies.bodyMedium,
    fontSize: 12.5,
    color: colors.textSecondary,
    marginLeft: 4,
    fontWeight: '500',
  },
  dateBadge: {
    width: 48,
    height: 56,
    borderRadius: 14,
    backgroundColor: '#FAF9F6',
    borderWidth: 1,
    borderColor: '#ECEAE4',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
  },
  dateDay: {
    fontFamily: fontFamilies.headingSemiBold,
    fontSize: 18,
    lineHeight: 22,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  dateMonth: {
    fontFamily: fontFamilies.bodySemiBold,
    fontSize: 10,
    fontWeight: '600',
    color: colors.textSecondary,
    letterSpacing: 0.5,
  },
  dateYear: {
    fontFamily: fontFamilies.bodyMedium,
    fontSize: 9.5,
    fontWeight: '500',
    color: colors.textTertiary,
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    gap: 8,
  },
  timePill: {
    flex: 1,
    backgroundColor: '#FAF9F6',
    borderWidth: 1,
    borderColor: '#ECEAE4',
    borderRadius: 20,
    paddingHorizontal: 11,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  timeText: {
    fontFamily: fontFamilies.bodyMedium,
    fontSize: 12.5,
    fontWeight: '500',
    color: colors.textPrimary,
  },
  detailsButton: {
    borderWidth: 1.2,
    borderColor: '#000000',
    borderRadius: 20,
    paddingHorizontal: 13,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: '#FFFFFF',
  },
  detailsButtonText: {
    fontFamily: fontFamilies.bodySemiBold,
    fontSize: 12.5,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  moreButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FAF9F6',
    borderWidth: 1,
    borderColor: '#ECEAE4',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
