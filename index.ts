import {name as appName} from './app.json';

import {AppRegistry} from 'react-native';

import Main from './src/Main';

AppRegistry.registerComponent(appName, () => Main);