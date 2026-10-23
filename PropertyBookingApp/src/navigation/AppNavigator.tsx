import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { BottomTabNavigator } from './BottomTabNavigator';
import { PropertyDetailsScreen } from '../screens/details/PropertyDetailsScreen';
import { BookVisitScreen } from '../screens/booking/BookVisitScreen';
import { BookingConfirmationScreen } from '../screens/confirmation/BookingConfirmationScreen';
import { colors } from '../theme/colors';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="MainTabs"
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colors.background },
          animation: 'slide_from_right',
        }}
      >
        <Stack.Screen name="MainTabs" component={BottomTabNavigator} />
        <Stack.Screen name="PropertyDetails" component={PropertyDetailsScreen} />
        <Stack.Screen name="BookVisit" component={BookVisitScreen} />
        <Stack.Screen
          name="BookingConfirmation"
          component={BookingConfirmationScreen}
          options={{
            gestureEnabled: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
