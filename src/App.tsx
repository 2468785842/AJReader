import {useEffect} from 'react';

import {PaperProvider} from 'react-native-paper';
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialBottomTabNavigator} from 'react-native-paper/react-navigation';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

import {CombinedDarkTheme, CombinedDefaultTheme} from 'themes';

import HomeScreen from 'screens/HomeScreen';
import SettingScreen from 'screens/SettingScreen';

import {useAppSelector} from 'redux/hooks';
import i18n, {setI18nLocale} from 'i18n';
import {Appearance} from 'react-native';

const Tab = createMaterialBottomTabNavigator();

export default function App() {
  const {languageCode, theme} = useAppSelector(
    ({userSetting: {languageCode, theme}}) => ({languageCode, theme}),
  );

  useEffect(() => {
    setI18nLocale(languageCode);
  }, [languageCode]);

  const combinedTheme = getCombinedTheme(theme);

  return (
    <PaperProvider theme={combinedTheme}>
      <NavigationContainer theme={combinedTheme}>
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
  );
}

function getCombinedTheme(theme: 'system' | 'dark' | 'light') {
  let CombinedTheme = CombinedDefaultTheme;
  if (theme === 'system') {
    theme = Appearance.getColorScheme() ?? 'light';
  }
  if (theme === 'dark') {
    CombinedTheme = CombinedDarkTheme;
  }
  return CombinedTheme;
}
