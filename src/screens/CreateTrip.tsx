import React, {useRef, useState} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {HeaderWrapper} from '../components/HeaderWrappers/HeaderWrapper';
import {TripsTextInput} from '../components/TextInput/TripsTextInput';
import {Text} from '../components/Text';
import DateRangePicker from '../components/DateRangePicker';
import {BLUE_COLOR, PLACEHOLDER_COLOR, RED_COLOR} from '../assets/colors';
import Toast from 'react-native-toast-message';
import {Button} from '../components/Button';
import {AddFriendsIcon} from '../assets/svgs/AddFriendsIcon';
import SuccessModal from '../components/Modals/SuccessModal';
import {
  useCreateTripMutation,
  useGetUserProfileQuery,
} from '../store/services/api';
import {useDispatch, useSelector} from 'react-redux';
import {RootState, setTripId} from '../store/slices/auth';
import InviteFriendsBottomSheet, {
  InviteFriendsBottomSheetRef,
} from '../components/BottomSheets/InviteFriendsBottomSheet';
import {DeleteIcon} from '../assets/svgs/DeleteIcon';
import {DestinationIcon} from '../assets/svgs/DestinationIcon';
import {useNavigation} from '@react-navigation/native';
import MemberAvatarList from '../components/MembersAvatarList';

interface Member {
  fullName: string;
}

const CreateTrip = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [name, setName] = useState<string | undefined>(undefined);
  const [startTripDate, setStartTripDate] = useState<string | undefined>(
    undefined,
  );
  const [endTripDate, setEndTripDate] = useState<string | undefined>(undefined);
  const [destinations, setDestinations] = useState<Array<any>>([
    {id: 1, name: 'Destination 1'},
  ]);
  const [members, setMembers] = useState<Array<any>>([]);
  const FriendsBottomSheetRef = useRef<InviteFriendsBottomSheetRef | null>(
    null,
  );
  const [isSuccessModalVisible, setIsSuccessModalVisible] =
    useState<boolean>(false);
  const userPhoneNumber = useSelector(
    (state: RootState) => state.auth.userData,
  );
  const appUserId = useSelector((state: RootState) => state.auth.appUserId);
  console.log(appUserId,'console')
  const {data: {data} = {}} = useGetUserProfileQuery({});

  const handleStartDateChange = (date: string) => {
    setStartTripDate(date);
  };

  const handleEndDateChange = (date: string) => {
    setEndTripDate(date);
  };

  const handleCancel = () => {
    navigation.navigate('HomeScreen' as never);
  };

  const [createTripApi, {isLoading, isError, isSuccess}] =
    useCreateTripMutation();

  const handleCreateTrip = async () => {
    try {
      if (!name || !startTripDate || !endTripDate) {
        Toast.show({
          type: 'error',
          text1: 'Please fill out all required fields.',
          visibilityTime: 5000,
        });
        return;
      }
      const tripData = {
        name: name,
        appUserId: appUserId,
        startDate: startTripDate,
        endDate: endTripDate,
        memberships: members,
      };
      const response = await createTripApi(tripData);
      if ('data' in response) {
        dispatch(setTripId(response.data.data.tripId));
        setIsSuccessModalVisible(true);
      } else {
        Toast.show({
          type: 'error',
          //@ts-ignore
          text1: response?.error?.data?.errors || 'Failed to create trip. Please try again.',
          visibilityTime: 5000,
        });
      }
    } catch (error) {
      console.error('Error creating trip:', error);
      Toast.show({
        type: 'error',
        text1: 'An unexpected error occurred. Please try again.',
        visibilityTime: 5000,
      });
    }
  };
  const handleCloseModal = () => {
    setIsSuccessModalVisible(false);
  };

  const handleAddDestination = () => {
    setDestinations([...destinations, {id: destinations.length + 1}]);
  };

  const handleDeleteDestination = (index: number) => {
    const updatedDestinations = [...destinations];
    updatedDestinations.splice(index, 1);
    setDestinations(updatedDestinations);
  };

  const handleSelectedFriends = (selectedMembers: any) => {
    const processedMembers = selectedMembers.map((member: any) => ({
      fullName: member.fullName,
      phoneNumber: member.phoneNumber.replace(/[()\s-]/g, ''),
    }));
    const missingCountryCode = processedMembers.some(
      (member: any) => !/^\+[1-9]{1,2}[0-9]{10}$/.test(member.phoneNumber),
    );
    if (missingCountryCode) {
      Toast.show({
        type: 'error',
        text1: 'Phone numbers should start with a country..',
        text2: 'code like +1.',
        text2Style: {fontSize: 12, color: 'black', fontWeight: 'bold'},
        visibilityTime: 5000,
      });
      return;
    }
    setMembers(processedMembers);
  };
  // const handleRemoveMember = (index: number) => {    /////// for deleting the added friend
  //   const updatedMembers = [...members];
  //   updatedMembers.splice(index, 1);
  //   setMembers(updatedMembers);
  // };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex:1}}>
      <HeaderWrapper title="Create New Trip">
      <ScrollView
        style={styles.container}
        contentContainerStyle={{paddingBottom: 30}}
        showsVerticalScrollIndicator={false}>
        <View
          style={{
            marginBottom: 20,
            marginTop: Platform.OS === 'android' ? 20 : 0,
          }}>
          <TripsTextInput
            value={name}
            onChangeText={text => setName(text)}
            title="What will your trip be called?"
            placeholder="Choose a name for your trip"
          />
        </View>
        <Text style={styles.title}>
          When will you be going on this trip? <Text color={RED_COLOR}>*</Text>
        </Text>
        <View style={styles.dateRangeContainer}>
          <View style={{width: '48%'}}>
            <DateRangePicker
              placeholder="Start date"
              onDateChange={handleStartDateChange}
            />
          </View>
          <View style={{width: '48%'}}>
            <DateRangePicker
              placeholder="End date"
              onDateChange={handleEndDateChange}
            />
          </View>
        </View>
        <Text style={styles.title}>Where will you be traveling to?</Text>
        <Text
          color={PLACEHOLDER_COLOR}
          //@ts-ignore
          style={[styles.subheading, {marginBottom: 10}]}>
          You can always set your destination later.
        </Text>
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
                  onDateChange={() => {}}
                />
                <View style={{width: 30}} />
                <DateRangePicker
                  placeholder="End date"
                  onDateChange={() => {}}
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
        <View style={{marginTop: 20}}>
          <Text style={styles.title}>Who will you be traveling with?</Text>
          <Text color={PLACEHOLDER_COLOR} style={styles.subheading}>
            You can always invite your friends later.
          </Text>
          {members?.length < 1 ? (
            <TouchableOpacity
              style={{flexDirection: 'row', alignItems: 'center'}}
              onPress={() => FriendsBottomSheetRef.current?.open()}>
              <AddFriendsIcon style={{marginTop: 20}} />
            </TouchableOpacity>
          ) : (
            <View style={{marginLeft: 15}}>
              <MemberAvatarList
                data={members}
                FriendsBottomSheetRef={FriendsBottomSheetRef}
              />
            </View>
          )}
        </View>

        <View style={styles.footer}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={handleCancel}
              style={[
                styles.button,
                {
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderWidth: 1,
                  borderColor: RED_COLOR,
                  borderRadius: 10,
                },
              ]}>
              <Text color={RED_COLOR} style={{fontWeight: '600'}}>
                Cancel
              </Text>
            </TouchableOpacity>
            <Button
              isLoading={isLoading}
              onPress={handleCreateTrip}
              style={styles.button}
              text="Create Trip"
            />
          </View>
        </View>
      </ScrollView>
      <SuccessModal
        name={name}
        members={members}
        visible={isSuccessModalVisible}
        onClose={handleCloseModal}
      />
      <InviteFriendsBottomSheet
        forwardedRef={FriendsBottomSheetRef}
        onSelectedFriends={handleSelectedFriends}
      />
    </HeaderWrapper>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 15,
    flex: 1,
  },
  title: {
    fontWeight: '600',
    fontSize: 15,
  },
  dateRangeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  subheading: {
    fontSize: 14,
    marginTop: 7,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    marginHorizontal: 10,
  },
  footer: {
    flex: 1,
    justifyContent: 'flex-end',
    marginTop: 20,
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
    marginBottom: Platform.OS === 'ios' ? 0 : 10,
  },
  avatarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginLeft: 10,
  },
  removeIcon: {
    position: 'absolute',
    top: -6,
    right: 0,
    zIndex: 1,
  },
});

export default CreateTrip;
