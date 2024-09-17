import * as React from 'react';
import { Provider as StoreProvider } from 'react-redux';

import { PersistGate } from 'redux-persist/integration/react';

import { persistor, store } from 'redux/store';

import App from 'App';

export default function Main() {
 
  return (
    <StoreProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
          <App/>       
      </PersistGate>
    </StoreProvider>
  );
}
