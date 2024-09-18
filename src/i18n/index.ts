import {I18n} from 'i18n-js';

import {store} from 'redux/store';

import regionCodes, {getSystemLanguageCode} from 'i18n/region-code';

const i18n: I18n = new I18n(regionCodes, {
  defaultLocale: 'en',
  enableFallback: true,
  locale: store.getState().userSetting.languageCode,
});

// 设置i18n的语言
function setI18nLocale(code: ReturnType<typeof getSystemLanguageCode>) {
  i18n.locale = code ?? getSystemLanguageCode();
}

export {setI18nLocale};

export default i18n;
