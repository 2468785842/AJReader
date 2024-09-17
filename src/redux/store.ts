import {configureStore} from '@reduxjs/toolkit';
import settingReducers from './slices/setting';

import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

// 使用 persistReducer 包装
const settingPersistedReducer = persistReducer(
  {
    key: 'setting',
    storage: AsyncStorage,
  },
  settingReducers,
);

const store = configureStore({
  reducer: {
    userSetting: settingPersistedReducer,
  },
});

const persistor = persistStore(store);

export { store, persistor };
