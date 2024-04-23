import React, {ReactNode} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import TripDashboard from '../screens/TripDashboard';
import {BottomTabAddIcon} from '../assets/svgs/BottomTabAddIcon';
import Discover from '../screens/Discover';
import Timeline from '../screens/Timeline';
import Account from '../screens/Account';
import {Platform, TouchableOpacity, useWindowDimensions} from 'react-native';
import Logistic from '../screens/Logistic';
import {TimelineIcon, TimelineIconBlue} from '../assets/svgs/TimelineIcon';
import {LogisticIcon, LogisticIconBlue} from '../assets/svgs/LogisticIcon';
import {DiscoverIcon, DiscoverIconBlue} from '../assets/svgs/DiscoverIcon';
import {BLACK_TEXT} from '../assets/colors';
import Avatar from '../components/Avatar';
import { RouteProp } from '@react-navigation/native';
import { HomeStackParamList } from './HomeStack';

const Tab = createBottomTabNavigator();

type BottomTabRouteProp = RouteProp<HomeStackParamList, 'TripDashboard'>;
interface BottomTabProps {
  route: BottomTabRouteProp;
}

 export const BottomTabs: React.FC<BottomTabProps> = ({ route }) => {
  const { height } = useWindowDimensions();
  const stackOptions = {headerShown: false};
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          shadowColor: '#000',
          shadowOffset: {width: 2, height: -7},
          shadowOpacity: 0.05,
          shadowRadius: 5,
          height: height < 800 ? 70 : Platform.OS === 'ios' ? 100 : 80,
        },
        tabBarActiveTintColor: BLACK_TEXT,
        tabBarLabelStyle:{marginBottom:height < 800 ? 10 : 10,fontWeight:'300',fontSize:13,color:'#171717'},
        tabBarIconStyle:{ marginTop:10 }
      }}
      initialRouteName="Dashboard">
      <Tab.Screen
        name="Discover"
        component={Discover}
        options={{
          tabBarIcon: ({focused}) =>
            focused ? <DiscoverIconBlue /> : <DiscoverIcon />,
          ...stackOptions,
        }}
      />
      <Tab.Screen
        name="Logistic"
        component={Logistic}
        options={{
          tabBarIcon: ({focused}) =>
            focused ? <LogisticIconBlue /> : <LogisticIcon />,
          ...stackOptions,
        }}
      />
      <Tab.Screen
        name="Dashboard"
        //@ts-ignore
        component={TripDashboard}
        initialParams={{ tripId: route.params.tripId }}
        listeners={({navigation}) => ({
          tabPress: e => {
            console.log('FIRE CAMARA HERE!');
            e.preventDefault();
          },
        })}
        options={{
          tabBarIcon: ({}) => <BottomTabAddIcon />,
          tabBarLabel: () => null,
          //@ts-ignore
          tabBarButton: props => <TabBarCenterButton {...props} height={height} />,
          ...stackOptions,
        }}
      />
      <Tab.Screen
        name="Timeline"
        component={Timeline}
        options={{
          tabBarIcon: ({focused}) =>
            focused ? <TimelineIconBlue /> : <TimelineIcon />,
          ...stackOptions,
        }}
      />
      <Tab.Screen
        name="Account"
        component={Account}
        options={{
          tabBarIcon: ({color, size}) => <Avatar size='small' width={23} height={25} userName='U' />,
          ...stackOptions,
        }}
      />
    </Tab.Navigator>
  );
}
interface TabBarCenterButtonProps {
  children: ReactNode;
  onPress: () => void;
  height: number;
}

const TabBarCenterButton: React.FC<TabBarCenterButtonProps> = ({
  children,
  onPress,
  height
}) => (
  <TouchableOpacity
    style={{
      justifyContent: 'center',
      alignItems: 'center',
      marginHorizontal: 30,
      marginTop: height < 800 ? 0 : 10,
    }}
    onPress={onPress}>
    {children}
  </TouchableOpacity>
);

export default TabBarCenterButton;
