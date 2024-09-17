import {I18n} from 'i18n-js';
import {getLocales, Locale} from 'react-native-localize';

import regionCodes, {TranslationKey} from './region-code';
import {store} from 'redux/store';

const i18n: I18n = new I18n(regionCodes, {
  defaultLocale: 'en',
  enableFallback: true,
  locale: store.getState().userSetting.languageCode,
});

// 获取手机本地国际化信息
function getSystemLanguageCode(): TranslationKey {
  const locales: Locale[] = getLocales();

  for (let {languageCode} of locales) {
    if (languageCode in regionCodes) {
      return languageCode as TranslationKey;
    }
  }

  return 'en';
}

// 设置i18n的语言
function setI18nLocale(code: ReturnType<typeof getSystemLanguageCode>) {
  i18n.locale = code ?? getSystemLanguageCode();
}

export {setI18nLocale, getSystemLanguageCode};

export default i18n;
