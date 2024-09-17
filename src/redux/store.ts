import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {configureStore} from '@reduxjs/toolkit';
import settingReducers from './slices/setting';

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
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        // 忽略 redux-persist 相关的 action
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export {store, persistor};
