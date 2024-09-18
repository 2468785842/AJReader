import {ScrollView, View} from 'react-native';
import {Text} from 'react-native-paper';
import configs from './configs';

export default function SettingScreen() {
  return (
    <ScrollView>
      <View style={{margin: 16}}>
        {configs.map(group => (
          <View key={group.title} style={{marginBottom: 16}}>
            <Text style={{fontSize: 14, marginLeft: 8, marginBottom: 4}}>
              {group.title}
            </Text>
            {group.childrens.map(child => (
              <View
                key={child.label}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <Text style={{flex: 1}}>{child.label}</Text>
                <View style={{flex: 3, width: 100}}>{child.children}</View>
              </View>
            ))}
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
