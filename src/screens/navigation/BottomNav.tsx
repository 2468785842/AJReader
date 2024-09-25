import {useState} from 'react';

import {getCombinedTheme} from 'themes';

import {BottomNavigation} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';

import HomeScreen from 'screens/HomeScreen';
import SettingsScreen from 'screens/SettingsScreen';

import i18n from 'i18n';
import {useThemeTypeSelector} from 'redux/hooks';

export default function BottomNav() {
  const themeType = useThemeTypeSelector();
  const theme = getCombinedTheme(themeType);

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {
      key: 'home',
      title: i18n.t('home.title'),
      focusedIcon: () => (
        <Ionicons name="home" size={24} color={theme.colors.primary} />
      ),
      unfocusedIcon: () => (
        <Ionicons name="home-outline" size={24} color={theme.colors.primary} />
      ),
    },
    {
      key: 'settings',
      title: i18n.t('settings.title'),
      focusedIcon: () => (
        <Ionicons name="settings" size={24} color={theme.colors.primary} />
      ),
      unfocusedIcon: () => (
        <Ionicons
          name="settings-outline"
          size={24}
          color={theme.colors.primary}
        />
      ),
    },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    home: HomeScreen,
    settings: SettingsScreen,
  });
  return (
    <BottomNavigation
      navigationState={{index, routes}}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
}
