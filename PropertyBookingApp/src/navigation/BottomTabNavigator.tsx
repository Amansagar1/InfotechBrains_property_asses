import React from 'react';
import { View, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomTabParamList } from '../types/navigation';
import { PropertyListingScreen } from '../screens/listing/PropertyListingScreen';
import { SavedPropertiesScreen } from '../screens/saved/SavedPropertiesScreen';
import { VisitsScreen } from '../screens/visits/VisitsScreen';
import { MessagesScreen } from '../screens/messages/MessagesScreen';
import { ProfileScreen } from '../screens/profile/ProfileScreen';
import { Icons } from '../components/common/Icons';

const Tab = createBottomTabNavigator<BottomTabParamList>();

const DiscoverTabIcon = ({ focused }: { focused: boolean }) =>
  focused ? (
    <View style={styles.activeIconCircle}>
      <Icons.Home size={17} color="#FFFFFF" />
    </View>
  ) : (
    <View style={styles.inactiveIconWrapper}>
      <Icons.Home size={20} color="#6B7280" />
    </View>
  );

const SavedTabIcon = ({ focused }: { focused: boolean }) =>
  focused ? (
    <View style={styles.activeIconCircle}>
      <Icons.Heart size={16} color="#FFFFFF" filled={true} />
    </View>
  ) : (
    <View style={styles.inactiveIconWrapper}>
      <Icons.Heart size={20} color="#6B7280" filled={false} />
    </View>
  );

const VisitsTabIcon = ({ focused }: { focused: boolean }) =>
  focused ? (
    <View style={styles.activeIconCircle}>
      <Icons.CalendarCheck size={17} color="#FFFFFF" />
    </View>
  ) : (
    <View style={styles.inactiveIconWrapper}>
      <Icons.CalendarCheck size={19} color="#6B7280" />
    </View>
  );

const MessagesTabIcon = ({ focused }: { focused: boolean }) =>
  focused ? (
    <View style={styles.activeIconCircle}>
      <Icons.MessageDots size={17} color="#FFFFFF" />
    </View>
  ) : (
    <View style={styles.inactiveIconWrapper}>
      <Icons.MessageDots size={19} color="#6B7280" />
    </View>
  );

const ProfileTabIcon = ({ focused }: { focused: boolean }) =>
  focused ? (
    <View style={styles.activeIconCircle}>
      <Icons.User size={17} color="#FFFFFF" />
    </View>
  ) : (
    <View style={styles.inactiveIconWrapper}>
      <Icons.User size={20} color="#6B7280" />
    </View>
  );

export const BottomTabNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      initialRouteName="Discover"
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarItemStyle: styles.tabBarItem,
        tabBarIconStyle: styles.tabBarIcon,
        tabBarLabelStyle: styles.tabLabel,
        tabBarActiveTintColor: '#0F4A3E',
        tabBarInactiveTintColor: '#6B7280',
        tabBarActiveBackgroundColor: 'transparent',
        tabBarInactiveBackgroundColor: 'transparent',
      }}
    >
      <Tab.Screen
        name="Discover"
        component={PropertyListingScreen}
        options={{
          tabBarLabel: 'Discover',
          tabBarIcon: DiscoverTabIcon,
        }}
      />

      <Tab.Screen
        name="Saved"
        component={SavedPropertiesScreen}
        options={{
          tabBarLabel: 'Saved',
          tabBarIcon: SavedTabIcon,
        }}
      />

      <Tab.Screen
        name="Visits"
        component={VisitsScreen}
        options={{
          tabBarLabel: 'Visits',
          tabBarIcon: VisitsTabIcon,
        }}
      />

      <Tab.Screen
        name="Messages"
        component={MessagesScreen}
        options={{
          tabBarLabel: 'Messages',
          tabBarIcon: MessagesTabIcon,
        }}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ProfileTabIcon,
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#ECEAE4',
    height: 72,
    paddingTop: 6,
    paddingBottom: 6,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
  },
  tabBarItem: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 2,
  },
  tabBarIcon: {
    width: 34,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 0,
  },
  activeIconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#0F4A3E',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inactiveIconWrapper: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabLabel: {
    fontSize: 12.5,
    fontWeight: '500',
    marginTop: 3,
    marginBottom: 0,
    paddingTop: 0,
    lineHeight: 16,
  },
});
