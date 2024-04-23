import {createStackNavigator} from '@react-navigation/stack';
import Home from '../screens/Home';
import DrawerScreen from '../screens/SideBar/DrawerScreen';
import EditProfile from '../screens/SideBar/EditProfile';
import Notifications from '../screens/SideBar/Notifications';
import Location from '../screens/SideBar/Location';
import PrivacyPolicy from '../screens/SideBar/PrivacyPolicy';
import FeedBack from '../screens/SideBar/FeedBack';
import CreateTrip from '../screens/CreateTrip';
import { BottomTabs } from './BottomTabs';
import EditTrip from '../screens/EditTrip';
import JoinTrip from '../screens/JoinTrip';

export type HomeStackParamList = {
  HomeScreen:undefined;
  Drawer:undefined;
  EditProfile:{ isFirstLogin: boolean };
  Notifications:undefined;
  Location:undefined;
  PrivacyPolicy:undefined;
  FeedBack:undefined;
  CreateTrip:undefined;
  TripDashboard: { tripId: string };
  EditTrip:{ tripId: string };
  JoinTrip:{phoneNumber:any,values:any};
};

const Stack = createStackNavigator<HomeStackParamList>();

export const HomeStack = () => {
  const stackOptions = {headerShown: false};

  return (
    <Stack.Navigator>
      <Stack.Screen name="HomeScreen" component={Home} options={stackOptions} />
      <Stack.Screen name="Drawer" component={DrawerScreen} options={stackOptions} />
      <Stack.Screen name="EditProfile" component={EditProfile} options={stackOptions} />
      <Stack.Screen name="Notifications" component={Notifications} options={stackOptions} />
      <Stack.Screen name="Location" component={Location} options={stackOptions} />
      <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} options={stackOptions} />
      <Stack.Screen name="FeedBack" component={FeedBack} options={stackOptions} />
      <Stack.Screen name="CreateTrip" component={CreateTrip} options={stackOptions} />
      <Stack.Screen name="TripDashboard" component={BottomTabs} options={stackOptions} />
      <Stack.Screen name="EditTrip" component={EditTrip} options={stackOptions} />
      <Stack.Screen name="JoinTrip" component={JoinTrip} options={stackOptions} />
    </Stack.Navigator>
  );
};
