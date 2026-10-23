import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomTabParamList } from '../types/navigation';
import { PropertyListingScreen } from '../screens/listing/PropertyListingScreen';
import { Icons } from '../components/common/Icons';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { spacing } from '../theme/spacing';

const Tab = createBottomTabNavigator<BottomTabParamList>();

const PlaceholderScreen = ({ title }: { title: string }) => (
  <View style={styles.placeholderContainer}>
    <Text style={styles.placeholderTitle}>{title}</Text>
    <Text style={styles.placeholderSubtitle}>
      This feature is available in the full version.
    </Text>
  </View>
);

export const BottomTabNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarLabelStyle: styles.tabLabel,
      }}
    >
      <Tab.Screen
        name="Discover"
        component={PropertyListingScreen}
        options={{
          tabBarLabel: 'Discover',
          tabBarIcon: ({ focused }) => (
            focused ? (
              <View style={styles.activeIconCircle}>
                <Icons.Home size={18} color="#FFFFFF" />
              </View>
            ) : (
              <Icons.Home size={20} color={colors.textSecondary} />
            )
          ),
        }}
      />

      <Tab.Screen
        name="Saved"
        children={() => <PlaceholderScreen title="Saved Properties" />}
        options={{
          tabBarLabel: 'Saved',
          tabBarIcon: ({ color, focused }) => (
            <Icons.Heart size={20} color={color} filled={focused} />
          ),
        }}
      />

      <Tab.Screen
        name="Visits"
        children={() => <PlaceholderScreen title="Scheduled Visits" />}
        options={{
          tabBarLabel: 'Visits',
          tabBarIcon: ({ color }) => (
            <Icons.Calendar size={20} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        children={() => <PlaceholderScreen title="User Profile" />}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color }) => (
            <Icons.User size={20} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: colors.card,
    borderTopWidth: 1,
    borderTopColor: colors.borderSubtle,
    height: 64,
    paddingBottom: spacing.sm,
    paddingTop: spacing.xs,
  },
  activeIconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -4,
  },
  tabLabel: {
    ...typography.badge,
    fontSize: 11,
    fontWeight: '500',
  },
  placeholderContainer: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
  },
  placeholderTitle: {
    ...typography.h2,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  placeholderSubtitle: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});
