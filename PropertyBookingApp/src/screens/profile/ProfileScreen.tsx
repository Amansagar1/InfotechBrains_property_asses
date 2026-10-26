import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Modal,
  TextInput,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RootStackScreenProps } from '../../types/navigation';
import { Icons } from '../../components/common/Icons';
import { colors } from '../../theme/colors';
import { fontFamilies } from '../../theme/typography';
import { spacing, borderRadius } from '../../theme/spacing';
import { useApp } from '../../context/AppContext';

export type ProfileScreenProps = RootStackScreenProps<'Profile'>;

export const ProfileScreen: React.FC<ProfileScreenProps> = ({ navigation }) => {
  //-------------------- State & Handlers ----------------------
  const { savedProperties, bookedVisits, userProfile, updateUserProfile } = useApp();

  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [editName, setEditName] = useState(userProfile.name);
  const [editEmail, setEditEmail] = useState(userProfile.email);
  const [editPhone, setEditPhone] = useState(userProfile.phone);

  const handleSaveProfile = () => {
    updateUserProfile({
      name: editName.trim() || userProfile.name,
      email: editEmail.trim() || userProfile.email,
      phone: editPhone.trim() || userProfile.phone,
    });
    setIsEditModalVisible(false);
  };

  const handleLogOut = () => {
    Alert.alert(
      'Log Out',
      'Are you sure you want to sign out of your account?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Log Out',
          style: 'destructive',
          onPress: () => {
            (navigation as any).navigate('MainTabs', { screen: 'Discover' });
          },
        },
      ]
    );
  };

  //-------------------- Render ----------------------
  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <StatusBar barStyle="dark-content" />

      {/*-------------------- Top Botanical Background ----------------------*/}
      <Image
        source={require('../../assets/images/details_botanical_clean.png')}
        style={styles.topBotanical}
        resizeMode="contain"
      />

      {/*-------------------- Top Navigation Row ----------------------*/}
      <View style={styles.topNavRow}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Icons.ArrowLeft size={20} color={colors.textPrimary} />
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/*-------------------- Title Header ----------------------*/}
        <View style={styles.header}>
          <Text style={styles.title}>My Profile</Text>
          <Text style={styles.subtitle}>
            Manage your account and preferences.
          </Text>
        </View>

        {/*-------------------- Profile Card ----------------------*/}
        <View style={styles.profileCard}>
          <View style={styles.avatarWrapper}>
            <Image
              source={require('../../assets/images/avatar.png')}
              style={styles.avatarImage}
            />
            <View style={styles.editAvatarBadge}>
              <Icons.Pencil size={11} color="#FFFFFF" />
            </View>
          </View>

          <View style={styles.profileInfo}>
            <Text style={styles.profileName} numberOfLines={1}>
              {userProfile.name}
            </Text>
            <Text style={styles.profileEmail} numberOfLines={1}>
              {userProfile.email}
            </Text>
            <Text style={styles.profilePhone}>
              {userProfile.phone}
            </Text>
          </View>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              setEditName(userProfile.name);
              setEditEmail(userProfile.email);
              setEditPhone(userProfile.phone);
              setIsEditModalVisible(true);
            }}
            style={styles.editProfileButton}
          >
            <Text style={styles.editProfileText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        {/*-------------------- Quick Stats ----------------------*/}
        <View style={styles.statsCard}>
          <TouchableOpacity
            activeOpacity={0.75}
            onPress={() => (navigation as any).navigate('MainTabs', { screen: 'Saved' })}
            style={styles.statItem}
          >
            <View style={styles.statIconWrapper}>
              <Icons.Heart size={20} color={colors.primary} filled={false} />
            </View>
            <Text style={styles.statNumber}>{savedProperties.length}</Text>
            <Text style={styles.statLabel}>Saved{'\n'}Homes</Text>
          </TouchableOpacity>

          <View style={styles.statDivider} />

          <TouchableOpacity
            activeOpacity={0.75}
            onPress={() => (navigation as any).navigate('MainTabs', { screen: 'Visits' })}
            style={styles.statItem}
          >
            <View style={styles.statIconWrapper}>
              <Icons.CalendarCheck size={20} color={colors.primary} />
            </View>
            <Text style={styles.statNumber}>{bookedVisits.length}</Text>
            <Text style={styles.statLabel}>Total{'\n'}Visits</Text>
          </TouchableOpacity>

          <View style={styles.statDivider} />

          <TouchableOpacity
            activeOpacity={0.75}
            onPress={() => (navigation as any).navigate('MainTabs', { screen: 'Visits' })}
            style={styles.statItem}
          >
            <View style={styles.statIconWrapper}>
              <Icons.Clock size={20} color={colors.primary} />
            </View>
            <Text style={styles.statNumber}>
              {bookedVisits.filter(v => v.status === 'upcoming').length}
            </Text>
            <Text style={styles.statLabel}>Upcoming{'\n'}Visits</Text>
          </TouchableOpacity>

          <View style={styles.statDivider} />

          <TouchableOpacity
            activeOpacity={0.75}
            onPress={() => (navigation as any).navigate('MainTabs', { screen: 'Visits' })}
            style={styles.statItem}
          >
            <View style={styles.statIconWrapper}>
              <Icons.CheckCircle size={20} color={colors.primary} />
            </View>
            <Text style={styles.statNumber}>
              {bookedVisits.filter(v => v.status === 'completed' || v.status === 'cancelled').length}
            </Text>
            <Text style={styles.statLabel}>Past{'\n'}Visits</Text>
          </TouchableOpacity>
        </View>

        {/*-------------------- Menu Options ----------------------*/}
        <View style={styles.menuCard}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setIsEditModalVisible(true)}
            style={styles.menuItem}
          >
            <View style={styles.menuIconContainer}>
              <Icons.User size={18} color={colors.primary} />
            </View>
            <View style={styles.menuTextContainer}>
              <Text style={styles.menuTitle}>Personal Information</Text>
              <Text style={styles.menuSubtitle}>{userProfile.email || 'Name, email, phone number'}</Text>
            </View>
            <Icons.ChevronRight size={16} color={colors.textTertiary} />
          </TouchableOpacity>

          <View style={styles.menuDivider} />

          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => (navigation as any).navigate('MainTabs', { screen: 'Saved' })}
            style={styles.menuItem}
          >
            <View style={styles.menuIconContainer}>
              <Icons.Heart size={18} color={colors.primary} filled={false} />
            </View>
            <View style={styles.menuTextContainer}>
              <Text style={styles.menuTitle}>Saved Properties</Text>
              <Text style={styles.menuSubtitle}>
                {savedProperties.length === 1
                  ? '1 property saved in your shortlist'
                  : `${savedProperties.length} properties saved in your shortlist`}
              </Text>
            </View>
            <Icons.ChevronRight size={16} color={colors.textTertiary} />
          </TouchableOpacity>

          <View style={styles.menuDivider} />

          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => (navigation as any).navigate('MainTabs', { screen: 'Visits' })}
            style={styles.menuItem}
          >
            <View style={styles.menuIconContainer}>
              <Icons.CalendarCheck size={18} color={colors.primary} />
            </View>
            <View style={styles.menuTextContainer}>
              <Text style={styles.menuTitle}>My Scheduled Visits</Text>
              <Text style={styles.menuSubtitle}>
                {bookedVisits.length === 1
                  ? '1 active visit scheduled'
                  : `${bookedVisits.length} visits scheduled & tracked`}
              </Text>
            </View>
            <Icons.ChevronRight size={16} color={colors.textTertiary} />
          </TouchableOpacity>

          <View style={styles.menuDivider} />

          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => Alert.alert('Notifications', 'All push notifications are enabled.')}
            style={styles.menuItem}
          >
            <View style={styles.menuIconContainer}>
              <Icons.Bell size={18} color={colors.primary} />
            </View>
            <View style={styles.menuTextContainer}>
              <Text style={styles.menuTitle}>Notifications</Text>
              <Text style={styles.menuSubtitle}>Manage your notification preferences</Text>
            </View>
            <Icons.ChevronRight size={16} color={colors.textTertiary} />
          </TouchableOpacity>

          <View style={styles.menuDivider} />

          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => Alert.alert('Privacy & Security', 'Your data is encrypted and protected.')}
            style={styles.menuItem}
          >
            <View style={styles.menuIconContainer}>
              <Icons.Shield size={18} color={colors.primary} />
            </View>
            <View style={styles.menuTextContainer}>
              <Text style={styles.menuTitle}>Privacy & Security</Text>
              <Text style={styles.menuSubtitle}>Manage your data and privacy settings</Text>
            </View>
            <Icons.ChevronRight size={16} color={colors.textTertiary} />
          </TouchableOpacity>

          <View style={styles.menuDivider} />

          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => Alert.alert('App Settings', 'Version 1.0.0 (Release Build 2026)')}
            style={styles.menuItem}
          >
            <View style={styles.menuIconContainer}>
              <Icons.Settings size={18} color={colors.primary} />
            </View>
            <View style={styles.menuTextContainer}>
              <Text style={styles.menuTitle}>App Settings</Text>
              <Text style={styles.menuSubtitle}>Language, appearance, and version info</Text>
            </View>
            <Icons.ChevronRight size={16} color={colors.textTertiary} />
          </TouchableOpacity>
        </View>

        {/*-------------------- Log Out Option ----------------------*/}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={handleLogOut}
          style={styles.logoutCard}
        >
          <View style={styles.logoutIconContainer}>
            <Icons.LogOut size={18} color="#DC2626" />
          </View>
          <View style={styles.menuTextContainer}>
            <Text style={styles.logoutTitle}>Log Out</Text>
            <Text style={styles.logoutSubtitle}>Sign out from your account</Text>
          </View>
          <Icons.ChevronRight size={16} color="#DC2626" />
        </TouchableOpacity>
      </ScrollView>

      {/*-------------------- Edit Profile Modal ----------------------*/}
      <Modal
        visible={isEditModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setIsEditModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalHeader}>Edit Profile</Text>

            <Text style={styles.inputLabel}>Full Name</Text>
            <TextInput
              style={styles.textInput}
              value={editName}
              onChangeText={setEditName}
              placeholder="Your name"
            />

            <Text style={styles.inputLabel}>Email Address</Text>
            <TextInput
              style={styles.textInput}
              value={editEmail}
              onChangeText={setEditEmail}
              placeholder="Your email"
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <Text style={styles.inputLabel}>Phone Number</Text>
            <TextInput
              style={styles.textInput}
              value={editPhone}
              onChangeText={setEditPhone}
              placeholder="Your phone"
              keyboardType="phone-pad"
            />

            <View style={styles.modalActions}>
              <TouchableOpacity
                style={styles.modalCancelButton}
                onPress={() => setIsEditModalVisible(false)}
              >
                <Text style={styles.modalCancelText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.modalSaveButton}
                onPress={handleSaveProfile}
              >
                <Text style={styles.modalSaveText}>Save Changes</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

//-------------------- Styles ----------------------
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FAF9F6',
  },
  topBotanical: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 140,
    height: 140,
    opacity: 0.6,
  },
  topNavRow: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 4,
    zIndex: 10,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.round,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 48,
  },
  header: {
    marginTop: 8,
    marginBottom: 20,
  },
  title: {
    fontFamily: fontFamilies.headingSemiBold,
    fontSize: 32,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 4,
  },
  subtitle: {
    fontFamily: fontFamilies.bodyMedium,
    fontSize: 15,
    fontWeight: '500',
    color: colors.textSecondary,
  },
  profileCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1.5,
    borderColor: '#D8D4CA',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  avatarWrapper: {
    position: 'relative',
    marginRight: 14,
  },
  avatarImage: {
    width: 68,
    height: 68,
    borderRadius: 34,
  },
  editAvatarBadge: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  profileInfo: {
    flex: 1,
    marginRight: 8,
  },
  profileName: {
    fontFamily: fontFamilies.headingSemiBold,
    fontSize: 20,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 2,
  },
  profileEmail: {
    fontFamily: fontFamilies.bodyMedium,
    fontSize: 14.5,
    fontWeight: '500',
    color: colors.textSecondary,
    marginBottom: 2,
  },
  profilePhone: {
    fontFamily: fontFamilies.bodyMedium,
    fontSize: 14,
    fontWeight: '500',
    color: colors.textSecondary,
  },
  editProfileButton: {
    paddingVertical: 7,
    paddingHorizontal: 13,
    borderRadius: 16,
    borderWidth: 1.2,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  editProfileText: {
    fontFamily: fontFamilies.bodySemiBold,
    fontSize: 12.5,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  statsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingVertical: 16,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
    borderWidth: 1.5,
    borderColor: '#D8D4CA',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 2,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statIconWrapper: {
    marginBottom: 4,
  },
  statNumber: {
    fontFamily: fontFamilies.headingSemiBold,
    fontSize: 20,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 2,
  },
  statLabel: {
    fontFamily: fontFamilies.bodyMedium,
    fontSize: 12.5,
    fontWeight: '500',
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 15,
  },
  statDivider: {
    width: 1,
    height: 38,
    backgroundColor: '#D8D4CA',
  },
  menuCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    paddingVertical: 6,
    paddingHorizontal: 16,
    marginBottom: 14,
    borderWidth: 1.5,
    borderColor: '#D8D4CA',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 2,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
  },
  menuIconContainer: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#F0EFEA',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  menuTextContainer: {
    flex: 1,
  },
  menuTitle: {
    fontFamily: fontFamilies.bodySemiBold,
    fontSize: 16,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 2,
  },
  menuSubtitle: {
    fontFamily: fontFamilies.bodyMedium,
    fontSize: 13.5,
    fontWeight: '500',
    color: colors.textSecondary,
  },
  menuDivider: {
    height: 1,
    backgroundColor: '#E7E5DD',
  },
  logoutCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingVertical: 14,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#FCE8E6',
  },
  logoutIconContainer: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#FCE8E6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  logoutTitle: {
    fontFamily: fontFamilies.bodySemiBold,
    fontSize: 16,
    fontWeight: '600',
    color: '#DC2626',
    marginBottom: 2,
  },
  logoutSubtitle: {
    fontFamily: fontFamilies.bodyMedium,
    fontSize: 13.5,
    fontWeight: '500',
    color: colors.textSecondary,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 22,
    width: '100%',
    maxWidth: 360,
  },
  modalHeader: {
    fontFamily: fontFamilies.headingSemiBold,
    fontSize: 22,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 16,
  },
  inputLabel: {
    fontFamily: fontFamilies.bodySemiBold,
    fontSize: 13.5,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 6,
    marginTop: 8,
  },
  textInput: {
    backgroundColor: '#FAF9F6',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 15,
    fontFamily: fontFamilies.bodyMedium,
    fontWeight: '500',
    color: colors.textPrimary,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 22,
  },
  modalCancelButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginRight: 10,
  },
  modalCancelText: {
    fontFamily: fontFamilies.bodyMedium,
    fontSize: 14.5,
    fontWeight: '500',
    color: colors.textSecondary,
  },
  modalSaveButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 18,
  },
  modalSaveText: {
    fontFamily: fontFamilies.bodySemiBold,
    fontSize: 14.5,
    fontWeight: '600',
    color: colors.textLight,
  },
});
