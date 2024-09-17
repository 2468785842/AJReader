import zh from './lang/zh-CN';
import en from './lang/en-US';

const translations = {
  zh,
  en
};

type TranslationKey = keyof typeof translations;

export type {
  TranslationKey
}

export default translations;