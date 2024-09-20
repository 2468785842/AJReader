import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {TranslationKey} from 'i18n/region-code';
import {getSystemLanguageCode} from 'i18n/region-code';

interface Setting {
  languageCode: TranslationKey;
  themeType: 'system' | 'dark' | 'light';
}

const initialState: Setting = {
  languageCode: getSystemLanguageCode(),
  themeType: 'system',
};

export const settingSlice = createSlice({
  name: 'setting',
  initialState,
  reducers: {
    setLanguageCode(
      state,
      newState: PayloadAction<TranslationKey>,
    ) {
      state.languageCode = newState.payload;
    },
    setTheme(state, newState: PayloadAction<Setting['themeType']>) {
      state.themeType = newState.payload;
    },
  },
});

export const {
  setLanguageCode,
  setTheme
} = settingSlice.actions;

export default settingSlice.reducer;
