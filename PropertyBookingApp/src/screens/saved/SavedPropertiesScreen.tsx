import React, { useState, useMemo, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Modal,
  TouchableWithoutFeedback,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SavedScreenProps } from '../../types/navigation';
import { Property } from '../../types/property';
import { SavedPropertyCard } from '../../components/saved/SavedPropertyCard';
import { Icons } from '../../components/common/Icons';
import { fontFamilies } from '../../theme/typography';
import { colors } from '../../theme/colors';
import { useApp } from '../../context/AppContext';

type SortOption = 'recently_saved' | 'price_low_high' | 'price_high_low' | 'sqft_largest';

interface SortItem {
  id: SortOption;
  label: string;
}

const SORT_OPTIONS: SortItem[] = [
  { id: 'recently_saved', label: 'Recently saved' },
  { id: 'price_low_high', label: 'Price: Low to High' },
  { id: 'price_high_low', label: 'Price: High to Low' },
  { id: 'sqft_largest', label: 'Size: Largest' },
];

export const SavedPropertiesScreen: React.FC<SavedScreenProps> = ({
  navigation,
}) => {
  const { savedProperties, toggleSave, isSaved } = useApp();
  const [selectedSort, setSelectedSort] = useState<SortOption>('recently_saved');
  const [showSortModal, setShowSortModal] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleToggleSave = (item: Property) => {
    const isNowSaved = toggleSave(item);
    showToast(
      isNowSaved
        ? `Saved "${item.address ? item.address.split(',')[0] : 'Property'}"`
        : `Removed "${item.address ? item.address.split(',')[0] : 'Property'}" from saved`
    );
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  const activeProperties = useMemo(() => {
    return [...savedProperties].sort((a, b) => {
      if (selectedSort === 'price_low_high') {
        return a.price - b.price;
      }
      if (selectedSort === 'price_high_low') {
        return b.price - a.price;
      }
      if (selectedSort === 'sqft_largest') {
        return (b.sqft || 0) - (a.sqft || 0);
      }
      return 0;
    });
  }, [savedProperties, selectedSort]);

  const currentSortLabel =
    SORT_OPTIONS.find(o => o.id === selectedSort)?.label || 'Recently saved';

  const handlePropertyPress = (property: Property) => {
    navigation.navigate('PropertyDetails', {
      propertyId: property.id,
      initialProperty: property,
    });
  };

  const renderHeader = () => (
    <View style={styles.header}>
      {/*-------------------- Header Top Row ----------------------*/}
      <View style={styles.topRow}>
        <View style={styles.titleWrapper}>
          <Text style={styles.mainTitle}>Saved Properties</Text>
          <Text style={styles.subtitle}>
            Your shortlisted homes, all in one place.
          </Text>
        </View>

        <TouchableOpacity
          activeOpacity={0.75}
          style={styles.bookmarkButton}
          onPress={() => showToast('All bookmarks are synced')}
        >
          <Icons.Bookmark size={20} color={colors.textPrimary} />
        </TouchableOpacity>
      </View>

      {/*-------------------- Property Count & Sort ----------------------*/}
      <View style={styles.metaRow}>
        <Text style={styles.countText}>
          {activeProperties.length === 1
            ? '1 property saved'
            : `${activeProperties.length} properties saved`}
        </Text>

        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.sortButton}
          onPress={() => setShowSortModal(true)}
        >
          <Text style={styles.sortButtonText}>{currentSortLabel}</Text>
          <Icons.ChevronDown size={14} color={colors.textPrimary} />
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <View style={styles.emptyIconCircle}>
        <Icons.Heart size={36} color={colors.primary} filled={false} />
      </View>
      <Text style={styles.emptyTitle}>No Saved Properties</Text>
      <Text style={styles.emptySubtitle}>
        You haven’t saved any homes yet. Tap the heart icon on any property to keep track of it here.
      </Text>
      <TouchableOpacity
        activeOpacity={0.85}
        style={styles.discoverButton}
        onPress={() => navigation.navigate('Discover')}
      >
        <Text style={styles.discoverButtonText}>Discover Properties</Text>
      </TouchableOpacity>
    </View>
  );

  useEffect(() => {
    StatusBar.setBarStyle('dark-content');
    if (Platform.OS === 'android') {
      (StatusBar as any).setBackgroundColor?.('#FAF8F5');
    }
  }, []);

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <StatusBar barStyle="dark-content" />

      {/*-------------------- Toast Notification ----------------------*/}
      {toastMessage && (
        <View style={styles.toast}>
          <Text style={styles.toastText}>{toastMessage}</Text>
        </View>
      )}

      {/*-------------------- Property List ----------------------*/}
      <FlatList
        data={activeProperties}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <SavedPropertyCard
            property={item}
            isSaved={isSaved(item.id)}
            onPress={() => handlePropertyPress(item)}
            onToggleSave={() => handleToggleSave(item)}
          />
        )}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={renderEmptyState}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />

      {/*-------------------- Sort Options Modal ----------------------*/}
      <Modal
        visible={showSortModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowSortModal(false)}
      >
        <TouchableWithoutFeedback onPress={() => setShowSortModal(false)}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View style={styles.sortModalContent}>
                <View style={styles.modalHandle} />
                <Text style={styles.sortModalTitle}>Sort Properties</Text>

                {SORT_OPTIONS.map(option => {
                  const isSelected = selectedSort === option.id;
                  return (
                    <TouchableOpacity
                      key={option.id}
                      activeOpacity={0.7}
                      style={[
                        styles.sortOptionRow,
                        isSelected && styles.sortOptionRowActive,
                      ]}
                      onPress={() => {
                        setSelectedSort(option.id);
                        setShowSortModal(false);
                      }}
                    >
                      <Text
                        style={[
                          styles.sortOptionText,
                          isSelected && styles.sortOptionTextActive,
                        ]}
                      >
                        {option.label}
                      </Text>
                      {isSelected && (
                        <Icons.Checkmark size={18} color="#0A4D3C" />
                      )}
                    </TouchableOpacity>
                  );
                })}
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </SafeAreaView>
  );
};

//-------------------- Styles ----------------------
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FAF8F5',
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 36,
  },
  header: {
    paddingTop: 10,
    paddingBottom: 4,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 14,
  },
  titleWrapper: {
    flex: 1,
    paddingRight: 12,
  },
  mainTitle: {
    fontFamily: fontFamilies.headingSemiBold,
    fontSize: 32,
    lineHeight: 38,
    fontWeight: '600',
    color: colors.textPrimary,
    letterSpacing: -0.3,
  },
  subtitle: {
    fontFamily: fontFamilies.bodyMedium,
    fontSize: 15,
    lineHeight: 21,
    color: colors.textSecondary,
    fontWeight: '500',
    marginTop: 5,
  },
  bookmarkButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#ECEAE4',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 14,
  },
  countText: {
    fontFamily: fontFamilies.bodyMedium,
    fontSize: 14.5,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 20,
    paddingHorizontal: 13,
    paddingVertical: 6,
    gap: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 2,
    elevation: 1,
  },
  sortButtonText: {
    fontFamily: fontFamilies.bodyMedium,
    fontSize: 13.5,
    fontWeight: '500',
    color: colors.textPrimary,
  },
  emptyContainer: {
    paddingVertical: 60,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyIconCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#EAE6DC',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  emptyTitle: {
    fontFamily: fontFamilies.headingSemiBold,
    fontSize: 22,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontFamily: fontFamilies.bodyMedium,
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
    fontWeight: '500',
    marginBottom: 24,
  },
  discoverButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
  },
  discoverButtonText: {
    color: colors.textLight,
    fontFamily: fontFamilies.bodySemiBold,
    fontSize: 14,
    fontWeight: '600',
  },
  toast: {
    position: 'absolute',
    top: 16,
    alignSelf: 'center',
    zIndex: 999,
    backgroundColor: '#1E293B',
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  toastText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '500',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'flex-end',
  },
  sortModalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 36,
  },
  modalHandle: {
    width: 36,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#D1D5DB',
    alignSelf: 'center',
    marginBottom: 16,
  },
  sortModalTitle: {
    fontFamily: fontFamilies.headingSemiBold,
    fontSize: 18,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 16,
  },
  sortOptionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  sortOptionRowActive: {
    backgroundColor: '#F8FAF9',
    borderRadius: 10,
    paddingHorizontal: 8,
  },
  sortOptionText: {
    fontFamily: fontFamilies.bodyMedium,
    fontSize: 15,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  sortOptionTextActive: {
    fontFamily: fontFamilies.bodySemiBold,
    color: colors.primary,
    fontWeight: '600',
  },
});
