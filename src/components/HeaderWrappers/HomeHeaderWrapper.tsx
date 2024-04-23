import React from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { MAIN_BODY_COLOR } from '../../assets/colors';
import { useNavigation } from '@react-navigation/native';
import { DrawerIcon } from '../../assets/svgs/DrawerIcon';
import { NotificationIconFilled } from '../../assets/svgs/NotificationIcon';

interface HomeHeaderWrapperProps {
  children: React.ReactNode;
}

export const HomeHeaderWrapper: React.FC<HomeHeaderWrapperProps> = ({ children }) => {
  const navigation = useNavigation();

  const statusBarPadding =
    Platform.OS === 'ios' ? 16 : (StatusBar.currentHeight ?? 0) + 20;

  const drawerIconContainerStyle = {
    ...styles.topContainer,
    paddingTop: statusBarPadding,
  };

  const notificationIconContainerStyle = {
    ...styles.topContainer,
    paddingTop: statusBarPadding,
  };
  const openDrawer = () => {
    navigation.navigate('Drawer' as never)
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'dark-content'} />
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <TouchableOpacity
          hitSlop={{ left: 10, right: 10 }}
          onPress={openDrawer}
          style={drawerIconContainerStyle}>
          <DrawerIcon />
        </TouchableOpacity>
        <TouchableOpacity
          hitSlop={{ left: 10, right: 10 }}
          onPress={() => navigation.navigate('Notifications' as never)}
          style={notificationIconContainerStyle}>
          <NotificationIconFilled />
        </TouchableOpacity>
      </View>
      <View style={{ backgroundColor: MAIN_BODY_COLOR, flex: 1 }}>
        {children}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: MAIN_BODY_COLOR,
  },
  topContainer: {
    marginHorizontal: 16,
    marginBottom: 16,
  },
});
