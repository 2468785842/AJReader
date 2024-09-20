import React from 'react';
import {SegmentedButtons} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import i18n from 'i18n';

import {useAppDispatch, useThemeTypeSelector} from 'redux/hooks';
import {setTheme} from 'redux/slices/setting';
import {SettingStackParamList} from 'screens/navigation/SettingStackGroup';

type Config = {
  label: string;
  description: string;
  onPress: (
    navigate: (
      ...args:
        | [screen: keyof SettingStackParamList]
        | [
            screen: keyof SettingStackParamList,
            params: SettingStackParamList[keyof SettingStackParamList],
          ]
    ) => void,
  ) => void;
  left: React.ReactNode;
  right: React.ReactNode;
};

interface ConfigGroup {
  title: string;
  childrens: Config[];
}
const menuRight = <MaterialIcons name="chevron-right" size={24} />;

const ThemeToggleBtn: React.FC = () => {
  const themeType = useThemeTypeSelector();
  const dispatch = useAppDispatch();
  const themeStrList = ['system', 'dark', 'light'];
  return (
    <SegmentedButtons
      style={{}}
      value={themeType}
      onValueChange={value => dispatch(setTheme(value as typeof themeType))}
      buttons={themeStrList.map(value => ({
        value,
        label: i18n.t(`setting.base.theme.${value}`),
      }))}
    />
  );
};

const baseConfigGroup: ConfigGroup = {
  title: i18n.t('setting.base.title'),
  childrens: [
    {
      label: i18n.t('setting.base.language.title'),
      description: i18n.t('setting.base.language.description'),
      left: <MaterialIcons name="language" size={24} />,
      right: menuRight,
      onPress() {
        return () => {};
      },
    },
    {
      label: i18n.t('setting.base.theme.title'),
      description: i18n.t('setting.base.theme.description'),
      left: <MaterialCommunityIcons name="theme-light-dark" size={24} />,
      right: menuRight,
      onPress(navigate) {
        navigate('Theme');
      },
    },
  ],
};

export default [baseConfigGroup];
