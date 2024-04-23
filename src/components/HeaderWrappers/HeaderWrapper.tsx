import React from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {BLACK_TEXT, MAIN_BODY_COLOR} from '../../assets/colors';
import {BackArrow} from '../../assets/svgs/BackArrow';
import {useNavigation} from '@react-navigation/native';
import {Text} from '../Text';

interface HeaderWrapperProps {
  children: React.ReactNode;
  title?: string;
  isLoginScreen?: boolean;
  isFirstLogin?: boolean;
}

export const HeaderWrapper: React.FC<HeaderWrapperProps> = ({
  children,
  title,
  isLoginScreen = false,
  isFirstLogin = false,
}) => {
  const navigation = useNavigation();

  const handleBackPress = () => {
    if (isLoginScreen) {
      navigation.reset({
        index: 0,
        routes: [{name: 'SignUpOptions' as never}],
      });
    } else {
      navigation.goBack();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'dark-content'} />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginHorizontal: 20,
          marginVertical: 15,
        }}>
        {!isFirstLogin && (
          <TouchableOpacity
            hitSlop={{left: 10, right: 10}}
            onPress={handleBackPress}>
            <BackArrow />
          </TouchableOpacity>
        )}
        {title && (
          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>{title}</Text>
          </View>
        )}
      </View>
      <View style={{backgroundColor: MAIN_BODY_COLOR, flex: 1}}>
        {children}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: MAIN_BODY_COLOR,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
  },
  titleText: {
    fontSize: 18,
    fontWeight: Platform.OS === 'android' ? '600' : 'bold',
    color: BLACK_TEXT,
  },
});
