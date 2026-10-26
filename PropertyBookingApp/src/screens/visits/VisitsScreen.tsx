import React, { useState, useMemo, useEffect, useCallback } from 'react';
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
  Alert,
  Image,
  RefreshControl,
  Linking,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { VisitsScreenProps } from '../../types/navigation';
import { ScheduledVisit } from '../../types/visit';
import { VisitCard } from '../../components/visit/VisitCard';
import { Icons } from '../../components/common/Icons';
import { fontFamilies } from '../../theme/typography';
import { colors } from '../../theme/colors';
import { TIME_SLOTS } from '../../constants/config';
import { useApp } from '../../context/AppContext';
import { getPropertyListings } from '../../services/api/propertyApi';
import { formatPrice } from '../../utils/formatters';

type FilterTab = 'all' | 'upcoming' | 'past';

const RESCHEDULE_DATES = [
  { label: 'Tomorrow', day: '28', month: 'OCT' },
  { label: 'Sat', day: '31', month: 'OCT' },
  { label: 'Sun', day: '01', month: 'NOV' },
  { label: 'Mon', day: '02', month: 'NOV' },
  { label: 'Tue', day: '03', month: 'NOV' },
];

export const VisitsScreen: React.FC<VisitsScreenProps> = ({ navigation }) => {
  const { bookedVisits, cancelVisit, rescheduleVisit: appRescheduleVisit } = useApp();
  const [apiVisits, setApiVisits] = useState<ScheduledVisit[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const visits = useMemo(() => {
    return [...bookedVisits, ...apiVisits];
  }, [bookedVisits, apiVisits]);
  const [activeTab, setActiveTab] = useState<FilterTab>('all');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [selectedVisitForOptions, setSelectedVisitForOptions] = useState<ScheduledVisit | null>(null);
  const [rescheduleVisit, setRescheduleVisit] = useState<ScheduledVisit | null>(null);
  const [selectedDateItem, setSelectedDateItem] = useState(RESCHEDULE_DATES[0]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>(TIME_SLOTS[0]);

  const fetchApiVisits = useCallback(async (isRefresh = false) => {
    if (isRefresh) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }
    try {
      console.log('📡 [VISITS API] Fetching properties dynamically from real estate API...');
      const response = await getPropertyListings(1, 4);
      const properties = response.data || [];
      if (properties.length > 0) {
        const dynamicVisits: ScheduledVisit[] = [
          {
            id: `api_visit_${properties[0].id}`,
            bookingReference: `BK-${properties[0].id.slice(0, 6).toUpperCase()}-101`,
            property: properties[0],
            title: properties[0].address ? properties[0].address.split(',')[0] : 'Downtown Residence',
            location:
              properties[0].city && properties[0].state
                ? `${properties[0].city}, ${properties[0].state}`
                : properties[0].address,
            priceDisplay: formatPrice(properties[0].price, properties[0].currency || 'USD'),
            beds: properties[0].beds,
            baths: properties[0].baths,
            sqftDisplay: `${properties[0].sqft} sqft`,
            day: '28',
            month: 'OCT',
            year: '2026',
            timeSlot: '10:00 AM - 11:00 AM',
            status: 'upcoming',
            localImage: null,
            agent: {
              id: properties[0].agent?.id || 'agent_01',
              name: properties[0].agent?.name || 'Sarah Mitchell',
              phone: properties[0].agent?.phone || '+1-555-0142',
              email: properties[0].agent?.email || 'sarah.m@realty.com',
              role: 'Listing Agent',
            },
            meetingLocation: properties[0].address,
            createdAt: new Date().toISOString(),
          },
          ...(properties.length > 1
            ? [
                {
                  id: `api_visit_${properties[1].id}`,
                  bookingReference: `BK-${properties[1].id.slice(0, 6).toUpperCase()}-102`,
                  property: properties[1],
                  title: properties[1].address ? properties[1].address.split(',')[0] : 'Coastal Retreat',
                  location:
                    properties[1].city && properties[1].state
                      ? `${properties[1].city}, ${properties[1].state}`
                      : properties[1].address,
                  priceDisplay: formatPrice(properties[1].price, properties[1].currency || 'USD'),
                  beds: properties[1].beds,
                  baths: properties[1].baths,
                  sqftDisplay: `${properties[1].sqft} sqft`,
                  day: '02',
                  month: 'NOV',
                  year: '2026',
                  timeSlot: '02:00 PM - 03:00 PM',
                  status: 'upcoming' as const,
                  localImage: null,
                  agent: {
                    id: properties[1].agent?.id || 'agent_02',
                    name: properties[1].agent?.name || 'Marcus Vance',
                    phone: properties[1].agent?.phone || '+1-555-0189',
                    email: properties[1].agent?.email || 'marcus.v@realty.com',
                    role: 'Senior Advisor',
                  },
                  meetingLocation: properties[1].address,
                  createdAt: new Date().toISOString(),
                },
              ]
            : []),
          ...(properties.length > 2
            ? [
                {
                  id: `api_visit_${properties[2].id}`,
                  bookingReference: `BK-${properties[2].id.slice(0, 6).toUpperCase()}-103`,
                  property: properties[2],
                  title: properties[2].address ? properties[2].address.split(',')[0] : 'Penthouse Suite',
                  location:
                    properties[2].city && properties[2].state
                      ? `${properties[2].city}, ${properties[2].state}`
                      : properties[2].address,
                  priceDisplay: formatPrice(properties[2].price, properties[2].currency || 'USD'),
                  beds: properties[2].beds,
                  baths: properties[2].baths,
                  sqftDisplay: `${properties[2].sqft} sqft`,
                  day: '14',
                  month: 'OCT',
                  year: '2026',
                  timeSlot: '11:30 AM - 12:30 PM',
                  status: 'completed' as const,
                  localImage: null,
                  agent: {
                    id: properties[2].agent?.id || 'agent_03',
                    name: properties[2].agent?.name || 'Elena Rostova',
                    phone: properties[2].agent?.phone || '+1-555-0199',
                    email: properties[2].agent?.email || 'elena.r@realty.com',
                    role: 'Associate Partner',
                  },
                  meetingLocation: properties[2].address,
                  createdAt: new Date().toISOString(),
                },
              ]
            : []),
        ];
        console.log(`✅ [VISITS API] Loaded ${dynamicVisits.length} dynamic property visits from API.`);
        setApiVisits(dynamicVisits);
      }
    } catch (err: any) {
      console.warn('VisitsScreen API fetch error:', err?.message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchApiVisits();
  }, [fetchApiVisits]);

  useEffect(() => {
    StatusBar.setBarStyle('dark-content');
    if (Platform.OS === 'android') {
      (StatusBar as any).setBackgroundColor?.('#FAF8F5');
    }
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  const filteredVisits = useMemo(() => {
    return visits.filter(v => {
      if (activeTab === 'upcoming') {
        return v.status === 'upcoming';
      }
      if (activeTab === 'past') {
        return v.status === 'completed';
      }
      return true;
    });
  }, [visits, activeTab]);

  const upcomingCount = visits.filter(v => v.status === 'upcoming').length;
  const pastCount = visits.filter(v => v.status === 'completed').length;
  const totalCount = visits.length;

  const handlePressDetails = (visit: ScheduledVisit) => {
    console.log('👆 [VISITS SCREEN] handlePressDetails tapped for property:', visit.property?.id);
    (navigation as any).navigate('PropertyDetails', {
      propertyId: visit.property.id,
      initialProperty: visit.property,
    });
  };

  const handleOpenMoreOptions = (visit: ScheduledVisit) => {
    console.log('👆 [VISITS SCREEN] handleOpenMoreOptions tapped for visit:', visit.id);
    setSelectedVisitForOptions(visit);
  };

  const handleCallAgent = (visit: ScheduledVisit) => {
    setSelectedVisitForOptions(null);
    if (visit.agent?.phone) {
      Linking.openURL(`tel:${visit.agent.phone}`).catch(() => {
        showToast(`Calling ${visit.agent.name} (${visit.agent.phone})...`);
      });
    } else {
      showToast(`Calling ${visit.agent.name}...`);
    }
  };

  const handleMessageAgent = (visit: ScheduledVisit) => {
    setSelectedVisitForOptions(null);
    if (visit.agent?.email) {
      Linking.openURL(`mailto:${visit.agent.email}?subject=Tour Inquiry: ${visit.title}`).catch(() => {
        showToast(`Opening chat with ${visit.agent.name}...`);
      });
    } else {
      showToast(`Opening chat with ${visit.agent.name}...`);
    }
  };

  const handleOpenReschedule = (visit: ScheduledVisit) => {
    setSelectedVisitForOptions(null);
    setRescheduleVisit(visit);
    setSelectedDateItem(RESCHEDULE_DATES[0]);
    setSelectedTimeSlot(visit.timeSlot || TIME_SLOTS[0]);
  };

  const handleConfirmReschedule = () => {
    if (!rescheduleVisit) return;

    appRescheduleVisit(
      rescheduleVisit.id,
      selectedDateItem.day,
      selectedDateItem.month,
      selectedTimeSlot
    );

    setApiVisits(prev =>
      prev.map(v => {
        if (v.id === rescheduleVisit.id) {
          return {
            ...v,
            day: selectedDateItem.day,
            month: selectedDateItem.month,
            timeSlot: selectedTimeSlot,
            status: 'upcoming' as const,
          };
        }
        return v;
      })
    );

    showToast(`Rescheduled visit for ${rescheduleVisit.title} to ${selectedDateItem.month} ${selectedDateItem.day}`);
    setRescheduleVisit(null);
  };

  const handleCancelVisit = (visit: ScheduledVisit) => {
    setSelectedVisitForOptions(null);
    Alert.alert(
      'Cancel Visit',
      `Are you sure you want to cancel your scheduled tour for ${visit.title}?`,
      [
        { text: 'Keep Tour', style: 'cancel' },
        {
          text: 'Cancel Tour',
          style: 'destructive',
          onPress: () => {
            cancelVisit(visit.id);
            setApiVisits(prev => prev.filter(v => v.id !== visit.id));
            showToast(`Cancelled tour for ${visit.title}`);
          },
        },
      ]
    );
  };

  const renderHeader = () => (
    <View style={styles.header}>
      {/*-------------------- Title & Subtitle ----------------------*/}
      <View style={styles.titleSection}>
        <Text style={styles.mainTitle}>My Visits</Text>
        <Text style={styles.subtitle}>
          Your scheduled and past property visits.
        </Text>
      </View>

      {/*-------------------- Filter Segment Bar ----------------------*/}
      <View style={styles.segmentedContainer}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => setActiveTab('all')}
          style={[
            styles.segmentTab,
            activeTab === 'all' && styles.segmentTabActive,
          ]}
        >
          <Text
            style={[
              styles.segmentText,
              activeTab === 'all' && styles.segmentTextActive,
            ]}
          >
            All ({totalCount})
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => setActiveTab('upcoming')}
          style={[
            styles.segmentTab,
            activeTab === 'upcoming' && styles.segmentTabActive,
          ]}
        >
          <Text
            style={[
              styles.segmentText,
              activeTab === 'upcoming' && styles.segmentTextActive,
            ]}
          >
            Upcoming ({upcomingCount})
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => setActiveTab('past')}
          style={[
            styles.segmentTab,
            activeTab === 'past' && styles.segmentTabActive,
          ]}
        >
          <Text
            style={[
              styles.segmentText,
              activeTab === 'past' && styles.segmentTextActive,
            ]}
          >
            Past ({pastCount})
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderEmptyState = () => {
    if (loading && visits.length === 0) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0F4A3E" />
          <Text style={styles.loadingText}>Loading dynamic property visits...</Text>
        </View>
      );
    }
    return (
      <View style={styles.emptyContainer}>
        <View style={styles.emptyIconCircle}>
          <Icons.CalendarCheck size={36} color="#0F4A3E" />
        </View>
        <Text style={styles.emptyTitle}>
          {activeTab === 'upcoming' ? 'No Upcoming Visits' : 'No Visits Found'}
        </Text>
        <Text style={styles.emptySubtitle}>
          {activeTab === 'upcoming'
            ? 'Browse curated properties and schedule a free guided tour at your convenience.'
            : 'You do not have any past visits recorded yet.'}
        </Text>
        <TouchableOpacity
          activeOpacity={0.85}
          style={styles.discoverButton}
          onPress={() => navigation.navigate('Discover')}
        >
          <Text style={styles.discoverButtonText}>Explore Available Homes</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <StatusBar barStyle="dark-content" />

      {/*-------------------- Decorative Botanicals ----------------------*/}
      <Image
        source={require('../../assets/images/details_botanical_clean.png')}
        style={styles.topRightBotanical}
        resizeMode="contain"
      />
      <Image
        source={require('../../assets/images/botanical_left.png')}
        style={styles.bottomLeftBotanical}
        resizeMode="contain"
      />

      {/*-------------------- Toast Notification ----------------------*/}
      {toastMessage && (
        <View style={styles.toast}>
          <Text style={styles.toastText}>{toastMessage}</Text>
        </View>
      )}

      {/*-------------------- Visits List ----------------------*/}
      <FlatList
        data={filteredVisits}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <VisitCard
            visit={item}
            onPressDetails={() => handlePressDetails(item)}
            onPressMore={() => handleOpenMoreOptions(item)}
          />
        )}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={renderEmptyState}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => fetchApiVisits(true)}
            colors={['#0F4A3E']}
            tintColor="#0F4A3E"
          />
        }
      />

      {/*-------------------- More Options Action Sheet Modal ----------------------*/}
      <Modal
        visible={!!selectedVisitForOptions}
        transparent
        animationType="fade"
        onRequestClose={() => setSelectedVisitForOptions(null)}
      >
        <TouchableWithoutFeedback onPress={() => setSelectedVisitForOptions(null)}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View style={styles.modalSheet}>
                <View style={styles.modalHandle} />
                {selectedVisitForOptions && (
                  <>
                    <Text style={styles.modalSheetTitle}>
                      {selectedVisitForOptions.title}
                    </Text>
                    <Text style={styles.modalSheetSubtitle}>
                      Tour on {selectedVisitForOptions.month} {selectedVisitForOptions.day}, {selectedVisitForOptions.year} • {selectedVisitForOptions.timeSlot}
                    </Text>

                    <TouchableOpacity
                      activeOpacity={0.75}
                      style={styles.optionRow}
                      onPress={() => handleCallAgent(selectedVisitForOptions)}
                    >
                      <View style={styles.optionIconCircle}>
                        <Icons.Phone size={18} color="#0F4A3E" />
                      </View>
                      <View style={styles.optionTextWrapper}>
                        <Text style={styles.optionTitle}>
                          Call Agent ({selectedVisitForOptions.agent?.name || 'Property Advisor'})
                        </Text>
                        <Text style={styles.optionSubtitle}>
                          {selectedVisitForOptions.agent?.phone || 'Available for phone inquiries'}
                        </Text>
                      </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                      activeOpacity={0.75}
                      style={styles.optionRow}
                      onPress={() => handleMessageAgent(selectedVisitForOptions)}
                    >
                      <View style={styles.optionIconCircle}>
                        <Icons.MessageDots size={18} color="#0F4A3E" />
                      </View>
                      <View style={styles.optionTextWrapper}>
                        <Text style={styles.optionTitle}>Message Agent</Text>
                        <Text style={styles.optionSubtitle}>Chat regarding visit instructions</Text>
                      </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                      activeOpacity={0.75}
                      style={styles.optionRow}
                      onPress={() => handleOpenReschedule(selectedVisitForOptions)}
                    >
                      <View style={styles.optionIconCircle}>
                        <Icons.CalendarCheck size={18} color="#0F4A3E" />
                      </View>
                      <View style={styles.optionTextWrapper}>
                        <Text style={styles.optionTitle}>Reschedule Tour</Text>
                        <Text style={styles.optionSubtitle}>Select a different date or time slot</Text>
                      </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                      activeOpacity={0.75}
                      style={[styles.optionRow, styles.optionRowDanger]}
                      onPress={() => handleCancelVisit(selectedVisitForOptions)}
                    >
                      <View style={[styles.optionIconCircle, styles.optionIconCircleDanger]}>
                        <Icons.Close size={18} color="#DC2626" />
                      </View>
                      <View style={styles.optionTextWrapper}>
                        <Text style={styles.optionTitleDanger}>Cancel Visit</Text>
                        <Text style={styles.optionSubtitle}>Remove this tour from your schedule</Text>
                      </View>
                    </TouchableOpacity>
                  </>
                )}
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      {/*-------------------- Reschedule Modal ----------------------*/}
      <Modal
        visible={!!rescheduleVisit}
        transparent
        animationType="slide"
        onRequestClose={() => setRescheduleVisit(null)}
      >
        <TouchableWithoutFeedback onPress={() => setRescheduleVisit(null)}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View style={styles.modalSheet}>
                <View style={styles.modalHandle} />
                <Text style={styles.modalSheetTitle}>Reschedule Property Tour</Text>
                <Text style={styles.modalSheetSubtitle}>
                  Choose your new preferred date and time slot:
                </Text>

                {/*-------------------- Date Selection ----------------------*/}
                <Text style={styles.sectionLabel}>Select Date</Text>
                <View style={styles.datesGrid}>
                  {RESCHEDULE_DATES.map(item => {
                    const isSelected = selectedDateItem.day === item.day;
                    return (
                      <TouchableOpacity
                        key={item.day}
                        activeOpacity={0.75}
                        onPress={() => setSelectedDateItem(item)}
                        style={[
                          styles.datePill,
                          isSelected && styles.datePillActive,
                        ]}
                      >
                        <Text
                          style={[
                            styles.datePillLabel,
                            isSelected && styles.datePillLabelActive,
                          ]}
                        >
                          {item.label}
                        </Text>
                        <Text
                          style={[
                            styles.datePillValue,
                            isSelected && styles.datePillValueActive,
                          ]}
                        >
                          {item.day} {item.month}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>

                {/*-------------------- Time Slots ----------------------*/}
                <Text style={styles.sectionLabel}>Select Time Slot</Text>
                <View style={styles.timeSlotsGrid}>
                  {TIME_SLOTS.slice(0, 4).map(slot => {
                    const isSelected = selectedTimeSlot === slot;
                    return (
                      <TouchableOpacity
                        key={slot}
                        activeOpacity={0.75}
                        onPress={() => setSelectedTimeSlot(slot)}
                        style={[
                          styles.timeSlotPill,
                          isSelected && styles.timeSlotPillActive,
                        ]}
                      >
                        <Text
                          style={[
                            styles.timeSlotText,
                            isSelected && styles.timeSlotTextActive,
                          ]}
                        >
                          {slot}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>

                {/*-------------------- Action Buttons ----------------------*/}
                <View style={styles.modalActionsRow}>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => setRescheduleVisit(null)}
                    style={styles.modalCancelButton}
                  >
                    <Text style={styles.modalCancelButtonText}>Cancel</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    activeOpacity={0.85}
                    onPress={handleConfirmReschedule}
                    style={styles.modalConfirmButton}
                  >
                    <Text style={styles.modalConfirmButtonText}>
                      Confirm Reschedule
                    </Text>
                  </TouchableOpacity>
                </View>
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
  topRightBotanical: {
    position: 'absolute',
    top: -15,
    right: -10,
    width: 130,
    height: 140,
    opacity: 0.9,
    zIndex: 0,
    pointerEvents: 'none',
  },
  bottomLeftBotanical: {
    position: 'absolute',
    bottom: 20,
    left: -15,
    width: 80,
    height: 160,
    opacity: 0.45,
    zIndex: 0,
    pointerEvents: 'none',
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 40,
  },
  header: {
    paddingTop: 10,
    paddingBottom: 6,
    zIndex: 1,
  },
  titleSection: {
    marginBottom: 16,
  },
  mainTitle: {
    fontFamily: fontFamilies.heading,
    fontSize: 34,
    lineHeight: 40,
    fontWeight: '600',
    color: colors.textPrimary,
    letterSpacing: -0.4,
  },
  subtitle: {
    fontFamily: fontFamilies.bodyMedium,
    fontSize: 15,
    lineHeight: 21,
    color: colors.textSecondary,
    marginTop: 4,
    fontWeight: '500',
  },
  segmentedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#ECEAE4',
    padding: 3,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 3,
    elevation: 1,
  },
  segmentTab: {
    flex: 1,
    paddingVertical: 9,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  segmentTabActive: {
    backgroundColor: colors.primary,
  },
  segmentText: {
    fontFamily: fontFamilies.bodySemiBold,
    fontSize: 13.5,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  segmentTextActive: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  loadingContainer: {
    paddingVertical: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    fontFamily: fontFamilies.bodyMedium,
    fontSize: 15,
    color: colors.textSecondary,
    fontWeight: '500',
    marginTop: 12,
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
    fontSize: 14.5,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 21,
    marginBottom: 24,
    fontWeight: '500',
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
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    justifyContent: 'flex-end',
  },
  modalSheet: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 26,
    borderTopRightRadius: 26,
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
  modalSheetTitle: {
    fontFamily: fontFamilies.heading,
    fontSize: 20,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 4,
  },
  modalSheetSubtitle: {
    fontFamily: fontFamilies.bodyMedium,
    fontSize: 13.5,
    color: colors.textSecondary,
    marginBottom: 18,
    fontWeight: '500',
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 13,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  optionRowDanger: {
    borderBottomWidth: 0,
    marginTop: 4,
  },
  optionIconCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#F0F7F4',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  optionIconCircleDanger: {
    backgroundColor: '#FEE2E2',
  },
  optionTextWrapper: {
    flex: 1,
  },
  optionTitle: {
    fontFamily: fontFamilies.bodySemiBold,
    fontSize: 15,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  optionSubtitle: {
    fontFamily: fontFamilies.bodyMedium,
    fontSize: 12.5,
    color: colors.textSecondary,
    marginTop: 1,
    fontWeight: '500',
  },
  optionTitleDanger: {
    fontFamily: fontFamilies.bodySemiBold,
    fontSize: 15,
    fontWeight: '600',
    color: '#DC2626',
  },
  sectionLabel: {
    fontFamily: fontFamilies.bodySemiBold,
    fontSize: 13,
    fontWeight: '600',
    color: colors.textPrimary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 10,
    marginTop: 6,
  },
  datesGrid: {
    flexDirection: 'row',
    gap: 7,
    marginBottom: 16,
  },
  datePill: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 4,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: '#D4D0C8',
    backgroundColor: '#FAF9F6',
    alignItems: 'center',
  },
  datePillActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  datePillLabel: {
    fontFamily: fontFamilies.bodyMedium,
    fontSize: 11,
    fontWeight: '500',
    color: colors.textSecondary,
    marginBottom: 2,
  },
  datePillLabelActive: {
    color: colors.textLight,
  },
  datePillValue: {
    fontFamily: fontFamilies.bodySemiBold,
    fontSize: 12.5,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  datePillValueActive: {
    color: colors.textLight,
    fontWeight: '600',
  },
  timeSlotsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 24,
  },
  timeSlotPill: {
    paddingHorizontal: 12,
    paddingVertical: 9,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: '#D4D0C8',
    backgroundColor: '#FAF9F6',
  },
  timeSlotPillActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  timeSlotText: {
    fontFamily: fontFamilies.bodyMedium,
    fontSize: 13,
    fontWeight: '500',
    color: colors.textPrimary,
  },
  timeSlotTextActive: {
    fontFamily: fontFamilies.bodySemiBold,
    color: colors.textLight,
    fontWeight: '600',
  },
  modalActionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  modalCancelButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
  },
  modalCancelButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4B5563',
  },
  modalConfirmButton: {
    flex: 2,
    paddingVertical: 12,
    borderRadius: 22,
    backgroundColor: '#1E3E2F',
    alignItems: 'center',
  },
  modalConfirmButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});
