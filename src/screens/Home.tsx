import React, {useEffect, useRef} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Platform,
  RefreshControl,
} from 'react-native';
import {Text} from '../components/Text';
import {HomeHeaderWrapper} from '../components/HeaderWrappers/HomeHeaderWrapper';
import Avatar from '../components/Avatar';
import {LocationIconFilled} from '../assets/svgs/LocationIcon';
import {SunIcon} from '../assets/svgs/SunIcon';
import {Button} from '../components/Button';
import TripsCard from '../components/Cards/TripsCard';
import {MemoriesCard} from '../components/Cards/MemoriesCard';
import CreateTripBottomSheet, {
  CreateTripBottomSheetRef,
} from '../components/BottomSheets/CreateTripBottomSheet';
import {requestContactsPermission} from '../components/Permissions/ContactPermissions';
import {useGetTripsQuery, useGetUserProfileQuery} from '../store/services/api';
import TripsCardLoader from '../components/DummyLoaders/TripsCardLoader';
import {StackNavigationProp} from '@react-navigation/stack';
import {HomeStackParamList} from '../navigators/HomeStack';
import { useDispatch } from 'react-redux';
import { setAppUserId } from '../store/slices/auth';

type HomeProps = {
  navigation: StackNavigationProp<HomeStackParamList, 'HomeScreen'>;
};

const Home: React.FC<HomeProps> = ({navigation}) => {
  const dispatch = useDispatch()
  const bottomSheetRef = useRef<CreateTripBottomSheetRef | null>(null);
  const {
    data: {data: userData} = {},
    isLoading: isUserLoading,
    isFetching: isUserFetching,
    isError: isUserError,
    error: userError,
  } = useGetUserProfileQuery({});
  const {
    data: tripsData,
    isLoading: isTripsLoading,
    isFetching: isTripsFetching,
    refetch: refetchTrips,
    isError: isTripsError,
    error: tripsError,
  } = useGetTripsQuery({});

  useEffect(() => {
    //@ts-ignore
    if ( !isUserLoading && !isUserFetching && userError?.error === 'User Profile not found') {
      navigation.replace('EditProfile', {isFirstLogin: true});
    }
    if(userData){
      dispatch(setAppUserId(userData.appUserId));
    }
    if (Platform.OS === 'android') {
      requestContactsPermission();
    }
  }, [isUserLoading, isUserFetching, userError]);

  const topTwoTrips = tripsData?.data?.slice(-2);
  const isTripsDataUnavailable = tripsData === undefined || tripsData === null;

  return (
    <HomeHeaderWrapper>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={isTripsLoading}
            onRefresh={refetchTrips}
          />
        }
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContainer}>
        <View style={styles.container}>
          <View style={styles.Header}>
            <Avatar size="medium" userName={userData?.firstName} />
            <View style={styles.userInfoContainer}>
              <Text
                numberOfLines={2}
                variant="subheading"
                style={styles.usernameText}>
                Good Morning, {userData?.firstName}!
              </Text>
              <View style={styles.rowContainer}>
                <LocationIconFilled />
                <Text style={styles.locationText}>San Jose</Text>
                <SunIcon />
                <Text style={styles.temperatureText}>75*</Text>
              </View>
            </View>
          </View>
          <View style={styles.sectionContainer}>
            <Text variant="subheading" style={{fontWeight: '700'}}>
              Trips
            </Text>
            <Button
              onPress={() => bottomSheetRef.current?.open()}
              style={{width: 110, height: 40}}
              text="New Trip"
              textStyle={{fontWeight: Platform.OS === 'ios' ? '700' : '600'}}
            />
          </View>
          {isTripsFetching || isTripsLoading || isTripsDataUnavailable || isTripsError ? (
            <TripsCardLoader />
            ) : (
            <TripsCard item={topTwoTrips} />
            )}
          <View style={styles.sectionContainer}>
            <Text variant="subheading" style={{fontWeight: '700'}}>
              Memories
            </Text>
          </View>
          <MemoriesCard />
        </View>
      </ScrollView>
      <CreateTripBottomSheet forwardedRef={bottomSheetRef} />
    </HomeHeaderWrapper>
  );
};

export default Home;

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
  },
  container: {
    marginHorizontal: 20,
    marginTop: 10,
  },
  Header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userInfoContainer: {
    marginLeft: 10,
  },
  usernameText: {
    fontWeight: '600',
    fontSize: 26,
    marginRight: Platform.OS === 'ios' ? 80 : 60,
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
    marginHorizontal: 5,
  },
  sectionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
});
