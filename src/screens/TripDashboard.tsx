import React, {useRef, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {TripDashboardHeaderWrapper} from '../components/HeaderWrappers/TripDashboardHeaderWrapper';
import {Text} from '../components/Text';
import {
  LocationIconFilled,
  LocationIconTransparent,
} from '../assets/svgs/LocationIcon';
import {SunIcon} from '../assets/svgs/SunIcon';
import {BLUE_COLOR} from '../assets/colors';
import {ClockIcon} from '../assets/svgs/ClockIcon';
import {CalenderDarkIcon} from '../assets/svgs/CalenderIcon';
import TabBar from '../components/TabBar/TabBar';
import {TaskIcon} from '../assets/svgs/TaskIcon';
import {IdeasIcon} from '../assets/svgs/IdeasIcon';
import {ExperiencesIcon} from '../assets/svgs/ExperiencesIcon';
import {ExpensesIcon} from '../assets/svgs/ExpensesIcon';
import Tasks from '../components/TabBar/Tasks';
import Ideas from '../components/TabBar/Ideas';
import Expenses from '../components/TabBar/Expenses';
import Experiences from '../components/TabBar/Experiences';
import {RouteProp} from '@react-navigation/native';
import {HomeStackParamList} from '../navigators/HomeStack';
import {useGetTripByIdQuery} from '../store/services/api';
import moment from 'moment';
import ManageFriendsBottomSheet, {
  ManageFriendsBottomSheetRef,
} from '../components/BottomSheets/ManageFriendsBottomSheet';
import MemberAvatarList from '../components/MembersAvatarList';

type TripDashboardRouteProp = RouteProp<HomeStackParamList, 'TripDashboard'>;
interface TripDashboardProps {
  route: TripDashboardRouteProp;
}

const TripDashboard: React.FC<TripDashboardProps> = ({route}) => {
  const {tripId} = route.params;
  const FriendsBottomSheetRef = useRef<ManageFriendsBottomSheetRef | null>(
    null,
  );
  const [members, setMembers] = useState<Array<any>>([]);
  const {
    data: {data} = {},
    isLoading,
    isFetching,
    isError,
  } = useGetTripByIdQuery(tripId);
  const IsTripDashboard = true;
  const tripInviteCode = data?.trip?.tripSetting?.inviteCode

  const [selectedTab, setSelectedTab] = useState(0);
  const tabIcons = [
    <TaskIcon />,
    <IdeasIcon />,
    <ExperiencesIcon />,
    <ExpensesIcon />,
  ];

  const handleTabPress = (index: any) => {
    setSelectedTab(index);
  };
  const renderTabContent = () => {
    switch (selectedTab) {
      case 0:
        return <Tasks />;
      case 1:
        return <Ideas />;
      case 2:
        return <Experiences />;
      case 3:
        return <Expenses />;
      default:
        return null;
    }
  };

  return (
    <TripDashboardHeaderWrapper
      IsTripDashboard={IsTripDashboard}
      tripId={tripId}>
      <View style={styles.container}>
        <View style={{marginHorizontal: 20, marginTop: 10}}>
          <View style={styles.header}>
            <Text style={styles.mainText}>{data?.trip?.name}</Text>
            <Text style={styles.smallText}>{`${moment(
              data?.trip?.startDate,
            ).format('MMM Do')} - ${moment(data?.trip?.endDate).format(
              'MMM Do',
            )}`}</Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={{marginLeft:10}}>
            <MemberAvatarList
              data={data}
              FriendsBottomSheetRef={FriendsBottomSheetRef}
            />
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'flex-end',
              }}>
              <View style={styles.rowContainer}>
                <LocationIconFilled />
                <Text style={styles.locationText}>San Jose</Text>
              </View>
              <View style={styles.rowContainer}>
                <SunIcon />
                <Text style={styles.temperatureText}>75*</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.nextTripCard}>
          <Text style={styles.mainText}>Next: Alcatraz Tour</Text>
          <View style={styles.nextTripDetails}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <LocationIconTransparent />
              <Text
                //@ts-ignore
                style={[styles.smallText, {marginLeft: 10}]}>
                pier 33 Alcatraz landing
              </Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <ClockIcon style={{marginRight: 5}} />
              <Text style={styles.smallText}>9:00 am</Text>
              <CalenderDarkIcon style={{marginHorizontal: 5}} />
              <Text style={styles.smallText}>9/21</Text>
            </View>
          </View>
        </View>
        <TabBar
          icons={tabIcons}
          selectedTab={selectedTab}
          handleTabPress={handleTabPress}
        />
        {renderTabContent()}
      </View>
      <ManageFriendsBottomSheet forwardedRef={FriendsBottomSheetRef} tripInviteCode={tripInviteCode} />
    </TripDashboardHeaderWrapper>
  );
};

export default TripDashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 15,
  },
  header: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  avatarsContainer: {
    flexDirection: 'row',
    marginTop: 10,
    marginLeft: 15,
  },
  smallText: {
    fontWeight: '300',
    fontSize: 13,
  },
  mainText: {
    fontSize: 17,
    fontWeight: '600',
    width:200
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  locationText: {
    fontSize: 16,
    marginHorizontal: 10,
  },
  temperatureText: {
    fontSize: 16,
  },
  nextTripCard: {
    padding: 15,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: BLUE_COLOR,
    marginTop: 20,
    height: 100,
    justifyContent: 'center',
  },
  nextTripDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  avatarContainer: {
    position: 'relative',
    marginLeft: -20,
  },
});
