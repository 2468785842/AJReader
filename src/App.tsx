import {useEffect, useState} from 'react';

import {Appearance} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {PaperProvider} from 'react-native-paper';

import {getCombinedTheme} from 'themes';

import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {setI18nLocale} from 'i18n';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {useAppSelector, useThemeTypeSelector} from 'redux/hooks';
import BottomNav from 'screens/navigation/BottomNavigator';

export type AppStackParamList = {
  BottomNav: undefined;
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
      <GestureHandlerRootView style={{flex: 1}}>
        <BottomSheetModalProvider>
          <NavigationContainer theme={combinedTheme}>
            <AppNativeStack.Navigator
              initialRouteName="BottomNav"
              screenOptions={{
                headerShown: false,
              }}>
              <AppNativeStack.Screen name="BottomNav" component={BottomNav} />
            </AppNativeStack.Navigator>
          </NavigationContainer>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </PaperProvider>
  );
}
