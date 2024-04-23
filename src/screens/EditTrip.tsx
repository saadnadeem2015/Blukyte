import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useRef, useState} from 'react';
import {TripDashboardHeaderWrapper} from '../components/HeaderWrappers/TripDashboardHeaderWrapper';
import {LocationIconFilled} from '../assets/svgs/LocationIcon';
import {SunIcon} from '../assets/svgs/SunIcon';
import {Text} from '../components/Text';
import {Switch} from 'react-native-elements';
import {TripsTextInput} from '../components/TextInput/TripsTextInput';
import DateRangePicker from '../components/DateRangePicker';
import Toast from 'react-native-toast-message';
import {ForwardArrowIcon} from '../assets/svgs/ForwardArrowIcon';
import {DestinationIcon} from '../assets/svgs/DestinationIcon';
import {DeleteIcon} from '../assets/svgs/DeleteIcon';
import {BLUE_COLOR} from '../assets/colors';
import { HomeStackParamList } from '../navigators/HomeStack';
import { RouteProp } from '@react-navigation/native';
import { useGetTripByIdQuery } from '../store/services/api';
import moment from 'moment';
import ManageFriendsBottomSheet, { ManageFriendsBottomSheetRef } from '../components/BottomSheets/ManageFriendsBottomSheet';
import MemberAvatarList from '../components/MembersAvatarList';

type EditTripRouteProp = RouteProp<HomeStackParamList, 'EditTrip'>;
interface EditTripProps {
  route: EditTripRouteProp;
}

const EditTrip: React.FC<EditTripProps> = ({ route }) => {
  const { tripId } = route.params;
  const { data: {data} = {}, isLoading, isFetching, isError} = useGetTripByIdQuery(tripId);
  const FriendsBottomSheetRef = useRef<ManageFriendsBottomSheetRef | null>(null);

  const avatarImages = [
    require('../assets/images/Onboarding1.png'),
    require('../assets/images/Onboarding2.png'),
    require('../assets/images/Onboarding3.png'),
    require('../assets/images/LoginScreenImage.png'),
    require('../assets/images/Onboarding3.png'),
  ];
  const [checked, setChecked] = useState(false);
  const [startDate, setStartDate] = useState<string | undefined>(undefined);
  const [endDate, setEndDate] = useState<string | undefined>(undefined);
  const [destinations, setDestinations] = useState<Array<any>>([
    {id: 1, name: 'Destination 1'},
  ]);

  const handleStartDateChange = (date: string) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date: string) => {
    setEndDate(date);
    if (startDate && endDate && new Date(endDate) < new Date(startDate)) {
      Toast.show({
        type: 'error',
        text1: 'End date must be later than the start date',
        visibilityTime: 5000,
      });
    }
  };

  const toggleSwitch = () => {
    setChecked(!checked);
  };

  const handleAddDestination = () => {
    setDestinations([...destinations, {id: destinations.length + 1}]);
  };

  const handleDeleteDestination = (index: number) => {
    const updatedDestinations = [...destinations];
    updatedDestinations.splice(index, 1);
    setDestinations(updatedDestinations);
  };

  return (
    <TripDashboardHeaderWrapper tripId={tripId}>
      <View style={styles.container}>
        <View style={{marginHorizontal: 15}}>
          <View style={styles.header}>
            <Text
              //@ts-ignore
              style={[styles.mainText, {fontWeight: '700'}]}>
              {data?.trip?.name}
            </Text>
            <Text style={styles.smallText}>{`${moment(data?.trip?.startDate).format('MMM Do')} - ${moment(data?.trip?.endDate).format('MMM Do')}`}</Text>
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
        <ScrollView
          style={{marginTop: 15, flex: 1}}
          contentContainerStyle={{paddingBottom: 30}}
          showsVerticalScrollIndicator={false}>
          <View style={styles.body}>
            <Text style={styles.mainText}>Notification</Text>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{marginVertical: 20}}>Reminder</Text>
            <Switch
              value={checked}
              onValueChange={value => setChecked(value)}
              trackColor={{true: '#22C55E', false: 'silver'}}
              style={{transform: [{scaleX: 0.8}, {scaleY: 0.8}]}}
            />
          </View>
          <View style={styles.body}>
            <Text style={styles.mainText}>Trip Details</Text>
          </View>
          <TripsTextInput placeholder="Family Trip to Australia" />
          <View style={styles.body}>
            <Text style={styles.mainText}>Destinations</Text>
          </View>
          <TripsTextInput placeholder="Melbourne" />
          {destinations.map((destination, index) => (
            <View key={index} style={styles.destinationCard}>
              <View style={{marginHorizontal: 10}}>
                <View style={styles.destinationRow}>
                  <DestinationIcon />
                  <Text
                    style={{marginLeft: 10}}
                    variant="subheading">{`Destination ${index + 1}`}</Text>
                  {index !== 0 && (
                    <View style={{flex: 1, alignItems: 'flex-end'}}>
                      <TouchableOpacity
                        onPress={() => handleDeleteDestination(index)}>
                        <DeleteIcon />
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
                <TripsTextInput placeholder="First Stop" />
                <View style={styles.dateRangeContainer}>
                  <DateRangePicker
                    placeholder="Start date"
                    onDateChange={handleStartDateChange}
                  />
                  <View style={{width: 30}} />
                  <DateRangePicker
                    placeholder="End date"
                    onDateChange={handleEndDateChange}
                  />
                </View>
              </View>
            </View>
          ))}
          <Text
            onPress={handleAddDestination}
            color={BLUE_COLOR}
            style={{fontWeight: '600', marginTop: 10}}>
            + Add a Destination
          </Text>
          <View
            style={[
              styles.body,
              {flexDirection: 'row', justifyContent: 'space-between'},
            ]}>
            <Text style={styles.mainText}>Members</Text>
            <ForwardArrowIcon />
          </View>
          <View style={[styles.avatarsContainer, {marginTop: 20}]}>
            {avatarImages.map((avatar, index) => (
              <Image key={index} source={avatar} style={styles.avatar} />
            ))}
          </View>
        </ScrollView>
      </View>
      <ManageFriendsBottomSheet forwardedRef={FriendsBottomSheetRef} />
    </TripDashboardHeaderWrapper>
  );
};

export default EditTrip;

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
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: -20,
  },
  smallText: {
    fontWeight: '300',
    fontSize: 13,
  },
  mainText: {
    fontSize: 17,
    fontWeight: '600',
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
  body: {
    marginTop: 20,
  },
  dateRangeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  destinationCard: {
    padding: 10,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    marginVertical: 10,
  },
  destinationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
  },
  avatarContainer: {
    position: 'relative',
    marginLeft: -20,
  },
});
