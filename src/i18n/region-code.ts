import {getLocales, Locale} from 'react-native-localize';

import zh from './lang/zh-CN';
import en from './lang/en-US';

const translations = {
  zh,
  en,
};

type TranslationKey = keyof typeof translations;

// 获取手机本地国际化信息
function getSystemLanguageCode(): TranslationKey {
  const locales: Locale[] = getLocales();

  for (let {languageCode} of locales) {
    if (languageCode in translations) {
      return languageCode as TranslationKey;
    }
  }

  return 'en';
}

export {getSystemLanguageCode};

export type {TranslationKey};

export default translations;
