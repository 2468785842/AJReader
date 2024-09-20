import {NavigationProp, useNavigation} from '@react-navigation/native';
import {ScrollView, View} from 'react-native';
import {Surface, Text, TouchableRipple, useTheme} from 'react-native-paper';

import {useThemeTypeSelector} from 'redux/hooks';
import {SettingStackParamList} from 'screens/navigation/SettingStackGroup';
import configs from './configs';

export default function SettingScreen() {
  const theme = useTheme();
  const navigation = useNavigation<NavigationProp<SettingStackParamList>>();

  return (
    <ScrollView>
      <View style={{margin: 16}}>
        {configs.map(group => (
          <View key={group.title} style={{rowGap: 8}}>
            <Text style={{...theme.fonts.labelMedium, marginHorizontal: 8}}>
              {group.title}
            </Text>
            <Surface elevation={4} style={{rowGap: 12, padding: 12}}>
              {group.childrens.map(child => (
                <TouchableRipple
                  key={child.label}
                  onPress={() => child.onPress(navigation.navigate)}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        columnGap: 10,
                      }}>
                      {child.left}
                      <View style={{height: 'auto'}}>
                        <Text style={{...theme.fonts.titleMedium}}>
                          {child.label}
                        </Text>
                        <Text
                          style={{
                            ...theme.fonts.labelSmall,
                            color: theme.colors.onSurfaceVariant,
                          }}>
                          {child.description}
                        </Text>
                      </View>
                    </View>
                    {child.right}
                  </View>
                </TouchableRipple>
              ))}
            </Surface>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
