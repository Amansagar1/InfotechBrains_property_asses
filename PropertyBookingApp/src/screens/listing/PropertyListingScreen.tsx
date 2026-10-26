import React, { useState, useMemo, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  RefreshControl,
  Image,
  Platform,
  Keyboard,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { usePropertyListings } from '../../hooks/usePropertyListings';
import { PropertyCard } from '../../components/property/PropertyCard';
import { PropertyCardSkeleton } from '../../components/property/PropertyCardSkeleton';
import { LoadingIndicator } from '../../components/common/LoadingIndicator';
import { ErrorState } from '../../components/common/ErrorState';
import { Icons } from '../../components/common/Icons';
import { colors } from '../../theme/colors';
import { typography, fontFamilies } from '../../theme/typography';
import { spacing, borderRadius } from '../../theme/spacing';
import { PROPERTY_CATEGORIES } from '../../constants/config';
import { Property } from '../../types/property';
import { DiscoverScreenProps } from '../../types/navigation';
import {
  PropertyFilterModal,
  FilterState,
  INITIAL_FILTERS,
} from '../../components/property/PropertyFilterModal';

export type PropertyListingScreenProps = DiscoverScreenProps;

export const PropertyListingScreen: React.FC<PropertyListingScreenProps> = ({
  navigation,
}) => {
  const {
    listings,
    loading,
    refreshing,
    loadingMore,
    error,
    onRefresh,
    loadMore,
    retry,
  } = usePropertyListings();

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [filters, setFilters] = useState<FilterState>(INITIAL_FILTERS);
  const [isFilterModalVisible, setIsFilterModalVisible] = useState<boolean>(false);

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.sortBy !== 'featured') count++;
    if (filters.minPrice !== null || filters.maxPrice !== null) count++;
    if (filters.minBeds !== null) count++;
    if (filters.minBaths !== null) count++;
    if (filters.propertyType !== 'All') count++;
    return count;
  }, [filters]);

  const handleResetAllFilters = useCallback(() => {
    setSearchQuery('');
    setSelectedCategory('All');
    setFilters(INITIAL_FILTERS);
  }, []);

  const filteredListings = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    const queryTokens = query.split(/\s+/).filter(Boolean);

    let result = listings.filter(item => {
      if (queryTokens.length > 0) {
        const typeNormalized = (item.property_type || '').replace(/_/g, ' ');
        const priceNum = String(item.price);
        const bedsStr = `${item.beds} bed ${item.beds}beds ${item.beds}b`;
        const bathsStr = `${item.baths} bath ${item.baths}baths`;
        const corpus = `${item.address} ${item.city} ${item.state} ${item.zipcode || ''} ${typeNormalized} ${priceNum} ${bedsStr} ${bathsStr} ${item.description || ''}`.toLowerCase();

        const matchesAll = queryTokens.every(token => {
          if (token.includes('k')) {
            const num = parseInt(token.replace(/[^0-9]/g, ''), 10) * 1000;
            if (!isNaN(num)) {
              if (token.startsWith('<')) return item.price <= num;
              if (token.startsWith('>')) return item.price >= num;
              return Math.abs(item.price - num) <= 100000;
            }
          }
          return corpus.includes(token);
        });

        if (!matchesAll) return false;
      }

      if (selectedCategory !== 'All') {
        const itemType = (item.property_type || '').toLowerCase().replace(/_/g, ' ');
        const targetCategory = selectedCategory.toLowerCase();
        if (itemType !== targetCategory && !itemType.includes(targetCategory)) {
          return false;
        }
      }

      if (filters.propertyType !== 'All') {
        const itemType = (item.property_type || '').toLowerCase().replace(/_/g, ' ');
        const targetType = filters.propertyType.toLowerCase();
        if (itemType !== targetType && !itemType.includes(targetType)) {
          return false;
        }
      }

      if (filters.minPrice !== null && item.price < filters.minPrice) {
        return false;
      }
      if (filters.maxPrice !== null && item.price > filters.maxPrice) {
        return false;
      }

      if (filters.minBeds !== null && (item.beds || 0) < filters.minBeds) {
        return false;
      }

      if (filters.minBaths !== null && (item.baths || 0) < filters.minBaths) {
        return false;
      }

      return true;
    });

    if (filters.sortBy === 'price_asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (filters.sortBy === 'price_desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (filters.sortBy === 'sqft_desc') {
      result.sort((a, b) => (b.sqft || 0) - (a.sqft || 0));
    } else if (filters.sortBy === 'beds_desc') {
      result.sort((a, b) => (b.beds || 0) - (a.beds || 0));
    }

    return result;
  }, [listings, searchQuery, selectedCategory, filters]);

  const handlePropertyPress = (property: Property) => {
    navigation.navigate('PropertyDetails', {
      propertyId: property.id,
      initialProperty: property,
    });
  };

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <View style={styles.topRow}>
        <View style={styles.titleColumn}>
          <Text style={styles.subHeaderLabel}>FIND YOUR NEXT</Text>
          <Text style={styles.mainHeader}>Perfect Space</Text>
          <Text style={styles.headerDescription}>
            Beautiful homes, brighter tomorrows.
          </Text>
        </View>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.navigate('Profile')}
          style={styles.avatarContainer}
          accessibilityLabel="Open Profile"
          accessibilityRole="button"
        >
          <Image
            source={require('../../assets/images/avatar.png')}
            style={styles.avatar}
          />
        </TouchableOpacity>
      </View>

      {/*-------------------- Inline Search Row ----------------------*/}
      <View style={styles.searchRow}>
        <View style={styles.searchBar}>
          <Icons.Search size={20} color="#000000" />
          <TextInput
            placeholder="Search city, address, beds, price..."
            placeholderTextColor="#333333"
            value={searchQuery}
            onChangeText={setSearchQuery}
            style={styles.searchInput}
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="search"
            onSubmitEditing={() => Keyboard.dismiss()}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity
              onPress={() => setSearchQuery('')}
              hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
              style={styles.clearSearchBtn}
              accessibilityLabel="Clear search"
            >
              <Icons.Close size={18} color="#111111" />
            </TouchableOpacity>
          )}
        </View>

        {/*-------------------- Filter Button ----------------------*/}
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={() => setIsFilterModalVisible(true)}
          style={[
            styles.filterButton,
            activeFilterCount > 0 && styles.filterButtonActive,
          ]}
          accessibilityRole="button"
          accessibilityLabel="Open Filter Options"
        >
          <Icons.Filter
            size={18}
            color={activeFilterCount > 0 ? '#FFFFFF' : colors.textLight}
          />
          {activeFilterCount > 0 && (
            <View style={styles.filterBadge}>
              <Text style={styles.filterBadgeText}>{activeFilterCount}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      {/*-------------------- Active Filter Chips Bar ----------------------*/}
      {(searchQuery.length > 0 || activeFilterCount > 0 || selectedCategory !== 'All') && (
        <View style={styles.activeFiltersBar}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.activeFilterScroll}
          >
            <View style={styles.resultBadge}>
              <Text style={styles.resultBadgeText}>
                {filteredListings.length} {filteredListings.length === 1 ? 'home' : 'homes'}
              </Text>
            </View>

            {activeFilterCount > 0 && (
              <View style={styles.filterCountPill}>
                <Icons.Filter size={12} color={colors.primary} />
                <Text style={styles.filterCountPillText}>
                  {activeFilterCount} {activeFilterCount === 1 ? 'filter selected' : 'filters selected'}
                </Text>
              </View>
            )}

            {searchQuery.length > 0 && (
              <TouchableOpacity
                onPress={() => setSearchQuery('')}
                style={styles.activeChip}
              >
                <Text style={styles.activeChipText}>"{searchQuery}"</Text>
                <Icons.Close size={12} color={colors.primary} />
              </TouchableOpacity>
            )}

            {selectedCategory !== 'All' && (
              <TouchableOpacity
                onPress={() => setSelectedCategory('All')}
                style={styles.activeChip}
              >
                <Text style={styles.activeChipText}>{selectedCategory}</Text>
                <Icons.Close size={12} color={colors.primary} />
              </TouchableOpacity>
            )}

            {filters.minPrice !== null && (
              <TouchableOpacity
                onPress={() => setFilters(prev => ({ ...prev, minPrice: null }))}
                style={styles.activeChip}
              >
                <Text style={styles.activeChipText}>Min ${filters.minPrice / 1000}k</Text>
                <Icons.Close size={12} color={colors.primary} />
              </TouchableOpacity>
            )}

            {filters.maxPrice !== null && (
              <TouchableOpacity
                onPress={() => setFilters(prev => ({ ...prev, maxPrice: null }))}
                style={styles.activeChip}
              >
                <Text style={styles.activeChipText}>Max ${filters.maxPrice / 1000}k</Text>
                <Icons.Close size={12} color={colors.primary} />
              </TouchableOpacity>
            )}

            {filters.minBeds !== null && (
              <TouchableOpacity
                onPress={() => setFilters(prev => ({ ...prev, minBeds: null }))}
                style={styles.activeChip}
              >
                <Text style={styles.activeChipText}>{filters.minBeds}+ Beds</Text>
                <Icons.Close size={12} color={colors.primary} />
              </TouchableOpacity>
            )}

            {filters.minBaths !== null && (
              <TouchableOpacity
                onPress={() => setFilters(prev => ({ ...prev, minBaths: null }))}
                style={styles.activeChip}
              >
                <Text style={styles.activeChipText}>{filters.minBaths}+ Baths</Text>
                <Icons.Close size={12} color={colors.primary} />
              </TouchableOpacity>
            )}

            {filters.propertyType !== 'All' && (
              <TouchableOpacity
                onPress={() => setFilters(prev => ({ ...prev, propertyType: 'All' }))}
                style={styles.activeChip}
              >
                <Text style={styles.activeChipText}>{filters.propertyType}</Text>
                <Icons.Close size={12} color={colors.primary} />
              </TouchableOpacity>
            )}

            {filters.sortBy !== 'featured' && (
              <TouchableOpacity
                onPress={() => setFilters(prev => ({ ...prev, sortBy: 'featured' }))}
                style={styles.activeChip}
              >
                <Text style={styles.activeChipText}>Sorted</Text>
                <Icons.Close size={12} color={colors.primary} />
              </TouchableOpacity>
            )}

            <TouchableOpacity
              onPress={handleResetAllFilters}
              style={styles.clearAllButton}
            >
              <Text style={styles.clearAllText}>Clear All</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      )}

      {/*-------------------- Property Categories Carousel ----------------------*/}
      <FlatList
        data={PROPERTY_CATEGORIES as unknown as string[]}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item}
        contentContainerStyle={styles.categoriesContainer}
        renderItem={({ item }) => {
          const isSelected = selectedCategory === item;
          return (
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => setSelectedCategory(item)}
              style={[
                styles.categoryPill,
                isSelected ? styles.categoryPillActive : styles.categoryPillInactive,
              ]}
            >
              <Text
                style={[
                  styles.categoryText,
                  isSelected ? styles.categoryTextActive : styles.categoryTextInactive,
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );

  const renderFooter = () => {
    if (!loadingMore) return null;
    return (
      <View style={styles.footerLoader}>
        <LoadingIndicator message="Loading more properties..." />
      </View>
    );
  };

  const isInitialLoading = loading && listings.length === 0;

  const skeletonItems = useMemo(
    () => [
      { id: 'skeleton_1', isSkeleton: true },
      { id: 'skeleton_2', isSkeleton: true },
    ],
    []
  );

  const displayListings = isInitialLoading
    ? (skeletonItems as unknown as Property[])
    : filteredListings;

  const renderEmpty = () => {
    if (isInitialLoading) return null;
    if (error && listings.length === 0) {
      return (
        <ErrorState
          title="Network Connection Issue"
          message={error}
          onRetry={retry}
        />
      );
    }
    return (
      <View style={styles.emptyContainer}>
        <View style={styles.emptyIconCircle}>
          <Icons.Search size={32} color={colors.primary} />
        </View>
        <Text style={styles.emptyTitle}>No Properties Found</Text>
        <Text style={styles.emptySubtitle}>
          {searchQuery
            ? `No homes matched "${searchQuery}". Try a different location, price range, or clearing filters.`
            : 'No homes match the selected filters. Try broadening your criteria.'}
        </Text>
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={handleResetAllFilters}
          style={styles.resetFiltersBtn}
        >
          <Text style={styles.resetFiltersBtnText}>Reset All Filters</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Image
        source={require('../../assets/images/botanical_left.png')}
        style={styles.botanicalAccent}
        resizeMode="contain"
      />

      {/*-------------------- Screen Header with Search ----------------------*/}
      {renderHeader()}

      <FlatList
        data={displayListings}
        keyExtractor={item => item.id}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        renderItem={({ item }: { item: any }) => {
          if (item.isSkeleton) {
            return <PropertyCardSkeleton />;
          }
          return (
            <PropertyCard
              property={item}
              onPress={() => handlePropertyPress(item)}
            />
          );
        }}
        ListFooterComponent={renderFooter}
        ListEmptyComponent={renderEmpty}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[colors.primary]}
            tintColor={colors.primary}
          />
        }
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
      />

      {/*-------------------- Filter & Sort Modal ----------------------*/}
      <PropertyFilterModal
        visible={isFilterModalVisible}
        onClose={() => setIsFilterModalVisible(false)}
        filters={filters}
        onApplyFilters={setFilters}
        allProperties={listings}
        searchQuery={searchQuery}
      />
    </SafeAreaView>
  );
};

//-------------------- Styles ----------------------
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F6F4F0',
  },
  botanicalAccent: {
    position: 'absolute',
    left: 0,
    top: 380,
    width: 38,
    height: 300,
    opacity: 0.85,
    zIndex: 0,
  },
  listContent: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xxxl,
  },
  headerContainer: {
    paddingTop: Platform.OS === 'android' ? 10 : spacing.sm,
    paddingBottom: 2,
    paddingHorizontal: spacing.lg,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.md,
  },
  titleColumn: {
    flex: 1,
  },
  subHeaderLabel: {
    fontFamily: fontFamilies.bodySemiBold,
    fontSize: 13,
    lineHeight: 18,
    color: colors.textSecondary,
    letterSpacing: 1.5,
    marginBottom: 4,
    fontWeight: '600',
  },
  mainHeader: {
    fontFamily: fontFamilies.heading,
    fontSize: 34,
    lineHeight: 40,
    color: colors.textPrimary,
    marginBottom: 6,
    fontWeight: '600',
  },
  headerDescription: {
    fontFamily: fontFamilies.bodyMedium,
    color: colors.textSecondary,
    fontSize: 15.5,
    lineHeight: 22,
    fontWeight: '500',
  },
  avatarContainer: {
    width: 46,
    height: 46,
    borderRadius: borderRadius.round,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: colors.card,
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  searchBar: {
    flex: 1,
    height: 52,
    backgroundColor: colors.card,
    borderRadius: borderRadius.round,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    marginRight: spacing.sm,
  },
  searchInput: {
    flex: 1,
    ...typography.body,
    fontSize: 15,
    color: '#141414',
    marginLeft: spacing.sm,
    padding: 0,
  },
  filterButton: {
    width: 52,
    height: 52,
    borderRadius: borderRadius.round,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  filterButtonActive: {
    backgroundColor: '#07362A',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  filterBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#C59A3F',
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  filterBadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontFamily: fontFamilies.bodySemiBold,
    fontWeight: '600',
  },
  clearSearchBtn: {
    padding: 6,
    marginRight: 4,
  },
  filterCountPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0A4D3C14',
    paddingHorizontal: spacing.sm + 2,
    paddingVertical: 5,
    borderRadius: borderRadius.round,
    marginRight: spacing.xs,
    gap: 4,
  },
  filterCountPillText: {
    fontSize: 12,
    fontFamily: fontFamilies.bodySemiBold,
    fontWeight: '600',
    color: colors.primary,
  },
  activeFiltersBar: {
    marginBottom: spacing.md,
  },
  activeFilterScroll: {
    alignItems: 'center',
  },
  resultBadge: {
    backgroundColor: '#0A4D3C18',
    paddingHorizontal: spacing.sm + 2,
    paddingVertical: 5,
    borderRadius: borderRadius.round,
    marginRight: spacing.xs,
  },
  resultBadgeText: {
    fontSize: 12,
    fontFamily: fontFamilies.bodySemiBold,
    fontWeight: '600',
    color: colors.primary,
  },
  activeChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    borderRadius: borderRadius.round,
    paddingHorizontal: spacing.sm + 2,
    paddingVertical: 5,
    marginRight: spacing.xs,
    gap: 4,
  },
  activeChipText: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.textPrimary,
  },
  clearAllButton: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 5,
  },
  clearAllText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#B3261E',
  },
  categoriesContainer: {
    paddingVertical: spacing.xs,
    marginBottom: spacing.md,
  },
  categoryPill: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: borderRadius.round,
    marginRight: spacing.sm,
  },
  categoryPillActive: {
    backgroundColor: colors.primary,
  },
  categoryPillInactive: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#C7C2B6',
  },
  categoryText: {
    fontFamily: fontFamilies.bodySemiBold,
    fontSize: 14.5,
    fontWeight: '600',
    letterSpacing: 0.2,
  },
  categoryTextActive: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  categoryTextInactive: {
    color: '#1A1D19',
    fontWeight: '600',
  },
  footerLoader: {
    paddingVertical: spacing.lg,
  },
  emptyContainer: {
    padding: spacing.xxxl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyIconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#0A4D3C12',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  emptyTitle: {
    ...typography.h3,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  emptySubtitle: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  resetFiltersBtn: {
    marginTop: spacing.lg,
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.round,
  },
  resetFiltersBtnText: {
    color: colors.textLight,
    fontWeight: '600',
    fontSize: 14,
  },
});
