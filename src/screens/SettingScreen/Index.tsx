import {ScrollView, View} from 'react-native';
import {Text} from 'react-native-paper';
import configs from './configs';

export default function SettingScreen() {
  return (
    <ScrollView>
      {configs.map(group => (
        <View key={group.title} style={{marginBottom: 16}}>
          <Text style={{fontSize: 12, marginLeft: 8, marginBottom: 4}}>
            {group.title}
          </Text>
          {group.childrens.map(child => (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Text style={{includeFontPadding: false}}>{child.label}</Text>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text
                  style={{
                    fontSize: 12,
                    marginRight: 8,
                    includeFontPadding: false,
                  }}>
                  {child.description}
                </Text>
                <View
                  style={{
                    width: 20,
                    height: 20,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}></View>
                {child.children}
              </View>
            </View>
          ))}
        </View>
      ))}
    </ScrollView>
  );
}
