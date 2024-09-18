import {useEffect, useState} from 'react';
import {Appearance} from 'react-native';

import {BottomNavigation, PaperProvider} from 'react-native-paper';
import {NavigationContainer} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {CombinedDarkTheme, CombinedDefaultTheme} from 'themes';

import HomeScreen from 'screens/HomeScreen';
import SettingScreen from 'screens/SettingScreen';

import {useAppSelector} from 'redux/hooks';
import i18n, {setI18nLocale} from 'i18n';

export default function App() {
  const languageCode = useAppSelector(
    ({userSetting}) => userSetting.languageCode,
  );

  useEffect(() => setI18nLocale(languageCode), [languageCode]);

  const theme = useAppSelector(({userSetting}) => userSetting.theme);

  const [combinedTheme, setCombinedTheme] = useState(getCombinedTheme(theme));

  useEffect(() => {
    setCombinedTheme(getCombinedTheme(theme));
    const subscription = Appearance.addChangeListener(({colorScheme}) => {
      if (theme === 'system') {
        setCombinedTheme(getCombinedTheme(colorScheme));
      }
    });

    return () => subscription.remove();
  }, [theme]);

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
    setting: SettingScreen,
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

function getCombinedTheme(theme?: string | null) {
  let CombinedTheme = CombinedDefaultTheme;
  if (theme === 'system') {
    theme = Appearance.getColorScheme() ?? 'light';
  }
  if (theme === 'dark') {
    CombinedTheme = CombinedDarkTheme;
  }
  return CombinedTheme;
}
