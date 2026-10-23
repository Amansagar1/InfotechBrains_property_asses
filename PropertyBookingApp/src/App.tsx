import React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppNavigator } from './navigation/AppNavigator';
import { colors } from './theme/colors';

export const App: React.FC = () => {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content" />
      <AppNavigator />
    </SafeAreaProvider>
  );
};

export default App;
