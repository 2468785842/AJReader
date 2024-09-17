import i18n from 'i18n';
import {SegmentedButtons} from 'react-native-paper';
import {useAppDispatch, useAppSelector} from 'redux/hooks';
import {setTheme} from 'redux/slices/setting';

const ThemeToggleBtn: React.FC = () => {
  const theme = useAppSelector(state => state.userSetting.theme);
  const dispatch = useAppDispatch();
  const themeStrList = ['system', 'dark', 'light'];
  return (
    <SegmentedButtons
      style={{
        width: 40,
      }}
      value={theme}
      onValueChange={value => dispatch(setTheme(value as typeof theme))}
      buttons={themeStrList.map(value => ({
        value,
        label: i18n.t(`setting.base.theme.${value}`),
      }))}
    />
  );
};

export default ThemeToggleBtn;
