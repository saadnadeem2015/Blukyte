import {
  StyleSheet,
  View,
  ScrollView,
  TextInput,
  BackHandler,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {HeaderWrapper} from '../../components/HeaderWrappers/HeaderWrapper';
import {Text} from '../../components/Text';
import {
  BLACK_TEXT,
  BLUE_COLOR,
  BORDER_COLOR,
  RED_COLOR,
} from '../../assets/colors';
import {Button} from '../../components/Button';
import {RouteProp, useNavigation} from '@react-navigation/native';
import {AuthStackParamList} from '../../navigators/AuthStack';
import Toast from 'react-native-toast-message';
import {
  usePasswordlessStartMutation,
  useVerifyOtpMutation,
} from '../../store/services/auth0Api';
import {useDispatch} from 'react-redux';
import { setAppUserId, setAuthData, setUserData } from '../../store/slices/auth';
import { useCreateUserMutation } from '../../store/services/api';

type OtpScreenRouteProp = RouteProp<AuthStackParamList, 'OtpScreen'>;
interface OtpScreenProps {
  route: OtpScreenRouteProp;
}

const OtpScreen: React.FC<OtpScreenProps> = ({route}) => {
  const phoneNumber = route?.params?.phoneNumber;
  const UserData = route?.params?.values;
  const navigation = useNavigation();
  const [otpValues, setOtpValues] = useState(['', '', '', '', '', '']);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const [isOtpIncorrect, setIsOtpIncorrect] = useState(false);
  const [Loading, setLoading] = useState(false);
  const otpInputs = useRef<(TextInput | null)[]>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        if (focusedIndex !== null && otpValues[focusedIndex] === '') {
          if (focusedIndex > 0) {
            otpInputs.current[focusedIndex - 1]?.focus();
            setFocusedIndex(focusedIndex - 1);
          }
        }
        return false;
      },
    );

    return () => backHandler.remove();
  }, [focusedIndex, otpValues]);

  const handleOtpInputChange = (index: number, value: string) => {
    const updatedOtpValues = [...otpValues];
    updatedOtpValues[index] = value;
    setOtpValues(updatedOtpValues);

    if (value && index < otpInputs.current.length - 1) {
      otpInputs.current[index + 1]?.focus();
      setFocusedIndex(index + 1);
    }
  };

  const handleBackspace = (index: number) => {
    const updatedOtpValues = [...otpValues];
    if (index > 0 && otpValues[index] === '') {
      updatedOtpValues[index - 1] = '';
      otpInputs.current[index - 1]?.focus();
      setFocusedIndex(index - 1);
      setOtpValues(updatedOtpValues);
    }
  };

  useEffect(() => {
    otpInputs.current[0]?.focus();
  }, []);

  const [verifyOtp] = useVerifyOtpMutation();
  const [passwordlessStart] = usePasswordlessStartMutation();
  const [createUser] = useCreateUserMutation();

  const VerifyOtp = async () => {
    try {
      setLoading(true);
      const response = await verifyOtp({phoneNumber, otpValues});
      if ('data' in response) {
        dispatch(setAuthData({
          accessToken: response.data.access_token,
          idToken: response.data.id_token,
          refreshToken: response.data.refresh_token,
        }));
        dispatch(setUserData(phoneNumber))
        Toast.show({
          type: 'success',
          text1: UserData ? "Registration Successfull!" : "Login Successfull!",
        });
        if (UserData) {
          const userData = {
            email: UserData.email,
            firstName: UserData.firstName,
            lastName: UserData.lastName,
            phoneNumber: UserData.number,
          };
          try {
            const result = await createUser(userData);
            console.log(result,'console of result')
            //@ts-ignore
            dispatch(setAppUserId(result.data.data));
            console.log(result, 'console of create user data');
          } catch (error) {
            console.error('Error creating user:', error);
          }
        }
        navigation.reset({
          index: 0,
          routes: [{ name: 'Home' as never}],
        });
      } else if (response.error) {
        setIsOtpIncorrect(true);
        //@ts-ignore
        const errorMessage = response.error.data.error_description || 'An error occurred';
        Toast.show({
          type: 'error',
          text1: errorMessage,
        });
      }
    } catch (error) {
      setIsOtpIncorrect(true);
      console.error('Error occurred during OTP verification:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const ResendOtp = async () => {
    try {
      setLoading(true);
      const response = await passwordlessStart({phoneNumber});
      if ('data' in response) {
        Toast.show({
          type: 'success',
          text1: 'Otp Resent successfully',
        });
      } else if (response.error) {
        //@ts-ignore
        const errorMessage = response.error.data.error_description || 'An error occurred';
        Toast.show({
          type: 'error',
          text1: errorMessage,
        });
      }
    } catch (error) {
      console.error('Error occurred during passwordless start:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <HeaderWrapper>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled">
        <View style={styles.container}>
          <View style={styles.loginContent}>
            <Text style={{fontWeight: '600'}}>
              Enter the code sent to {phoneNumber}!
            </Text>
            <View style={{marginVertical: 30}}>
              <View style={styles.otpContainer}>
                {otpValues.map((value, index) => (
                  <TextInput
                    key={index}
                    style={[
                      styles.otpInput,
                      focusedIndex === index ? styles.focusedInput : null,
                      isOtpIncorrect ? styles.incorrectInput : null,
                      value !== '' && focusedIndex !== index && !isOtpIncorrect
                        ? styles.blueBorder
                        : null,
                    ]}
                    onChangeText={text => {
                      setIsOtpIncorrect(false);
                      handleOtpInputChange(index, text);
                    }}
                    value={value}
                    keyboardType="numeric"
                    maxLength={1}
                    onFocus={() => setFocusedIndex(index)}
                    onBlur={() => setFocusedIndex(null)}
                    ref={input => (otpInputs.current[index] = input)}
                    onKeyPress={({nativeEvent}) => {
                      if (nativeEvent.key === 'Backspace') {
                        handleBackspace(index);
                      }
                    }}
                  />
                ))}
              </View>
              <View style={{height: 40}}>
                {isOtpIncorrect && (
                  <Text
                    color={RED_COLOR}
                    style={{textAlign: 'center', paddingTop: 10}}>
                    Wrong code. Please try again or resend code.
                  </Text>
                )}
              </View>
              <Text
                onPress={ResendOtp}
                color={BLUE_COLOR}
                style={{textAlign: 'center', fontWeight: '500'}}>
                Resend code
              </Text>
            </View>
          </View>

          <View style={styles.bottomContainer}>
            <Button isLoading={Loading} onPress={VerifyOtp} text="Continue" />
            <Text style={styles.newAccountText}>
              New to BluKyte?{' '}
              <Text style={{fontWeight: '600'}} color={BLUE_COLOR}>
                Create an account.
              </Text>
            </Text>
          </View>
        </View>
      </ScrollView>
    </HeaderWrapper>
  );
};

export default OtpScreen;

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
    paddingLeft: 10,
  },
  bottomContainer: {
    alignItems: 'center',
    marginBottom: 30,
    marginHorizontal: 15,
  },
  newAccountText: {
    marginTop: 30,
  },
  otpContainer: {
    flexDirection: 'row',
    marginTop: 8,
    justifyContent: 'space-between',
  },
  otpInput: {
    width: 50,
    height: 70,
    borderWidth: 1,
    borderColor: BORDER_COLOR,
    borderRadius: 15,
    textAlign: 'center',
    fontSize: 18,
    color: BLACK_TEXT,
  },
  focusedInput: {
    borderColor: BLACK_TEXT,
    borderWidth: 3,
  },
  incorrectInput: {
    borderColor: RED_COLOR,
  },
  blueBorder: {
    borderColor: BLUE_COLOR,
  },
});
