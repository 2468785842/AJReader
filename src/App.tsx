import {useEffect, useState} from 'react';

import {Appearance} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {PaperProvider} from 'react-native-paper';

import {getCombinedTheme} from 'themes';

import {BottomNavigation} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';

import HomeScreen from 'screens/HomeScreen';

import i18n, {setI18nLocale} from 'i18n';
import {useAppSelector, useThemeTypeSelector} from 'redux/hooks';
import SettingStackGroup from 'screens/navigation/SettingStackGroup';

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

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {
      key: 'home',
      title: i18n.t('home.title'),
      focusedIcon: () => (
        <Ionicons name="home" size={24} color={combinedTheme.colors.primary} />
      ),
      unfocusedIcon: () => (
        <Ionicons
          name="home-outline"
          size={24}
          color={combinedTheme.colors.primary}
        />
      ),
    },
    {
      key: 'setting',
      title: i18n.t('setting.title'),
      focusedIcon: () => (
        <Ionicons
          name="settings"
          size={24}
          color={combinedTheme.colors.primary}
        />
      ),
      unfocusedIcon: () => (
        <Ionicons
          name="settings-outline"
          size={24}
          color={combinedTheme.colors.primary}
        />
      ),
    },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    home: HomeScreen,
    setting: SettingStackGroup,
  });

  return (
    <PaperProvider theme={combinedTheme}>
      <NavigationContainer theme={combinedTheme}>
        <BottomNavigation
          navigationState={{index, routes}}
          onIndexChange={setIndex}
          renderScene={renderScene}
        />
      </NavigationContainer>
    </PaperProvider>
  );
}
