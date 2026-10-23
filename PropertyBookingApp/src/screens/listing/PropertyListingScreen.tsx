import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  RefreshControl,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { usePropertyListings } from '../../hooks/usePropertyListings';
import { PropertyCard } from '../../components/property/PropertyCard';
import { LoadingIndicator } from '../../components/common/LoadingIndicator';
import { ErrorState } from '../../components/common/ErrorState';
import { Icons } from '../../components/common/Icons';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { spacing, borderRadius } from '../../theme/spacing';
import { PROPERTY_CATEGORIES } from '../../constants/config';
import { Property } from '../../types/property';
import { DiscoverScreenProps } from '../../types/navigation';

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

  const filteredListings = useMemo(() => {
    return listings.filter(item => {
      const matchesSearch =
        searchQuery.trim().length === 0 ||
        item.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.property_type.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === 'All' ||
        item.property_type.toLowerCase().includes(selectedCategory.toLowerCase());

      return matchesSearch && matchesCategory;
    });
  }, [listings, searchQuery, selectedCategory]);

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

        <View style={styles.avatarContainer}>
          <Image
            source={require('../../assets/images/avatar.png')}
            style={styles.avatar}
          />
        </View>
      </View>

      <View style={styles.searchRow}>
        <View style={styles.searchBar}>
          <Icons.Search size={18} color={colors.textSecondary} />
          <TextInput
            placeholder="Search by location, property type..."
            placeholderTextColor={colors.textTertiary}
            value={searchQuery}
            onChangeText={setSearchQuery}
            style={styles.searchInput}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Icons.Close size={16} color={colors.textSecondary} />
            </TouchableOpacity>
          )}
        </View>

        <TouchableOpacity activeOpacity={0.85} style={styles.filterButton}>
          <Icons.Filter size={18} color={colors.textLight} />
        </TouchableOpacity>
      </View>

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

  const renderEmpty = () => {
    if (loading) return null;
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyTitle}>No Properties Found</Text>
        <Text style={styles.emptySubtitle}>
          Try adjusting your search criteria or category filter.
        </Text>
      </View>
    );
  };

  if (loading && !refreshing && listings.length === 0) {
    return (
      <SafeAreaView style={styles.safeArea}>
        {renderHeader()}
        <LoadingIndicator fullScreen message="Fetching curated properties..." />
      </SafeAreaView>
    );
  }

  if (error && listings.length === 0) {
    return (
      <SafeAreaView style={styles.safeArea}>
        {renderHeader()}
        <ErrorState
          title="Network Connection Issue"
          message={error}
          onRetry={retry}
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <Image
        source={require('../../assets/images/botanical_left.png')}
        style={styles.botanicalAccent}
        resizeMode="contain"
      />
      <FlatList
        data={filteredListings}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <PropertyCard
            property={item}
            onPress={() => handlePropertyPress(item)}
          />
        )}
        ListHeaderComponent={renderHeader}
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
    </SafeAreaView>
  );
};

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
    paddingTop: spacing.md,
    paddingBottom: spacing.md,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.lg,
  },
  titleColumn: {
    flex: 1,
  },
  subHeaderLabel: {
    ...typography.labelUpper,
    color: '#8A867C',
    letterSpacing: 1.5,
    marginBottom: 4,
  },
  mainHeader: {
    fontFamily: 'serif',
    fontSize: 32,
    lineHeight: 38,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  headerDescription: {
    ...typography.subtitle,
    color: '#6F6C64',
    fontSize: 14,
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
    color: colors.textPrimary,
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
  },
  categoriesContainer: {
    paddingVertical: spacing.xs,
    marginBottom: spacing.md,
  },
  categoryPill: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.round,
    marginRight: spacing.sm,
  },
  categoryPillActive: {
    backgroundColor: colors.primary,
  },
  categoryPillInactive: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
  },
  categoryText: {
    ...typography.bodySmall,
    fontWeight: '500',
  },
  categoryTextActive: {
    color: colors.textLight,
  },
  categoryTextInactive: {
    color: colors.textPrimary,
  },
  footerLoader: {
    paddingVertical: spacing.lg,
  },
  emptyContainer: {
    padding: spacing.xxxl,
    alignItems: 'center',
    justifyContent: 'center',
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
});
