import { createStackNavigator } from '@react-navigation/stack';
import { SignUpOptions } from '../screens/Auth/SignUpOptions';
import Login from '../screens/Auth/Login';
import OtpScreen from '../screens/Auth/OtpScreen';
import Register from '../screens/Auth/Register';
import { HomeStack } from './HomeStack';
import PrivacyPolicy from '../screens/SideBar/PrivacyPolicy';

export type AuthStackParamList = {
  SignUpOptions: undefined;
  Login: undefined;
  OtpScreen: { phoneNumber: any, values?:any };
  Register: undefined;
  Home: undefined;
  PrivacyPolicyScreen:undefined;
};

const Stack = createStackNavigator<AuthStackParamList>();

export const AuthStack = () => {
  const stackOptions = {headerShown: false};
  return (
    <Stack.Navigator>
      <Stack.Screen name="SignUpOptions" component={SignUpOptions} options={stackOptions} />
      <Stack.Screen name="Login" component={Login} options={stackOptions} />
      <Stack.Screen name="OtpScreen" component={OtpScreen} options={stackOptions} />
      <Stack.Screen name="Register" component={Register} options={stackOptions} />
      <Stack.Screen name="Home" component={HomeStack} options={stackOptions} />
      <Stack.Screen name="PrivacyPolicyScreen" component={PrivacyPolicy} options={stackOptions} />
    </Stack.Navigator>
  );
}