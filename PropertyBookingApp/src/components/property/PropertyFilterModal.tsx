import React, { useState, useEffect, useMemo } from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  Dimensions,
  Platform,
} from 'react-native';
import { Property } from '../../types/property';
import { colors } from '../../theme/colors';
import { fontFamilies, typography } from '../../theme/typography';
import { borderRadius, spacing } from '../../theme/spacing';
import { Icons } from '../common/Icons';

export type SortOption =
  | 'featured'
  | 'price_asc'
  | 'price_desc'
  | 'sqft_desc'
  | 'beds_desc';

export interface FilterState {
  sortBy: SortOption;
  minPrice: number | null;
  maxPrice: number | null;
  minBeds: number | null;
  minBaths: number | null;
  propertyType: string;
}

export const INITIAL_FILTERS: FilterState = {
  sortBy: 'featured',
  minPrice: null,
  maxPrice: null,
  minBeds: null,
  minBaths: null,
  propertyType: 'All',
};

export interface PropertyFilterModalProps {
  visible: boolean;
  onClose: () => void;
  filters: FilterState;
  onApplyFilters: (filters: FilterState) => void;
  allProperties: Property[];
  searchQuery?: string;
}

const PRICE_PRESETS: { label: string; min: number | null; max: number | null }[] = [
  { label: 'Any', min: null, max: null },
  { label: '< $250k', min: null, max: 250000 },
  { label: '$250k - $500k', min: 250000, max: 500000 },
  { label: '$500k - $750k', min: 500000, max: 750000 },
  { label: '$750k+', min: 750000, max: null },
];

const BED_OPTIONS = [
  { label: 'Any', value: null },
  { label: '1+', value: 1 },
  { label: '2+', value: 2 },
  { label: '3+', value: 3 },
  { label: '4+', value: 4 },
  { label: '5+', value: 5 },
];

const BATH_OPTIONS = [
  { label: 'Any', value: null },
  { label: '1+', value: 1 },
  { label: '2+', value: 2 },
  { label: '3+', value: 3 },
  { label: '4+', value: 4 },
];

const SORT_OPTIONS: { id: SortOption; label: string }[] = [
  { id: 'featured', label: 'Featured / Recommended' },
  { id: 'price_asc', label: 'Price: Low to High' },
  { id: 'price_desc', label: 'Price: High to Low' },
  { id: 'sqft_desc', label: 'Size: Largest First' },
  { id: 'beds_desc', label: 'Bedrooms: Most First' },
];

const PROPERTY_TYPES = [
  'All',
  'Single Family',
  'Condo',
  'Townhome',
  'Apartment',
  'Villa',
  'Land',
];

export const PropertyFilterModal: React.FC<PropertyFilterModalProps> = ({
  visible,
  onClose,
  filters,
  onApplyFilters,
  allProperties,
  searchQuery = '',
}) => {
  const [draft, setDraft] = useState<FilterState>(filters);
  const [minPriceInput, setMinPriceInput] = useState<string>(
    filters.minPrice ? String(filters.minPrice) : ''
  );
  const [maxPriceInput, setMaxPriceInput] = useState<string>(
    filters.maxPrice ? String(filters.maxPrice) : ''
  );

  useEffect(() => {
    if (visible) {
      setDraft(filters);
      setMinPriceInput(filters.minPrice ? String(filters.minPrice) : '');
      setMaxPriceInput(filters.maxPrice ? String(filters.maxPrice) : '');
    }
  }, [visible, filters]);

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (draft.sortBy !== 'featured') count++;
    if (draft.minPrice !== null || draft.maxPrice !== null) count++;
    if (draft.minBeds !== null) count++;
    if (draft.minBaths !== null) count++;
    if (draft.propertyType !== 'All') count++;
    return count;
  }, [draft]);

  const matchingCount = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    const queryTokens = query.split(/\s+/).filter(Boolean);

    return allProperties.filter(item => {
      if (queryTokens.length > 0) {
        const itemText = `${item.address} ${item.city} ${item.state} ${item.property_type} ${item.beds} bed ${item.price}`.toLowerCase();
        const matchesAllTokens = queryTokens.every(token => itemText.includes(token));
        if (!matchesAllTokens) return false;
      }

      if (draft.propertyType !== 'All') {
        const itemType = (item.property_type || '').toLowerCase().replace(/_/g, ' ');
        const targetType = draft.propertyType.toLowerCase();
        if (itemType !== targetType && !itemType.includes(targetType)) {
          return false;
        }
      }

      if (draft.minPrice !== null && item.price < draft.minPrice) {
        return false;
      }
      if (draft.maxPrice !== null && item.price > draft.maxPrice) {
        return false;
      }

      if (draft.minBeds !== null && (item.beds || 0) < draft.minBeds) {
        return false;
      }

      if (draft.minBaths !== null && (item.baths || 0) < draft.minBaths) {
        return false;
      }

      return true;
    }).length;
  }, [allProperties, draft, searchQuery]);

  const handlePricePreset = (preset: { min: number | null; max: number | null }) => {
    setDraft(prev => ({ ...prev, minPrice: preset.min, maxPrice: preset.max }));
    setMinPriceInput(preset.min ? String(preset.min) : '');
    setMaxPriceInput(preset.max ? String(preset.max) : '');
  };

  const handleCustomPriceChange = (field: 'min' | 'max', text: string) => {
    const cleanNum = text.replace(/[^0-9]/g, '');
    const num = cleanNum.length > 0 ? parseInt(cleanNum, 10) : null;
    if (field === 'min') {
      setMinPriceInput(cleanNum);
      setDraft(prev => ({ ...prev, minPrice: num }));
    } else {
      setMaxPriceInput(cleanNum);
      setDraft(prev => ({ ...prev, maxPrice: num }));
    }
  };

  const handleReset = () => {
    setDraft(INITIAL_FILTERS);
    setMinPriceInput('');
    setMaxPriceInput('');
  };

  const handleApply = () => {
    onApplyFilters(draft);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.backdrop}>
          <TouchableWithoutFeedback>
            <View style={styles.sheetContainer}>
              <View style={styles.grabberHandle} />

              {/*-------------------- Modal Header ----------------------*/}
              <View style={styles.sheetHeader}>
                <View style={styles.headerLeft}>
                  <Text style={styles.headerTitle}>Filter Properties</Text>
                  {activeFilterCount > 0 && (
                    <View style={styles.countBadge}>
                      <Text style={styles.countBadgeText}>{activeFilterCount}</Text>
                    </View>
                  )}
                </View>

                <View style={styles.headerRight}>
                  {activeFilterCount > 0 && (
                    <TouchableOpacity
                      activeOpacity={0.7}
                      onPress={handleReset}
                      style={styles.resetButton}
                    >
                      <Text style={styles.resetText}>Reset All</Text>
                    </TouchableOpacity>
                  )}
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={onClose}
                    style={styles.closeButton}
                  >
                    <Icons.Close size={18} color="#252823" />
                  </TouchableOpacity>
                </View>
              </View>

              <ScrollView
                style={styles.scrollBody}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
              >
                {/*-------------------- Sort By ----------------------*/}
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>Sort Results</Text>
                  <View style={styles.sortGrid}>
                    {SORT_OPTIONS.map(opt => {
                      const isSelected = draft.sortBy === opt.id;
                      return (
                        <TouchableOpacity
                          key={opt.id}
                          activeOpacity={0.75}
                          onPress={() => setDraft(prev => ({ ...prev, sortBy: opt.id }))}
                          style={[
                            styles.sortPill,
                            isSelected && styles.sortPillActive,
                          ]}
                        >
                          <Text
                            style={[
                              styles.sortPillText,
                              isSelected && styles.sortPillTextActive,
                            ]}
                          >
                            {opt.label}
                          </Text>
                          {isSelected && (
                            <View style={styles.checkDot}>
                              <Icons.Checkmark size={12} color="#FFFFFF" />
                            </View>
                          )}
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                </View>

                {/*-------------------- Price Range ----------------------*/}
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>Price Range</Text>
                  <View style={styles.presetsRow}>
                    {PRICE_PRESETS.map((preset, idx) => {
                      const isSelected =
                        draft.minPrice === preset.min && draft.maxPrice === preset.max;
                      return (
                        <TouchableOpacity
                          key={`price-${idx}`}
                          activeOpacity={0.75}
                          onPress={() => handlePricePreset(preset)}
                          style={[
                            styles.presetPill,
                            isSelected && styles.presetPillActive,
                          ]}
                        >
                          <Text
                            style={[
                              styles.presetText,
                              isSelected && styles.presetTextActive,
                            ]}
                          >
                            {preset.label}
                          </Text>
                        </TouchableOpacity>
                      );
                    })}
                  </View>

                  <View style={styles.customPriceRow}>
                    <View style={styles.priceInputBox}>
                      <Text style={styles.currencyPrefix}>$</Text>
                      <TextInput
                        placeholder="Min Price"
                        placeholderTextColor="#A1A19D"
                        keyboardType="numeric"
                        value={minPriceInput}
                        onChangeText={t => handleCustomPriceChange('min', t)}
                        style={styles.priceTextInput}
                      />
                    </View>
                    <Text style={styles.priceRangeSeparator}>—</Text>
                    <View style={styles.priceInputBox}>
                      <Text style={styles.currencyPrefix}>$</Text>
                      <TextInput
                        placeholder="Max Price"
                        placeholderTextColor="#A1A19D"
                        keyboardType="numeric"
                        value={maxPriceInput}
                        onChangeText={t => handleCustomPriceChange('max', t)}
                        style={styles.priceTextInput}
                      />
                    </View>
                  </View>
                </View>

                {/*-------------------- Bedrooms ----------------------*/}
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>Bedrooms</Text>
                  <View style={styles.pillsRow}>
                    {BED_OPTIONS.map(opt => {
                      const isSelected = draft.minBeds === opt.value;
                      return (
                        <TouchableOpacity
                          key={`bed-${opt.label}`}
                          activeOpacity={0.75}
                          onPress={() => setDraft(prev => ({ ...prev, minBeds: opt.value }))}
                          style={[
                            styles.numberPill,
                            isSelected && styles.numberPillActive,
                          ]}
                        >
                          <Text
                            style={[
                              styles.numberPillText,
                              isSelected && styles.numberPillTextActive,
                            ]}
                          >
                            {opt.label}
                          </Text>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                </View>

                {/*-------------------- Bathrooms ----------------------*/}
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>Bathrooms</Text>
                  <View style={styles.pillsRow}>
                    {BATH_OPTIONS.map(opt => {
                      const isSelected = draft.minBaths === opt.value;
                      return (
                        <TouchableOpacity
                          key={`bath-${opt.label}`}
                          activeOpacity={0.75}
                          onPress={() => setDraft(prev => ({ ...prev, minBaths: opt.value }))}
                          style={[
                            styles.numberPill,
                            isSelected && styles.numberPillActive,
                          ]}
                        >
                          <Text
                            style={[
                              styles.numberPillText,
                              isSelected && styles.numberPillTextActive,
                            ]}
                          >
                            {opt.label}
                          </Text>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                </View>

                {/*-------------------- Property Type ----------------------*/}
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>Property Type</Text>
                  <View style={styles.typeWrapRow}>
                    {PROPERTY_TYPES.map(type => {
                      const isSelected = draft.propertyType === type;
                      return (
                        <TouchableOpacity
                          key={`type-${type}`}
                          activeOpacity={0.75}
                          onPress={() => setDraft(prev => ({ ...prev, propertyType: type }))}
                          style={[
                            styles.typeChip,
                            isSelected && styles.typeChipActive,
                          ]}
                        >
                          <Text
                            style={[
                              styles.typeChipText,
                              isSelected && styles.typeChipTextActive,
                            ]}
                          >
                            {type}
                          </Text>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                </View>
              </ScrollView>

              {/*-------------------- Footer Actions ----------------------*/}
              <View style={styles.footerContainer}>
                <TouchableOpacity
                  activeOpacity={0.88}
                  onPress={handleApply}
                  style={styles.applyButton}
                >
                  <Text style={styles.applyButtonText}>
                    Show {matchingCount} {matchingCount === 1 ? 'Home' : 'Homes'}
                  </Text>
                  <Icons.ArrowRight size={18} color="#FFFFFF" />
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

//-------------------- Styles ----------------------
const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 18, 0.55)',
    justifyContent: 'flex-end',
  },
  sheetContainer: {
    backgroundColor: '#FAF8F5',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    maxHeight: SCREEN_HEIGHT * 0.88,
    paddingTop: 12,
    paddingBottom: Platform.OS === 'android' ? 24 : 34,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 20,
  },
  grabberHandle: {
    width: 44,
    height: 5,
    borderRadius: 3,
    backgroundColor: '#D9D5CC',
    alignSelf: 'center',
    marginBottom: 10,
  },
  sheetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 22,
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#EFECE6',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontFamily: fontFamilies.headingSemiBold,
    fontSize: 22,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  countBadge: {
    backgroundColor: colors.primary,
    minWidth: 22,
    height: 22,
    borderRadius: 11,
    paddingHorizontal: 6,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  countBadgeText: {
    color: colors.textLight,
    fontFamily: fontFamilies.bodySemiBold,
    fontSize: 12,
    fontWeight: '600',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  resetButton: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginRight: 8,
  },
  resetText: {
    color: colors.primary,
    fontFamily: fontFamilies.bodySemiBold,
    fontSize: 14,
    fontWeight: '600',
  },
  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#ECEAE4',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollBody: {
    flexGrow: 0,
  },
  scrollContent: {
    paddingHorizontal: 22,
    paddingTop: 16,
    paddingBottom: 24,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontFamily: fontFamilies.bodySemiBold,
    fontSize: 15,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 12,
    letterSpacing: 0.2,
  },
  sortGrid: {
    flexDirection: 'column',
    gap: 8,
  },
  sortPill: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 14,
    borderWidth: 1.2,
    borderColor: '#ECEAE3',
  },
  sortPillActive: {
    borderColor: colors.primary,
    backgroundColor: 'rgba(38, 78, 54, 0.08)',
  },
  sortPillText: {
    fontFamily: fontFamilies.bodySemiBold,
    fontSize: 14.5,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  sortPillTextActive: {
    fontFamily: fontFamilies.bodySemiBold,
    color: colors.primary,
    fontWeight: '600',
  },
  checkDot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  presetsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 14,
  },
  presetPill: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.2,
    borderColor: '#D4D0C8',
  },
  presetPillActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  presetText: {
    fontFamily: fontFamilies.bodySemiBold,
    fontSize: 13.5,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  presetTextActive: {
    fontFamily: fontFamilies.bodySemiBold,
    color: colors.textLight,
    fontWeight: '600',
  },
  customPriceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  priceInputBox: {
    flex: 1,
    height: 48,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E5E2DA',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  currencyPrefix: {
    fontFamily: fontFamilies.bodyMedium,
    fontSize: 16,
    fontWeight: '500',
    color: colors.textTertiary,
    marginRight: 4,
  },
  priceTextInput: {
    flex: 1,
    fontFamily: fontFamilies.bodyMedium,
    fontSize: 15,
    fontWeight: '500',
    color: colors.textPrimary,
    padding: 0,
  },
  priceRangeSeparator: {
    marginHorizontal: 12,
    color: '#A19E95',
    fontWeight: '600',
    fontSize: 16,
  },
  pillsRow: {
    flexDirection: 'row',
    gap: 10,
  },
  numberPill: {
    flex: 1,
    height: 44,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.2,
    borderColor: '#D4D0C8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  numberPillActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  numberPillText: {
    fontFamily: fontFamilies.bodySemiBold,
    fontSize: 14.5,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  numberPillTextActive: {
    fontFamily: fontFamilies.bodySemiBold,
    color: colors.textLight,
    fontWeight: '600',
  },
  typeWrapRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  typeChip: {
    paddingVertical: 9,
    paddingHorizontal: 16,
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.2,
    borderColor: '#D4D0C8',
  },
  typeChipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  typeChipText: {
    fontFamily: fontFamilies.bodySemiBold,
    fontSize: 13.5,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  typeChipTextActive: {
    fontFamily: fontFamilies.bodySemiBold,
    color: colors.textLight,
    fontWeight: '600',
  },
  footerContainer: {
    paddingHorizontal: 22,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#EFECE6',
    backgroundColor: '#FAF8F5',
  },
  applyButton: {
    height: 54,
    borderRadius: 27,
    backgroundColor: colors.primary,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  applyButtonText: {
    color: colors.textLight,
    fontSize: 16,
    fontWeight: '600',
    fontFamily: fontFamilies.bodySemiBold,
  },
});
