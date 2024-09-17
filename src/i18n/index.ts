import {store} from '../redux/store';

import {I18n} from 'i18n-js';
import {getLocales, Locale} from 'react-native-localize';

import regionCodes, {TranslationKey} from './region-code';

const i18n: I18n = new I18n(regionCodes, {
  defaultLocale: 'en',
  enableFallback: true,
});

// 获取手机本地国际化信息
function getSystemLanguageCode(): TranslationKey | undefined {
  const locales: Locale[] = getLocales();

  for (let {languageCode} of locales) {
    if (languageCode in regionCodes) {
      return languageCode as TranslationKey;
    }
  }

  return undefined;
}

// 用户设置的语言
const updateLangConfig = () => {
  const {
    userSetting: {languageCode},
  } = store.getState();

  i18n.locale = languageCode ?? getSystemLanguageCode() ?? 'en';
};

updateLangConfig();

store.subscribe(updateLangConfig);

export default i18n;
