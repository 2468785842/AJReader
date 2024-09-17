import React from 'react';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import i18n from 'i18n';
import ThemeToggleBtn from 'screens/components/ThemeToggleBtn';

type Config = {
  label: string;
  description: string;
  children: React.ReactNode,
};

interface ConfigGroup {
  title: string;
  childrens: Config[];
}
const menuRight = <MaterialCommunityIcons name="menu-right" size={14} />;

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
      children: <ThemeToggleBtn/>
    },
  ],
};

export default [baseConfigGroup];
