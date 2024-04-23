import { StyleSheet, View, TouchableOpacity } from 'react-native';
import React, { FC } from 'react';
import { BLUE_COLOR } from '../../assets/colors';

interface TabBarProps {
  icons: any;
  selectedTab: number;
  handleTabPress: (index: number) => void;
}

const TabBar: FC<TabBarProps> = ({ icons, selectedTab, handleTabPress }) => {
  return (
    <View style={styles.tabBar}>
      {icons.map((icon:any, index:any) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.tabItem,
            {
              borderTopLeftRadius: index === 0 ? 12 : 0,
              borderBottomLeftRadius: index === 0 ? 12 : 0,
              borderTopRightRadius: index === icons.length - 1 ? 12 : 0,
              borderBottomRightRadius: index === icons.length - 1 ? 12 : 0,
              backgroundColor: index === selectedTab ? BLUE_COLOR : 'transparent',
            },
          ]}
          onPress={() => handleTabPress(index)}>
          {icon}
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    marginTop: 20,
    backgroundColor: '#0000000D',
    borderRadius: 12,
    justifyContent: 'space-around',
  },
  tabItem: {
    flex: 1,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    height: 52,
    alignItems: 'center',
  },
});

export default TabBar;
