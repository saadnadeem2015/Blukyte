import {StyleSheet, View, ScrollView, Platform} from 'react-native';
import React, {useState} from 'react';
import PhoneInput from 'react-native-phone-input';
import {RouteProp, useNavigation} from '@react-navigation/native';
import {Formik} from 'formik';
import {HeaderWrapper} from '../../components/HeaderWrappers/HeaderWrapper';
import {Text} from '../../components/Text';
import {TextInput} from '../../components/TextInput/TextInput';
import {RED_COLOR} from '../../assets/colors';
import {Button} from '../../components/Button';
import Avatar from '../../components/Avatar';
import {VISBY_SEMIBOLD} from '../../assets/fonts';
import {useDispatch, useSelector} from 'react-redux';
import {RootState, setAppUserId} from '../../store/slices/auth';
import {useCreateUserMutation, useGetUserProfileQuery} from '../../store/services/api';
import Toast from 'react-native-toast-message';
import * as yup from 'yup';
import { StackNavigationProp } from '@react-navigation/stack';
import { HomeStackParamList } from '../../navigators/HomeStack';

type EditProfileProps = {
  route: RouteProp<HomeStackParamList, 'EditProfile'>;
  navigation: StackNavigationProp<HomeStackParamList, 'EditProfile'>;
};

const EditProfile: React.FC<EditProfileProps> = ({ route }) => { 
  const isFirstLogin = route?.params?.isFirstLogin
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { data: { data } = {}, isLoading: isUserDataLoading, isFetching, isError } = useGetUserProfileQuery({});
  const [isLoading, setIsLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const UserPhoneNumber = useSelector(
    (state: RootState) => state.auth.userData,
  );
  
  const validationSchema = yup.object().shape({
    firstName: yup.string().required('First name is required'),
    lastName: yup.string().required('Last name is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
  });

  const [createUser] = useCreateUserMutation();

  const HandleRegister = async (values: any) => {
    const userData = {
      email: values.email,
      firstName: values.firstName,
      lastName: values.lastName,
      phoneNumber: UserPhoneNumber,
    };
    try {
      setIsLoading(true);
      const result = await createUser(userData);
      if (result && 'data' in result && result.data && 'success' in result.data && result.data.success) {
        dispatch(setAppUserId(result.data.data));
        Toast.show({
          type: 'success',
          text1: 'Profile Updated SuccessFully',
        });
        navigation.reset({
          index: 0,
          routes: [{ name: 'HomeScreen' as never}],
        })
      } else {
        Toast.show({
          type: 'error',
          //@ts-ignore
          text1: result?.data?.errors || 'An error occurred',
        });
      }
      console.log(result, 'console of api');
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <HeaderWrapper isFirstLogin={isFirstLogin} title={isFirstLogin ? "Setup Profile" : "Edit Profile"}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled">
        <View style={styles.container}>
          <Formik
            initialValues={{
              firstName: data?.firstName || '',
              lastName: data?.lastName || '',
              email: data?.email || '',
              number: data?.phoneNumber || '',
            }}
            validationSchema={validationSchema}
            onSubmit={HandleRegister}>
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
                  <View style={styles.image}>
                    <Avatar size="medium" userName={data?.firstName} showCameraIcon />
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginTop:Platform.OS === 'ios' ? 0 : 20
                    }}>
                    <View style={{width: '48%', height: 90}}>
                      <TextInput
                        title="First name"
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
                        title="Last name"
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
                      title="Email address"
                      placeholder="Email"
                      onChangeText={handleChange('email')}
                      onBlur={handleBlur('email')}
                      value={values.email}
                      showError={touched.email && errors.email ? true : false}
                      errorMessage={errors.email}
                    />
                  </View>
                  <View style={{marginTop: Platform.OS === 'ios' ? 30 : 10, height: 60}}>
                    <Text
                      style={{
                        fontWeight: '300',
                        fontFamily: VISBY_SEMIBOLD,
                        fontSize: 14,
                        marginLeft: 2,
                      }}>
                      Phone number
                    </Text>
                    <PhoneInput
                      style={{
                        ...styles.phoneInputStyle,
                        borderColor:
                          touched.number && errors.number
                            ? RED_COLOR
                            : '#E5E5E5',
                      }}
                      textStyle={styles.phoneInputTextStyle}
                      initialValue={UserPhoneNumber}
                      disabled
                    />
                  </View>
                <Text color='#737373' style={{marginTop:25}}>Your number is currently unchangeable.</Text>
                </View>
                <View style={styles.bottomContainer}>
                  <Button
                    isLoading={isLoading}
                    onPress={() => handleSubmit()}
                    disabled={isLoading}
                    text="Save"
                  />
                  <Text color={RED_COLOR} style={styles.newAccountText}>
                    Delete Account
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

export default EditProfile;

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
    marginVertical: 20,
  },
  phoneInputStyle: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginVertical: 10,
  },
  phoneInputTextStyle: {
    fontSize: 16,
    color: '#404040',
  },
  bottomContainer: {
    alignItems: 'center',
    marginBottom: 30,
    marginHorizontal: 15,
  },
  newAccountText: {
    marginTop: 30,
    fontWeight: '600',
  },
  image: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
