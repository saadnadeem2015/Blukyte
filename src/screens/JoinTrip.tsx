import {
  StyleSheet,
  View,
  ScrollView,
  TextInput,
  BackHandler,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {HeaderWrapper} from '../components/HeaderWrappers/HeaderWrapper';
import {Text} from '../components/Text';
import {
  BLACK_TEXT,
  BLUE_COLOR,
  BORDER_COLOR,
  RED_COLOR,
} from '../assets/colors';
import {Button} from '../components/Button';
import {RouteProp, useNavigation} from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import {useSelector} from 'react-redux';
import {HomeStackParamList} from '../navigators/HomeStack';
import {useJoinTripMutation} from '../store/services/api';
import {RootState} from '../store/slices/auth';

type JoinTripRouteProps = RouteProp<HomeStackParamList, 'JoinTrip'>;

const JoinTrip: React.FC<{route: JoinTripRouteProps}> = ({route}) => {
  const navigation = useNavigation();
  const [otpValues, setOtpValues] = useState(['', '', '', '', '', '']);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const [isOtpIncorrect, setIsOtpIncorrect] = useState(false);
  const otpInputs = useRef<(TextInput | null)[]>([]);
  const appUserId = useSelector((state: RootState) => state.auth.appUserId);

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

  const [handleTrip, {isLoading}] = useJoinTripMutation();

  const handleJoinTrip = async () => {
    try {
      const data = {
        inviteCode: otpValues.join(''),
        appUserId: appUserId,
      };
      const res = await handleTrip(data);
      console.log(res,'console of res')
      if ('error' in res) {
        setIsOtpIncorrect(true);
        Toast.show({
          type: 'error',
          //@ts-ignore
          text1: res.error.data.errors || 'Failed To Join Trip',
        });
      } else {
        Toast.show({
          type: 'success',
          text1: 'Trip Joined',
        });
        //@ts-ignore
        navigation.navigate("TripDashboard", {tripId:res.data.data})
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <HeaderWrapper title="Join Trip">
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled">
        <View style={styles.container}>
          <View style={styles.loginContent}>
            <Text style={{fontWeight: '600'}}>Enter the trip code!</Text>
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
                    Wrong code. Please try again.
                  </Text>
                )}
              </View>
            </View>
          </View>

          <View style={styles.bottomContainer}>
            <Button
              isLoading={isLoading}
              onPress={handleJoinTrip}
              text="Join Trip"
            />
          </View>
        </View>
      </ScrollView>
    </HeaderWrapper>
  );
};

export default JoinTrip;

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
