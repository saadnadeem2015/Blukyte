import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {UserIcon} from '../../assets/svgs/UserIcon';
import {NotificationIconTransparent} from '../../assets/svgs/NotificationIcon';
import {FeedbackIcon} from '../../assets/svgs/FeedBackicon';
import {PrivacyPolicyIcon} from '../../assets/svgs/PrivacyPolicyIcon';
import {LogoutIconRed} from '../../assets/svgs/LogoutIconRed';
import {Text} from '../../components/Text';
import {useNavigation} from '@react-navigation/native';
import {HeaderWrapper} from '../../components/HeaderWrappers/HeaderWrapper';
import {BORDER_COLOR, RED_COLOR} from '../../assets/colors';
import {InstagramIcon} from '../../assets/svgs/InstagramIcon';
import {TiktokIcon} from '../../assets/svgs/TiktokIcon';
import {FacebookIcon} from '../../assets/svgs/FacebookIcon';
import {LinkedinIcon} from '../../assets/svgs/Linkedinicon';
import { LocationIconTransparent } from '../../assets/svgs/LocationIcon';
import { ClearTokens } from '../../store/slices/auth';
import { store } from '../../store';
import { useDispatch } from 'react-redux';
import { userApi } from '../../store/services/api';

const DrawerScreen = () => {
  const dispatch = useDispatch()
  const navigation = useNavigation();
  const navigateToScreen = (screenName: string) => {
    navigation.navigate(screenName as never);
  };
  
  const handleLogout = () => {
    store.dispatch(ClearTokens())
    dispatch(userApi.util.resetApiState());
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' as never}],
    });  
  }

  return (
    <HeaderWrapper>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.drawerItem}
          onPress={() => navigateToScreen('EditProfile')}>
          <UserIcon />
          <Text style={styles.drawerText}>User Account</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.drawerItem}
          onPress={() => navigateToScreen('Notifications')}>
          <NotificationIconTransparent />
          <Text style={styles.drawerText}>Notifications</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.drawerItem}
          onPress={() => navigateToScreen('Location')}>
          <LocationIconTransparent />
          <Text style={styles.drawerText}>Location</Text>
        </TouchableOpacity>
        <View style={styles.separator} />

        <TouchableOpacity
          style={styles.drawerItem}
          onPress={() => navigateToScreen('FeedBack')}>
          <FeedbackIcon />
          <Text style={styles.drawerText}>Feedback</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.drawerItem}
          onPress={() => navigateToScreen('PrivacyPolicy')}>
          <PrivacyPolicyIcon />
          <Text style={styles.drawerText}>Privacy Policy, Terms & Conditions</Text>
        </TouchableOpacity>
        <View style={styles.separator} />

        <TouchableOpacity
          style={styles.drawerItem}
          onPress={handleLogout}>
          <LogoutIconRed />
          <Text color={RED_COLOR} style={styles.drawerText}>Logout</Text>
        </TouchableOpacity>
        <View style={styles.separator} />
        <View style={{flexDirection: 'row',justifyContent:'space-evenly'}}>
        <InstagramIcon />
        <TiktokIcon />
        <FacebookIcon />
        <LinkedinIcon />
      </View>
      </View>
    </HeaderWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  drawerText: {
    marginLeft: 15,
    fontSize: 18,
    fontWeight: '600',
    marginTop: 2,
  },
  separator: {
    borderWidth: 0.5,
    borderColor: BORDER_COLOR,
    width: '100%',
    marginBottom: 30,
  },
});

export default DrawerScreen;
