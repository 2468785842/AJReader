import {AppRegistry} from 'react-native';
import {Provider as StoreProvider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {persistor, store} from 'redux/store';

import {name as appName} from './app.json';

import App from 'App';

AppRegistry.registerComponent(appName, () => () => (
  <StoreProvider store={store}>
    <PersistGate loading={null} persistor={persistor}>
        <App />
    </PersistGate>
  </StoreProvider>
));
