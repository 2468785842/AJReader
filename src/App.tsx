import { useEffect, useState } from 'react';

import { Appearance } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { PaperProvider } from 'react-native-paper';

import { getCombinedTheme } from 'themes';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { setI18nLocale } from 'i18n';
import { useAppSelector, useThemeTypeSelector } from 'redux/hooks';
import BottomNav from 'screens/navigation/BottomNav';
import ThemeScreen from 'screens/ThemeScreen';

export type AppStackParamList = {
  BottomNav: undefined;
  Theme: undefined;
};

const AppNativeStack = createNativeStackNavigator<AppStackParamList>();

export default function App() {
  const themeType = useThemeTypeSelector();

  const [combinedTheme, setCombinedTheme] = useState(
    getCombinedTheme(themeType),
  );

  useEffect(() => {
    // maybe user change
    setCombinedTheme(getCombinedTheme(themeType));

    // maybe system
    const subscription = Appearance.addChangeListener(({colorScheme}) => {
      if (themeType === 'system') {
        setCombinedTheme(getCombinedTheme(colorScheme));
      }
    });

    return () => subscription.remove();
  }, [themeType]);

  const languageCode = useAppSelector(
    ({userSetting}) => userSetting.languageCode,
  );

  useEffect(() => setI18nLocale(languageCode), [languageCode]);

  return (
    <PaperProvider theme={combinedTheme}>
      <NavigationContainer theme={combinedTheme}>
        <AppNativeStack.Navigator
          initialRouteName="BottomNav"
          screenOptions={{
            headerShown: false,
          }}>
          <AppNativeStack.Screen name="BottomNav" component={BottomNav} />
          <AppNativeStack.Screen
            name="Theme"
            component={ThemeScreen}
            options={{headerShown: true}}
          />
        </AppNativeStack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
