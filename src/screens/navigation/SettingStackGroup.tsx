import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SettingScreen from 'screens/SettingScreen';
import ThemeScreen from 'screens/ThemeScreen';

export type SettingStackParamList = {
  Setting: undefined;
  Theme: undefined;
};

const SettingNativeStack = createNativeStackNavigator<SettingStackParamList>();

export default function SettingStackGroup() {
  return (
    <SettingNativeStack.Navigator
      initialRouteName="Setting"
      screenOptions={{
        headerShown: false,
      }}>
      <SettingNativeStack.Screen name="Setting" component={SettingScreen} />
      <SettingNativeStack.Screen name="Theme" component={ThemeScreen} options={{
        headerShown: true,
      }}/>
    </SettingNativeStack.Navigator>
  );
}
