import { Appearance, StatusBarStyle } from 'react-native';

import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';

import {
  MD3DarkTheme,
  MD3LightTheme,
  adaptNavigationTheme,
} from 'react-native-paper';

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

export { CombinedDarkTheme, CombinedDefaultTheme };

export function getStatusBarStyle(theme?: string | null): StatusBarStyle {
  if (theme === 'system') {
    theme = Appearance.getColorScheme() ?? 'light';
  }
  if (theme === 'dark') {
    return 'light-content';
  }
  if (!theme) return 'default';
  return 'dark-content';
}

export function getCombinedTheme(theme?: string | null) {
  let CombinedTheme = CombinedDefaultTheme;
  if (theme === 'system') {
    theme = Appearance.getColorScheme() ?? 'light';
  }
  if (theme === 'dark') {
    CombinedTheme = CombinedDarkTheme;
  }
  return CombinedTheme;
}
