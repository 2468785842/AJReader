import {ScrollView, View} from 'react-native';
import {Surface, Text, TouchableRipple, useTheme} from 'react-native-paper';

import {BottomSheetModal, BottomSheetView} from '@gorhom/bottom-sheet';
import {ReactNode, useRef, useState} from 'react';
import configs from './configs';

export default function SettingsScreen() {
  const theme = useTheme();
  const sheetRef = useRef<BottomSheetModal>(null);
  const [node, setNode] = useState<ReactNode>(null);

  sheetRef.current?.[node ? 'present' : 'dismiss']();

  return (
    <ScrollView>
      <BottomSheetModal ref={sheetRef}>
        <BottomSheetView>{node ?? <></>}</BottomSheetView>
      </BottomSheetModal>
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
                  onPress={() => {
                    setNode(node ? null : child.component);
                    child.onPress?.();
                  }}>
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
