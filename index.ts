import { LogBox } from 'react-native';

// 这是react-navigation 的 bug, 在这里忽略掉日志, 太烦了
// Github issue link: https://github.com/react-navigation/react-navigation/issues/11989
LogBox.ignoreLogs(['Warning: A props object containing a "key" prop is being spread into JSX']);

import {name as appName} from './app.json';

import {AppRegistry} from 'react-native';

import Main from 'Main';

AppRegistry.registerComponent(appName, () => Main);