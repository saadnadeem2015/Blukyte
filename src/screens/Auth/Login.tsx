import {StyleSheet, View, ScrollView} from 'react-native';
import React, {useState} from 'react';
import {HeaderWrapper} from '../../components/HeaderWrappers/HeaderWrapper';
import {Text} from '../../components/Text';
import PhoneInput from 'react-native-phone-input';
import {BLUE_COLOR} from '../../assets/colors';
import {Button} from '../../components/Button';
import {CustomCheckBox} from '../../components/CheckBox';
import Toast from 'react-native-toast-message';
import { usePasswordlessStartMutation } from '../../store/services/auth0Api';
import { useDispatch } from 'react-redux';
import { setRememberMe } from '../../store/slices/auth';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStackParamList } from '../../navigators/AuthStack';

type Login = {
  navigation: StackNavigationProp<AuthStackParamList, 'Login'>;
};

const Login: React.FC<Login> = ({ navigation }) => {
  const [isCheckedRemember, setIsCheckedRemeber] = useState(false);
  const [isCheckedTerms, setIsCheckedTerms] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [Loading, setLoading] = useState(false);
  const dispatch = useDispatch()

  const toggleCheckBoxRememberMe = () => {
    setIsCheckedRemeber(!isCheckedRemember);
  };
  const toggleCheckBoxTerms = () => {
    setIsCheckedTerms(!isCheckedTerms);
  };

  const [passwordlessStart, {isLoading}] = usePasswordlessStartMutation();

  const handleLogin = async () => {
    try {
      setLoading(true)
      const response = await passwordlessStart({
        phoneNumber: phoneNumber,
      });
      if ('data' in response) {
        if(isCheckedRemember){
          dispatch(setRememberMe(true));
        }
        Toast.show({
          type: 'success',
          text1: 'Otp Sent Successfully',
        });
        navigation.navigate('OtpScreen', {phoneNumber});
      } else if (response.error) {
        const errorMessage =
          //@ts-ignore
          response.error.data.error_description || 'An error occurred';
        Toast.show({
          type: 'error',
          text1: errorMessage,
        });
      }
    } catch (error) {
      console.error('Error occurred during passwordless start:', error);
    } finally {
      setLoading(false)
    }
  };

  return (
    <HeaderWrapper isLoginScreen>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled">
        <View style={styles.container}>
          <View style={styles.loginContent}>
            <Text variant="heading">Welcome Back!</Text>
            <View style={{marginVertical: 30}}>
              <Text>Enter your phone number</Text>
              <PhoneInput
                style={{...styles.phoneInputStyle}}
                textStyle={styles.phoneInputTextStyle}
                textProps={{
                  placeholder: '+1 (000) 000-000*',
                  placeholderTextColor: '#A3A3A3',
                }}
                onChangePhoneNumber={text => setPhoneNumber(text)}
              />
            </View>
            <CustomCheckBox
              label="Remember me"
              value={isCheckedRemember}
              onValueChange={toggleCheckBoxRememberMe}
            />
            <CustomCheckBox
              terms
              value={isCheckedTerms}
              onValueChange={toggleCheckBoxTerms}
            />
          </View>
          <View style={styles.bottomContainer}>
            <Button
              disabled={Loading || !isCheckedTerms || !phoneNumber}
              isLoading={Loading}
              text="Continue"
              onPress={handleLogin}
            />
            <Text style={styles.newAccountText}>
              New to BluKyte?{' '}
              <Text
                onPress={() => navigation.navigate('Register')}
                style={{fontWeight: '600'}}
                color={BLUE_COLOR}>
                Create an account.
              </Text>
            </Text>
          </View>
        </View>
      </ScrollView>
    </HeaderWrapper>
  );
};

export default Login;

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  loginContent: {
    flex: 0.4,
    marginHorizontal: 15,
    marginVertical: 30,
  },
  phoneInputStyle: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 8,
    marginTop: 10,
    padding: 10,
  },
  phoneInputTextStyle: {
    fontSize: 16,
    color: '#404040',
  },
  rememberMeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  checkBoxLabel: {
    paddingHorizontal: 20,
  },
  bottomContainer: {
    alignItems: 'center',
    marginBottom: 30,
    marginHorizontal: 15,
  },
  newAccountText: {
    marginTop: 30,
  },
});
