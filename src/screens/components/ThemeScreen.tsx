import {SegmentedButtons, Surface} from 'react-native-paper';
import {useAppDispatch, useThemeTypeSelector} from 'redux/hooks';

import i18n from 'i18n';
import {setTheme} from 'redux/slices/setting';
import { StyleSheet } from 'react-native';

export default function ThemeChooseCard() {
  const themeType = useThemeTypeSelector();
  const dispatch = useAppDispatch();
  const themeStrList = ['system', 'dark', 'light'];

  return (
    <Surface style={styles.surface} elevation={4}>
      <SegmentedButtons
        value={themeType}
        onValueChange={value => dispatch(setTheme(value as typeof themeType))}
        buttons={themeStrList.map(value => ({
          value,
          label: i18n.t(`settings.base.theme.${value}`),
        }))}
      />
    </Surface>
  );
}

const styles = StyleSheet.create({
  surface: {
    padding: 8,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
