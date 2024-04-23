import {StyleSheet, View, ScrollView, Platform} from 'react-native';
import React, {useState} from 'react';
import {HeaderWrapper} from '../../components/HeaderWrappers/HeaderWrapper';
import {Text} from '../../components/Text';
import PhoneInput from 'react-native-phone-input';
import {BLUE_COLOR, RED_COLOR} from '../../assets/colors';
import {Button} from '../../components/Button';
import {useNavigation} from '@react-navigation/native';
import {TextInput} from '../../components/TextInput/TextInput';
import {CustomCheckBox} from '../../components/CheckBox';
import Toast from 'react-native-toast-message';
import {Formik} from 'formik';
import * as yup from 'yup';
import {usePasswordlessStartMutation} from '../../store/services/auth0Api';

const Register = () => {
  const navigation = useNavigation();
  const [isCheckedRemember, setIsCheckedRemeber] = useState(false);
  const [isCheckedTerms, setIsCheckedTerms] = useState(false);
  const [Loading, setLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');

  const validationSchema = yup.object().shape({
    firstName: yup.string().required('First name is required'),
    lastName: yup.string().required('Last name is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    number: yup.string().required('Phone number is required'),
  });

  const toggleCheckBoxRememberMe = () => {
    setIsCheckedRemeber(!isCheckedRemember);
  };
  const toggleCheckBoxTerms = () => {
    setIsCheckedTerms(!isCheckedTerms);
  };
  const [passwordlessStart, {isLoading}] = usePasswordlessStartMutation();

  const handleRegister = async (values:any) => {
    try {
      setLoading(true)
      const response = await passwordlessStart({
        phoneNumber: phoneNumber,
      });
      if ('data' in response) {
        Toast.show({
          type: 'success',
          text1: 'Otp Sent Successfully',
        });
        //@ts-ignore
        navigation.navigate('OtpScreen', {phoneNumber,values});
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
    <HeaderWrapper>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled">
        <View style={styles.container}>
          <Formik
            initialValues={{
              firstName: '',
              lastName: '',
              email: '',
              number: '',
            }}
            onSubmit={handleRegister}
            validationSchema={validationSchema}>
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
            }) => (
              <>
                <View style={styles.loginContent}>
                  <Text variant="heading">Welcome to BlueKyte!</Text>
                  <Text
                    style={{marginTop: 20,marginBottom: Platform.OS === 'android' ? 20 : 0, paddingLeft: 5}}
                    variant="subheading">
                    Let's create an account!
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <View style={{width: '45%', height: 90}}>
                      <TextInput
                        placeholder="First name"
                        onChangeText={handleChange('firstName')}
                        onBlur={handleBlur('firstName')}
                        value={values.firstName}
                        showError={
                          touched.firstName && errors.firstName ? true : false
                        }
                        errorMessage={errors.firstName}
                      />
                    </View>
                    <View style={{width: '48%', height: 90}}>
                      <TextInput
                        placeholder="Last name"
                        onChangeText={handleChange('lastName')}
                        onBlur={handleBlur('lastName')}
                        value={values.lastName}
                        showError={
                          touched.lastName && errors.lastName ? true : false
                        }
                        errorMessage={errors.lastName}
                      />
                    </View>
                  </View>
                  <View style={{height: 90}}>
                    <TextInput
                      placeholder="Email"
                      keyboardType='email-address'
                      onChangeText={handleChange('email')}
                      onBlur={handleBlur('email')}
                      value={values.email}
                      showError={touched.email && errors.email ? true : false}
                      errorMessage={errors.email}
                    />
               
                  </View>
                  <View style={{marginTop: Platform.OS === "android" ? 0 : 20, height: 60}}>
                    <PhoneInput
                      style={{
                        ...styles.phoneInputStyle,
                        borderColor:
                          touched.number && errors.number
                            ? RED_COLOR
                            : '#E5E5E5',
                      }}
                      textStyle={styles.phoneInputTextStyle}
                      textProps={{
                        placeholder: '+1 (000) 000-000*',
                        placeholderTextColor: '#A3A3A3',
                      }}
                      onChangePhoneNumber={text => {
                        setPhoneNumber(text);
                        handleChange('number')(text);
                      }}
                    />
                    {touched.number && errors.number && (
                      <Text color={RED_COLOR}>{errors.number}</Text>
                    )}
                  </View>
                  <View style={{marginTop: Platform.OS === "android" ? 20 : 30}}>
                    <CustomCheckBox
                      label="Yes, I would love to receive updates!"
                      value={isCheckedRemember}
                      onValueChange={toggleCheckBoxRememberMe}
                    />
                    <CustomCheckBox
                      terms
                      value={isCheckedTerms}
                      onValueChange={toggleCheckBoxTerms}
                    />
                  </View>
                </View>
                <View style={styles.bottomContainer}>
                  <Button
                    isLoading={Loading}
                    disabled={Loading || !isCheckedTerms}
                    text="Continue"
                    onPress={() => handleSubmit()}
                  />
                  <Text style={styles.newAccountText}>
                    Already have an account?{' '}
                    <Text
                      onPress={() => navigation.navigate('Login' as never)}
                      style={{fontWeight: '600'}}
                      color={BLUE_COLOR}>
                      Sign in.
                    </Text>
                  </Text>
                </View>
              </>
            )}
          </Formik>
        </View>
      </ScrollView>
    </HeaderWrapper>
  );
};

export default Register;

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  loginContent: {
    marginHorizontal: 15,
    marginVertical: 30,
  },
  phoneInputStyle: {
    width: '100%',
    height: 45,
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginVertical: 10,
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
