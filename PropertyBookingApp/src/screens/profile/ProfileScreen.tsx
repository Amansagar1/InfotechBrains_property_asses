import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  ScrollView,
  SafeAreaView,
  Platform,
  Modal,
  TextInput,
  Switch,
  Alert,
} from 'react-native';
import { ProfileScreenProps } from '../../types/navigation';
import { UserProfile } from '../../types/profile';
import { Icons } from '../../components/common/Icons';
import { fontFamilies } from '../../theme/typography';

const botanicalRight = require('../../assets/images/details_botanical_clean.png');
const defaultAvatar = require('../../assets/images/user_aman.jpg');

export const ProfileScreen: React.FC<ProfileScreenProps> = ({ navigation }) => {
  const [user, setUser] = useState<UserProfile>({
    name: 'Aman Sagar',
    email: 'aman@example.com',
    phone: '+91 98765 43210',
    avatar: defaultAvatar,
    savedCount: 3,
    visitsCount: 2,
    messagesCount: 4,
    enquiriesCount: 1,
  });

  // Modal States
  const [showEditModal, setShowEditModal] = useState(false);
  const [showNotificationsModal, setShowNotificationsModal] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  // Edit Profile Form State
  const [editName, setEditName] = useState(user.name);
  const [editEmail, setEditEmail] = useState(user.email);
  const [editPhone, setEditPhone] = useState(user.phone);

  // Notification Preferences State
  const [notifVisits, setNotifVisits] = useState(true);
  const [notifMessages, setNotifMessages] = useState(true);
  const [notifPriceDrops, setNotifPriceDrops] = useState(true);
  const [notifMarketing, setNotifMarketing] = useState(false);

  // Privacy & Security State
  const [biometricsEnabled, setBiometricsEnabled] = useState(true);
  const [shareActivity, setShareActivity] = useState(false);

  // App Settings State
  const [selectedCurrency, setSelectedCurrency] = useState<'INR' | 'USD'>('INR');
  const [selectedUnit, setSelectedUnit] = useState<'sqft' | 'sqm'>('sqft');

  const handleSaveProfile = () => {
    setUser(prev => ({
      ...prev,
      name: editName.trim() || prev.name,
      email: editEmail.trim() || prev.email,
      phone: editPhone.trim() || prev.phone,
    }));
    setShowEditModal(false);
  };

  const handleConfirmLogout = () => {
    setShowLogoutModal(false);
    Alert.alert('Logged Out', 'You have been safely signed out.');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header with Botanical Decoration */}
        <View style={styles.header}>
          {/* Decorative Organic Blob & Botanical Leaf top-right */}
          <View style={styles.blobBackground} pointerEvents="none" />
          <Image
            source={botanicalRight}
            style={styles.botanicalImage}
            resizeMode="contain"
            pointerEvents="none"
          />

          <View style={styles.titleContainer}>
            <Text style={styles.headerTitle}>My Profile</Text>
            <Text style={styles.headerSubtitle}>
              Manage your account and preferences.
            </Text>
          </View>
        </View>

        {/* User Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.avatarWrapper}>
            <Image source={user.avatar} style={styles.avatarImage} />
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={() => {
                setEditName(user.name);
                setEditEmail(user.email);
                setEditPhone(user.phone);
                setShowEditModal(true);
              }}
              style={styles.editPencilBadge}
            >
              <Icons.Pencil size={11} color="#FFFFFF" />
            </TouchableOpacity>
          </View>

          <View style={styles.profileInfo}>
            <Text style={styles.profileName} numberOfLines={1}>
              {user.name}
            </Text>
            <Text style={styles.profileMeta} numberOfLines={1}>
              {user.email}
            </Text>
            <Text style={styles.profileMeta} numberOfLines={1}>
              {user.phone}
            </Text>
          </View>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              setEditName(user.name);
              setEditEmail(user.email);
              setEditPhone(user.phone);
              setShowEditModal(true);
            }}
            style={styles.editProfileButton}
          >
            <Text style={styles.editProfileButtonText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        {/* Summary Stats Grid */}
        <View style={styles.statsCard}>
          <TouchableOpacity
            activeOpacity={0.75}
            onPress={() => navigation.navigate('Saved')}
            style={styles.statColumn}
          >
            <Icons.Heart size={21} color="#1E3E2F" filled={true} />
            <Text style={styles.statCount}>{user.savedCount}</Text>
            <Text style={styles.statLabel}>Saved{'\n'}Properties</Text>
          </TouchableOpacity>

          <View style={styles.statDivider} />

          <TouchableOpacity
            activeOpacity={0.75}
            onPress={() => navigation.navigate('Visits')}
            style={styles.statColumn}
          >
            <Icons.CalendarCheck size={21} color="#1E3E2F" />
            <Text style={styles.statCount}>{user.visitsCount}</Text>
            <Text style={styles.statLabel}>Property{'\n'}Visits</Text>
          </TouchableOpacity>

          <View style={styles.statDivider} />

          <TouchableOpacity
            activeOpacity={0.75}
            onPress={() => navigation.navigate('Messages')}
            style={styles.statColumn}
          >
            <Icons.MessageDots size={21} color="#1E3E2F" />
            <Text style={styles.statCount}>{user.messagesCount}</Text>
            <Text style={styles.statLabel}>Messages</Text>
          </TouchableOpacity>

          <View style={styles.statDivider} />

          <TouchableOpacity
            activeOpacity={0.75}
            onPress={() => navigation.navigate('Discover')}
            style={styles.statColumn}
          >
            <Icons.Home size={21} color="#1E3E2F" />
            <Text style={styles.statCount}>{user.enquiriesCount}</Text>
            <Text style={styles.statLabel}>Enquiries</Text>
          </TouchableOpacity>
        </View>

        {/* Main Settings Menu Card */}
        <View style={styles.menuCard}>
          {/* 1. Personal Information */}
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              setEditName(user.name);
              setEditEmail(user.email);
              setEditPhone(user.phone);
              setShowEditModal(true);
            }}
            style={styles.menuRow}
          >
            <View style={styles.iconCircle}>
              <Icons.User size={20} color="#1E3E2F" />
            </View>
            <View style={styles.menuTextContainer}>
              <Text style={styles.menuTitle}>Personal Information</Text>
              <Text style={styles.menuSubtitle}>
                Name, email, phone number
              </Text>
            </View>
            <Icons.ChevronRight size={17} color="#9CA3AF" />
          </TouchableOpacity>

          <View style={styles.menuRowDivider} />

          {/* 2. Saved Properties */}
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigation.navigate('Saved')}
            style={styles.menuRow}
          >
            <View style={styles.iconCircle}>
              <Icons.Heart size={20} color="#1E3E2F" filled={false} />
            </View>
            <View style={styles.menuTextContainer}>
              <Text style={styles.menuTitle}>Saved Properties</Text>
              <Text style={styles.menuSubtitle}>
                View and manage your saved properties
              </Text>
            </View>
            <Icons.ChevronRight size={17} color="#9CA3AF" />
          </TouchableOpacity>

          <View style={styles.menuRowDivider} />

          {/* 3. My Visits */}
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigation.navigate('Visits')}
            style={styles.menuRow}
          >
            <View style={styles.iconCircle}>
              <Icons.CalendarCheck size={20} color="#1E3E2F" />
            </View>
            <View style={styles.menuTextContainer}>
              <Text style={styles.menuTitle}>My Visits</Text>
              <Text style={styles.menuSubtitle}>
                Upcoming and past property visits
              </Text>
            </View>
            <Icons.ChevronRight size={17} color="#9CA3AF" />
          </TouchableOpacity>

          <View style={styles.menuRowDivider} />

          {/* 4. Messages */}
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigation.navigate('Messages')}
            style={styles.menuRow}
          >
            <View style={styles.iconCircle}>
              <Icons.Chat size={20} color="#1E3E2F" />
            </View>
            <View style={styles.menuTextContainer}>
              <Text style={styles.menuTitle}>Messages</Text>
              <Text style={styles.menuSubtitle}>
                Chat with property owners and agents
              </Text>
            </View>
            <Icons.ChevronRight size={17} color="#9CA3AF" />
          </TouchableOpacity>

          <View style={styles.menuRowDivider} />

          {/* 5. Notifications */}
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setShowNotificationsModal(true)}
            style={styles.menuRow}
          >
            <View style={styles.iconCircle}>
              <Icons.Bell size={20} color="#1E3E2F" />
            </View>
            <View style={styles.menuTextContainer}>
              <Text style={styles.menuTitle}>Notifications</Text>
              <Text style={styles.menuSubtitle}>
                Manage your notification preferences
              </Text>
            </View>
            <Icons.ChevronRight size={17} color="#9CA3AF" />
          </TouchableOpacity>

          <View style={styles.menuRowDivider} />

          {/* 6. Privacy & Security */}
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setShowPrivacyModal(true)}
            style={styles.menuRow}
          >
            <View style={styles.iconCircle}>
              <Icons.Shield size={20} color="#1E3E2F" />
            </View>
            <View style={styles.menuTextContainer}>
              <Text style={styles.menuTitle}>Privacy & Security</Text>
              <Text style={styles.menuSubtitle}>
                Manage your privacy settings
              </Text>
            </View>
            <Icons.ChevronRight size={17} color="#9CA3AF" />
          </TouchableOpacity>

          <View style={styles.menuRowDivider} />

          {/* 7. App Settings */}
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setShowSettingsModal(true)}
            style={styles.menuRow}
          >
            <View style={styles.iconCircle}>
              <Icons.Settings size={20} color="#1E3E2F" />
            </View>
            <View style={styles.menuTextContainer}>
              <Text style={styles.menuTitle}>App Settings</Text>
              <Text style={styles.menuSubtitle}>
                Language, appearance and more
              </Text>
            </View>
            <Icons.ChevronRight size={17} color="#9CA3AF" />
          </TouchableOpacity>
        </View>

        {/* Log Out Card */}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => setShowLogoutModal(true)}
          style={styles.logoutCard}
        >
          <View style={styles.logoutIconCircle}>
            <Icons.LogOut size={20} color="#DC2626" />
          </View>
          <View style={styles.menuTextContainer}>
            <Text style={styles.logoutTitle}>Log Out</Text>
            <Text style={styles.menuSubtitle}>Sign out from your account</Text>
          </View>
          <Icons.ChevronRight size={17} color="#9CA3AF" />
        </TouchableOpacity>
      </ScrollView>

      {/* 1. Edit Profile Modal */}
      <Modal
        visible={showEditModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowEditModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalSheet}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Edit Profile</Text>
              <TouchableOpacity
                onPress={() => setShowEditModal(false)}
                style={styles.modalCloseButton}
              >
                <Icons.Close size={20} color="#6B7280" />
              </TouchableOpacity>
            </View>

            <View style={styles.modalFieldGroup}>
              <Text style={styles.fieldLabel}>Full Name</Text>
              <TextInput
                style={styles.fieldInput}
                value={editName}
                onChangeText={setEditName}
                placeholder="Enter full name"
                placeholderTextColor="#9CA3AF"
              />
            </View>

            <View style={styles.modalFieldGroup}>
              <Text style={styles.fieldLabel}>Email Address</Text>
              <TextInput
                style={styles.fieldInput}
                value={editEmail}
                onChangeText={setEditEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                placeholder="Enter email address"
                placeholderTextColor="#9CA3AF"
              />
            </View>

            <View style={styles.modalFieldGroup}>
              <Text style={styles.fieldLabel}>Phone Number</Text>
              <TextInput
                style={styles.fieldInput}
                value={editPhone}
                onChangeText={setEditPhone}
                keyboardType="phone-pad"
                placeholder="Enter phone number"
                placeholderTextColor="#9CA3AF"
              />
            </View>

            <TouchableOpacity
              activeOpacity={0.85}
              onPress={handleSaveProfile}
              style={styles.primaryActionButton}
            >
              <Text style={styles.primaryActionButtonText}>Save Changes</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* 2. Notifications Modal */}
      <Modal
        visible={showNotificationsModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowNotificationsModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalSheet}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Notification Settings</Text>
              <TouchableOpacity
                onPress={() => setShowNotificationsModal(false)}
                style={styles.modalCloseButton}
              >
                <Icons.Close size={20} color="#6B7280" />
              </TouchableOpacity>
            </View>

            <View style={styles.toggleRow}>
              <View style={styles.toggleTextContainer}>
                <Text style={styles.toggleTitle}>Visit Reminders</Text>
                <Text style={styles.toggleSubtitle}>
                  Alerts for scheduled site visits
                </Text>
              </View>
              <Switch
                value={notifVisits}
                onValueChange={setNotifVisits}
                trackColor={{ false: '#D1D5DB', true: '#1E3E2F' }}
                thumbColor="#FFFFFF"
              />
            </View>

            <View style={styles.toggleRow}>
              <View style={styles.toggleTextContainer}>
                <Text style={styles.toggleTitle}>New Messages</Text>
                <Text style={styles.toggleSubtitle}>
                  Notifications from property owners & agents
                </Text>
              </View>
              <Switch
                value={notifMessages}
                onValueChange={setNotifMessages}
                trackColor={{ false: '#D1D5DB', true: '#1E3E2F' }}
                thumbColor="#FFFFFF"
              />
            </View>

            <View style={styles.toggleRow}>
              <View style={styles.toggleTextContainer}>
                <Text style={styles.toggleTitle}>Price Drop Alerts</Text>
                <Text style={styles.toggleSubtitle}>
                  Get notified when saved properties change price
                </Text>
              </View>
              <Switch
                value={notifPriceDrops}
                onValueChange={setNotifPriceDrops}
                trackColor={{ false: '#D1D5DB', true: '#1E3E2F' }}
                thumbColor="#FFFFFF"
              />
            </View>

            <View style={styles.toggleRow}>
              <View style={styles.toggleTextContainer}>
                <Text style={styles.toggleTitle}>Recommended Listings</Text>
                <Text style={styles.toggleSubtitle}>
                  Curated properties tailored to your searches
                </Text>
              </View>
              <Switch
                value={notifMarketing}
                onValueChange={setNotifMarketing}
                trackColor={{ false: '#D1D5DB', true: '#1E3E2F' }}
                thumbColor="#FFFFFF"
              />
            </View>

            <TouchableOpacity
              activeOpacity={0.85}
              onPress={() => setShowNotificationsModal(false)}
              style={styles.primaryActionButton}
            >
              <Text style={styles.primaryActionButtonText}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* 3. Privacy & Security Modal */}
      <Modal
        visible={showPrivacyModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowPrivacyModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalSheet}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Privacy & Security</Text>
              <TouchableOpacity
                onPress={() => setShowPrivacyModal(false)}
                style={styles.modalCloseButton}
              >
                <Icons.Close size={20} color="#6B7280" />
              </TouchableOpacity>
            </View>

            <View style={styles.toggleRow}>
              <View style={styles.toggleTextContainer}>
                <Text style={styles.toggleTitle}>Biometric App Lock</Text>
                <Text style={styles.toggleSubtitle}>
                  Require Fingerprint / Face ID to open app
                </Text>
              </View>
              <Switch
                value={biometricsEnabled}
                onValueChange={setBiometricsEnabled}
                trackColor={{ false: '#D1D5DB', true: '#1E3E2F' }}
                thumbColor="#FFFFFF"
              />
            </View>

            <View style={styles.toggleRow}>
              <View style={styles.toggleTextContainer}>
                <Text style={styles.toggleTitle}>Search Activity Sharing</Text>
                <Text style={styles.toggleSubtitle}>
                  Allow verified agents to match preferred homes
                </Text>
              </View>
              <Switch
                value={shareActivity}
                onValueChange={setShareActivity}
                trackColor={{ false: '#D1D5DB', true: '#1E3E2F' }}
                thumbColor="#FFFFFF"
              />
            </View>

            <TouchableOpacity
              activeOpacity={0.85}
              onPress={() => setShowPrivacyModal(false)}
              style={styles.primaryActionButton}
            >
              <Text style={styles.primaryActionButtonText}>Save Settings</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* 4. App Settings Modal */}
      <Modal
        visible={showSettingsModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowSettingsModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalSheet}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>App Settings</Text>
              <TouchableOpacity
                onPress={() => setShowSettingsModal(false)}
                style={styles.modalCloseButton}
              >
                <Icons.Close size={20} color="#6B7280" />
              </TouchableOpacity>
            </View>

            <Text style={styles.settingsSectionTitle}>Currency Preference</Text>
            <View style={styles.pillSelectorRow}>
              <TouchableOpacity
                onPress={() => setSelectedCurrency('INR')}
                style={[
                  styles.pillOption,
                  selectedCurrency === 'INR' && styles.pillOptionActive,
                ]}
              >
                <Text
                  style={[
                    styles.pillOptionText,
                    selectedCurrency === 'INR' && styles.pillOptionTextActive,
                  ]}
                >
                  ₹ INR (Indian Rupee)
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setSelectedCurrency('USD')}
                style={[
                  styles.pillOption,
                  selectedCurrency === 'USD' && styles.pillOptionActive,
                ]}
              >
                <Text
                  style={[
                    styles.pillOptionText,
                    selectedCurrency === 'USD' && styles.pillOptionTextActive,
                  ]}
                >
                  $ USD (US Dollar)
                </Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.settingsSectionTitle}>Unit of Measurement</Text>
            <View style={styles.pillSelectorRow}>
              <TouchableOpacity
                onPress={() => setSelectedUnit('sqft')}
                style={[
                  styles.pillOption,
                  selectedUnit === 'sqft' && styles.pillOptionActive,
                ]}
              >
                <Text
                  style={[
                    styles.pillOptionText,
                    selectedUnit === 'sqft' && styles.pillOptionTextActive,
                  ]}
                >
                  sq ft (Square Feet)
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setSelectedUnit('sqm')}
                style={[
                  styles.pillOption,
                  selectedUnit === 'sqm' && styles.pillOptionActive,
                ]}
              >
                <Text
                  style={[
                    styles.pillOptionText,
                    selectedUnit === 'sqm' && styles.pillOptionTextActive,
                  ]}
                >
                  sq m (Square Meters)
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.versionContainer}>
              <Text style={styles.versionText}>
                Luxury Real Estate App v1.2.0 • Bangalore Edition
              </Text>
            </View>

            <TouchableOpacity
              activeOpacity={0.85}
              onPress={() => setShowSettingsModal(false)}
              style={styles.primaryActionButton}
            >
              <Text style={styles.primaryActionButtonText}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* 5. Log Out Confirmation Modal */}
      <Modal
        visible={showLogoutModal}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setShowLogoutModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.alertCard}>
            <View style={styles.alertIconCircle}>
              <Icons.LogOut size={26} color="#DC2626" />
            </View>
            <Text style={styles.alertTitle}>Log Out</Text>
            <Text style={styles.alertMessage}>
              Are you sure you want to sign out of your account?
            </Text>
            <View style={styles.alertActionsRow}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => setShowLogoutModal(false)}
                style={styles.alertCancelButton}
              >
                <Text style={styles.alertCancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.85}
                onPress={handleConfirmLogout}
                style={styles.alertConfirmButton}
              >
                <Text style={styles.alertConfirmButtonText}>Log Out</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FAF8F5',
  },
  scrollContent: {
    paddingBottom: 24,
  },
  header: {
    position: 'relative',
    paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight ?? 24) + 12 : 16,
    paddingHorizontal: 16,
    paddingBottom: 16,
    overflow: 'hidden',
  },
  blobBackground: {
    position: 'absolute',
    top: -25,
    right: -25,
    width: 170,
    height: 170,
    borderRadius: 85,
    backgroundColor: '#ECE7DC',
    opacity: 0.65,
  },
  botanicalImage: {
    position: 'absolute',
    top: -10,
    right: -5,
    width: 95,
    height: 175,
    opacity: 0.85,
  },
  titleContainer: {
    maxWidth: '75%',
  },
  headerTitle: {
    fontFamily: fontFamilies.heading,
    fontSize: 34,
    fontWeight: '700',
    color: '#111827',
    letterSpacing: -0.5,
  },
  headerSubtitle: {
    fontSize: 14.5,
    color: '#6B7280',
    marginTop: 5,
    lineHeight: 21,
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#ECEAE4',
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  avatarWrapper: {
    position: 'relative',
    width: 72,
    height: 72,
    borderRadius: 36,
  },
  avatarImage: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#E5E7EB',
  },
  editPencilBadge: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#1E3E2F',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  profileInfo: {
    flex: 1,
    marginLeft: 14,
    justifyContent: 'center',
  },
  profileName: {
    fontFamily: fontFamilies.heading,
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    letterSpacing: -0.3,
  },
  profileMeta: {
    fontSize: 13.5,
    color: '#6B7280',
    marginTop: 2,
  },
  editProfileButton: {
    borderWidth: 1,
    borderColor: '#1E3E2F',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 7,
  },
  editProfileButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1E3E2F',
  },
  statsCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    borderWidth: 1,
    borderColor: '#ECEAE4',
    paddingVertical: 14,
    paddingHorizontal: 8,
    marginHorizontal: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 5,
    elevation: 2,
  },
  statColumn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statCount: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginTop: 6,
  },
  statLabel: {
    fontSize: 11.5,
    color: '#6B7280',
    textAlign: 'center',
    marginTop: 2,
    lineHeight: 15,
  },
  statDivider: {
    width: 1,
    height: 36,
    backgroundColor: '#ECEAE4',
  },
  menuCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#ECEAE4',
    marginHorizontal: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 5,
    elevation: 2,
  },
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  iconCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#EDF5F1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuTextContainer: {
    flex: 1,
    marginLeft: 14,
  },
  menuTitle: {
    fontFamily: fontFamilies.heading,
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    letterSpacing: -0.2,
  },
  menuSubtitle: {
    fontSize: 12.5,
    color: '#6B7280',
    marginTop: 2,
  },
  menuRowDivider: {
    height: 1,
    backgroundColor: '#F3F1EC',
    marginLeft: 72,
  },
  logoutCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    borderWidth: 1,
    borderColor: '#ECEAE4',
    marginHorizontal: 16,
    marginTop: 14,
    paddingVertical: 14,
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 5,
    elevation: 2,
  },
  logoutIconCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#FEE2E2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#DC2626',
    letterSpacing: -0.2,
  },

  /* Modal Sheets */
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    justifyContent: 'flex-end',
  },
  modalSheet: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: Platform.OS === 'ios' ? 36 : 24,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 18,
  },
  modalTitle: {
    fontFamily: fontFamilies.heading,
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
  },
  modalCloseButton: {
    padding: 6,
  },
  modalFieldGroup: {
    marginBottom: 16,
  },
  fieldLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 6,
  },
  fieldInput: {
    backgroundColor: '#F5F3EF',
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 15,
    color: '#111827',
    borderWidth: 1,
    borderColor: '#ECEAE4',
  },
  primaryActionButton: {
    backgroundColor: '#1E3E2F',
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  primaryActionButtonText: {
    color: '#FFFFFF',
    fontSize: 15.5,
    fontWeight: '700',
  },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F1EC',
  },
  toggleTextContainer: {
    flex: 1,
    marginRight: 14,
  },
  toggleTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111827',
  },
  toggleSubtitle: {
    fontSize: 12.5,
    color: '#6B7280',
    marginTop: 2,
  },
  settingsSectionTitle: {
    fontSize: 13.5,
    fontWeight: '600',
    color: '#374151',
    marginTop: 8,
    marginBottom: 8,
  },
  pillSelectorRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 14,
  },
  pillOption: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ECEAE4',
    backgroundColor: '#F9F8F5',
    alignItems: 'center',
  },
  pillOptionActive: {
    backgroundColor: '#EDF5F1',
    borderColor: '#1E3E2F',
  },
  pillOptionText: {
    fontSize: 12.5,
    color: '#4B5563',
    fontWeight: '500',
  },
  pillOptionTextActive: {
    color: '#1E3E2F',
    fontWeight: '700',
  },
  versionContainer: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  versionText: {
    fontSize: 12,
    color: '#9CA3AF',
  },

  /* Alert Card for Log Out */
  alertCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 22,
    marginHorizontal: 24,
    marginBottom: 'auto',
    marginTop: 'auto',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 8,
  },
  alertIconCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#FEE2E2',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
  alertTitle: {
    fontFamily: fontFamilies.heading,
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 6,
  },
  alertMessage: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 20,
  },
  alertActionsRow: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
  },
  alertCancelButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#ECEAE4',
    alignItems: 'center',
    backgroundColor: '#F9F8F5',
  },
  alertCancelButtonText: {
    fontSize: 14.5,
    fontWeight: '600',
    color: '#374151',
  },
  alertConfirmButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 14,
    backgroundColor: '#DC2626',
    alignItems: 'center',
  },
  alertConfirmButtonText: {
    fontSize: 14.5,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
