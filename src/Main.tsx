import * as React from 'react';
import {PaperProvider} from 'react-native-paper';
import {Provider as StoreProvider} from 'react-redux';

import {Appearance} from 'react-native';

import i18n from './i18n';
import {store, persistor} from './redux/store';

import {
  NavigationContainer,
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';

import {
  MD3DarkTheme,
  MD3LightTheme,
  adaptNavigationTheme,
} from 'react-native-paper';

import {createMaterialBottomTabNavigator} from 'react-native-paper/react-navigation';

import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

import HomeScreen from './screens/HomeScreen';
import SettingScreen from './screens/SettingScreen';
import { PersistGate } from 'redux-persist/integration/react';

const {LightTheme, DarkTheme} = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
});

const CombinedDefaultTheme = {
  ...MD3LightTheme,
  ...LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    ...LightTheme.colors,
  },
};

const CombinedDarkTheme = {
  ...MD3DarkTheme,
  ...DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    ...DarkTheme.colors,
  },
};

const Tab = createMaterialBottomTabNavigator();

export default function Main() {
  let CombinedTheme = CombinedDefaultTheme;

  const colorScheme = Appearance.getColorScheme();

  if (colorScheme === 'dark') {
    CombinedTheme = CombinedDarkTheme;
  }

  return (
    <StoreProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <PaperProvider theme={CombinedTheme}>
          <NavigationContainer theme={CombinedTheme}>
            <Tab.Navigator initialRouteName="Home">
              <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                  tabBarLabel: i18n.t('home.title'),
                  tabBarIcon: ({color}) => (
                    <SimpleLineIcons name="home" color={color} size={26} />
                  ),
                }}
              />
              <Tab.Screen
                name="Setting"
                component={SettingScreen}
                options={{
                  tabBarLabel: i18n.t('setting.title'),
                  tabBarIcon: ({color}) => (
                    <SimpleLineIcons name="settings" color={color} size={26} />
                  ),
                }}
              />
            </Tab.Navigator>
          </NavigationContainer>
        </PaperProvider>
      </PersistGate>
    </StoreProvider>
  );
}
