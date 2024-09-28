import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {BottomSheetMethods} from '@gorhom/bottom-sheet/lib/typescript/types';

import ThemeChooseCard from 'screens/components/ThemeScreen';

import i18n from 'i18n';

type Config = {
  label: string;
  description: string;
  left: React.ReactNode;
  right: React.ReactNode;
  component?: React.ReactNode;

  onPress?: () => void;
};

interface ConfigGroup {
  title: string;
  childrens: Config[];
}

const menuRight = <MaterialIcons name="chevron-right" size={24} />;

const baseConfigGroup: ConfigGroup = {
  title: i18n.t('settings.base.title'),
  childrens: [
    {
      label: i18n.t('settings.base.language.title'),
      description: i18n.t('settings.base.language.description'),
      left: <MaterialIcons name="language" size={24} />,
      right: menuRight,
      onPress() {
        return () => {};
      },
    },
    {
      label: i18n.t('settings.base.theme.title'),
      description: i18n.t('settings.base.theme.description'),
      left: <MaterialCommunityIcons name="theme-light-dark" size={24} />,
      right: menuRight,
      component: <ThemeChooseCard />,
    },
  ],
};

export default [baseConfigGroup];
