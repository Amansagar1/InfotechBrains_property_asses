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
  Alert,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { VisitsScreenProps } from '../../types/navigation';
import { INITIAL_VISITS } from '../../constants/visits';
import { ScheduledVisit } from '../../types/visit';
import { VisitCard } from '../../components/visit/VisitCard';
import { Icons } from '../../components/common/Icons';
import { fontFamilies } from '../../theme/typography';
import { TIME_SLOTS } from '../../constants/config';

type FilterTab = 'all' | 'upcoming' | 'past';

const RESCHEDULE_DATES = [
  { label: 'Tomorrow', day: '16', month: 'OCT' },
  { label: 'Sat', day: '17', month: 'OCT' },
  { label: 'Sun', day: '18', month: 'OCT' },
  { label: 'Mon', day: '19', month: 'OCT' },
  { label: 'Tue', day: '20', month: 'OCT' },
];

export const VisitsScreen: React.FC<VisitsScreenProps> = ({ navigation }) => {
  const [visits, setVisits] = useState<ScheduledVisit[]>(INITIAL_VISITS);
  const [activeTab, setActiveTab] = useState<FilterTab>('all');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // More options state
  const [selectedVisitForOptions, setSelectedVisitForOptions] = useState<ScheduledVisit | null>(null);

  // Reschedule state
  const [rescheduleVisit, setRescheduleVisit] = useState<ScheduledVisit | null>(null);
  const [selectedDateItem, setSelectedDateItem] = useState(RESCHEDULE_DATES[0]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>(TIME_SLOTS[0]);

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
    navigation.navigate('PropertyDetails', {
      propertyId: visit.property.id,
      initialProperty: visit.property,
    });
  };

  const handleOpenMoreOptions = (visit: ScheduledVisit) => {
    setSelectedVisitForOptions(visit);
  };

  const handleCallAgent = (visit: ScheduledVisit) => {
    setSelectedVisitForOptions(null);
    showToast(`Calling ${visit.agent.name} (${visit.agent.phone})...`);
  };

  const handleMessageAgent = (visit: ScheduledVisit) => {
    setSelectedVisitForOptions(null);
    showToast(`Opening chat with ${visit.agent.name}...`);
  };

  const handleOpenReschedule = (visit: ScheduledVisit) => {
    setSelectedVisitForOptions(null);
    setRescheduleVisit(visit);
    setSelectedDateItem(RESCHEDULE_DATES[0]);
    setSelectedTimeSlot(visit.timeSlot || TIME_SLOTS[0]);
  };

  const handleConfirmReschedule = () => {
    if (!rescheduleVisit) return;

    setVisits(prev =>
      prev.map(v => {
        if (v.id === rescheduleVisit.id) {
          return {
            ...v,
            day: selectedDateItem.day,
            month: selectedDateItem.month,
            timeSlot: selectedTimeSlot,
            status: 'upcoming',
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
            setVisits(prev => prev.filter(v => v.id !== visit.id));
            showToast(`Cancelled tour for ${visit.title}`);
          },
        },
      ]
    );
  };

  const renderHeader = () => (
    <View style={styles.header}>
      {/* Title & Subtitle */}
      <View style={styles.titleSection}>
        <Text style={styles.mainTitle}>My Visits</Text>
        <Text style={styles.subtitle}>
          Your scheduled and past property visits.
        </Text>
      </View>

      {/* Segmented Filter Bar: All (3) | Upcoming (2) | Past (1) */}
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

  const renderEmptyState = () => (
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

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <StatusBar barStyle="dark-content" />

      {/* Decorative Botanical Elements Matching Screenshot */}
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

      {/* Toast Notification */}
      {toastMessage && (
        <View style={styles.toast}>
          <Text style={styles.toastText}>{toastMessage}</Text>
        </View>
      )}

      {/* Visits List */}
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
      />

      {/* More Options Action Sheet Modal */}
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

                    {/* Agent Call Button */}
                    <TouchableOpacity
                      activeOpacity={0.75}
                      style={styles.optionRow}
                      onPress={() => handleCallAgent(selectedVisitForOptions)}
                    >
                      <View style={styles.optionIconCircle}>
                        <Icons.Phone size={18} color="#0F4A3E" />
                      </View>
                      <View style={styles.optionTextWrapper}>
                        <Text style={styles.optionTitle}>Call Agent ({selectedVisitForOptions.agent.name})</Text>
                        <Text style={styles.optionSubtitle}>{selectedVisitForOptions.agent.phone}</Text>
                      </View>
                    </TouchableOpacity>

                    {/* Agent Message Button */}
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

                    {/* Reschedule Button */}
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

                    {/* Cancel Tour Button */}
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

      {/* Reschedule Modal */}
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

                {/* Date Selection Pills */}
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

                {/* Time Slots Selection */}
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

                {/* Action Buttons */}
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
    fontWeight: '700',
    color: '#111827',
    letterSpacing: -0.4,
  },
  subtitle: {
    fontFamily: fontFamilies.body,
    fontSize: 14.5,
    lineHeight: 21,
    color: '#6B7280',
    marginTop: 4,
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
    backgroundColor: '#1E3E2F',
  },
  segmentText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#374151',
  },
  segmentTextActive: {
    color: '#FFFFFF',
    fontWeight: '600',
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
    fontFamily: fontFamilies.heading,
    fontSize: 22,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
  },
  emptySubtitle: {
    fontFamily: fontFamilies.body,
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 24,
  },
  discoverButton: {
    backgroundColor: '#0F4A3E',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
  },
  discoverButtonText: {
    color: '#FFFFFF',
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
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  modalSheetSubtitle: {
    fontSize: 13,
    color: '#6B7280',
    marginBottom: 18,
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
    fontSize: 14.5,
    fontWeight: '600',
    color: '#111827',
  },
  optionSubtitle: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 1,
  },
  optionTitleDanger: {
    fontSize: 14.5,
    fontWeight: '600',
    color: '#DC2626',
  },
  sectionLabel: {
    fontSize: 12.5,
    fontWeight: '600',
    color: '#374151',
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
    borderWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: '#FAF9F6',
    alignItems: 'center',
  },
  datePillActive: {
    backgroundColor: '#1E3E2F',
    borderColor: '#1E3E2F',
  },
  datePillLabel: {
    fontSize: 10.5,
    fontWeight: '500',
    color: '#6B7280',
    marginBottom: 2,
  },
  datePillLabelActive: {
    color: '#E5E7EB',
  },
  datePillValue: {
    fontSize: 12,
    fontWeight: '700',
    color: '#111827',
  },
  datePillValueActive: {
    color: '#FFFFFF',
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
    borderWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: '#FAF9F6',
  },
  timeSlotPillActive: {
    backgroundColor: '#1E3E2F',
    borderColor: '#1E3E2F',
  },
  timeSlotText: {
    fontSize: 12.5,
    fontWeight: '500',
    color: '#374151',
  },
  timeSlotTextActive: {
    color: '#FFFFFF',
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
