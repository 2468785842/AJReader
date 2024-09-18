import React from 'react';
import {SegmentedButtons} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import i18n from 'i18n';

import {useAppDispatch, useAppSelector} from 'redux/hooks';
import {setTheme} from 'redux/slices/setting';

type Config = {
  label: string;
  description: string;
  children: React.ReactNode;
};

interface ConfigGroup {
  title: string;
  childrens: Config[];
}
const menuRight = <MaterialCommunityIcons name="chevron-right" size={24} />;

const ThemeToggleBtn: React.FC = () => {
  const theme = useAppSelector(state => state.userSetting.theme);
  const dispatch = useAppDispatch();
  const themeStrList = ['system', 'dark', 'light'];
  return (
    <SegmentedButtons
      style={{
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

const baseConfigGroup: ConfigGroup = {
  title: i18n.t('setting.base.title'),
  childrens: [
    {
      label: i18n.t('setting.base.language.title'),
      description: i18n.t('setting.base.language.description'),
      children: menuRight,
    },
    {
      label: i18n.t('setting.base.theme.title'),
      description: i18n.t('setting.base.theme.description'),
      children: <ThemeToggleBtn />,
    },
  ],
};

export default [baseConfigGroup];
