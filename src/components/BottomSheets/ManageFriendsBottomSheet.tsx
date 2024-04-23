import React, {
  useRef,
  FC,
  forwardRef,
  useImperativeHandle,
  useState,
} from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import Contacts from 'react-native-contacts';
import {Text} from '../Text';
import {CustomCheckBox} from '../CheckBox';
import {Button} from '../Button';
import {useInviteMembersMutation} from '../../store/services/api';
import {useSelector} from 'react-redux';
import {RootState} from '../../store/slices/auth';
import Toast from 'react-native-toast-message';

interface ManageFriendsBottomSheetProps {
  forwardedRef: React.Ref<ManageFriendsBottomSheetRef>;
  tripInviteCode:any
}
interface Contact {
  recordID: string;
  givenName: string;
  phoneNumbers: {number: string}[];
}
export interface ManageFriendsBottomSheetRef {
  open: () => void;
  close: () => void;
  tripInviteCode?:any
}

const ManageFriendsBottomSheet: FC<ManageFriendsBottomSheetProps> = forwardRef<
  ManageFriendsBottomSheetRef,
  ManageFriendsBottomSheetProps
>(({forwardedRef,tripInviteCode}, ref) => {
  const bottomSheetRef = useRef<RBSheet | null>(null);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [selectedContacts, setSelectedContacts] = useState<string[]>([]);
  const tripId = useSelector((state: RootState) => state.auth.tripId);

  useImperativeHandle(
    forwardedRef,
    () => ({
      open: () => {
        bottomSheetRef.current?.open();
        fetchContacts();
      },
      close: () => {
        bottomSheetRef.current?.close();
        setContacts([]);
      },
    }),
    [],
  );
  const fetchContacts = () => {
    Contacts.getAll()
      .then(contacts => {
        const contactsWithPhone = contacts.filter(
          contact => contact.phoneNumbers && contact.phoneNumbers.length > 0,
        );
        const sortedContacts = contactsWithPhone.sort((a, b) =>
          a.givenName.localeCompare(b.givenName)
        );
        setContacts(sortedContacts);
      })
      .catch(error => console.error('Error fetching contacts:', error));
  };  

  const [inviteMembers, {isLoading, isError, isSuccess}] =
    useInviteMembersMutation();

  const handleInviteFriends = async () => {
    const selectedContactsInfo = contacts
      .filter(contact => selectedContacts.includes(contact.recordID))
      .map(contact => {
        const phoneNumber =
          contact.phoneNumbers.length > 0
            ? contact.phoneNumbers[0].number
            : null;
        return {fullName: contact.givenName, phoneNumber};
      })
      .filter(contactInfo => contactInfo.phoneNumber !== null) as {
      fullName: string;
      phoneNumber: string;
    }[];

    const processedMembers = selectedContactsInfo.map((member: any) => ({
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

    const dataToSubmit = {
      tripId: tripId,
      RecipientPhoneNumbers: selectedContactsInfo.map(
        contact => contact.phoneNumber,
      ),
      tripInviteCode:tripInviteCode
    };

    try {
      const response = await inviteMembers(dataToSubmit);
      if ('data' in response) {
        Toast.show({
          type: 'success',
          text1: 'Invited Successfully',
        });
        bottomSheetRef?.current?.close();
        setSelectedContacts([]);
      } else {
        Toast.show({
          type: 'error',
          //@ts-ignore
          text1: response?.error?.data?.message || 'Failed to Invite Member. Please try again.',
          visibilityTime: 5000,
        });
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'An unexpected error occurred. Please try again.',
      });
    }
  };

  const toggleContactSelection = (recordID: string) => {
    const isSelected = selectedContacts.includes(recordID);
    if (isSelected) {
      setSelectedContacts(prevSelected =>
        prevSelected.filter(id => id !== recordID),
      );
    } else {
      setSelectedContacts(prevSelected => [...prevSelected, recordID]);
    }
  };

  const renderItem = ({item}: {item: Contact}) => (
    <View>
      <View
        style={{
          marginVertical: 5,
          flexDirection: 'row',
          alignItems: 'flex-start',
        }}>
        <CustomCheckBox
          value={selectedContacts.includes(item.recordID)}
          onValueChange={() => toggleContactSelection(item.recordID)}
        />
        <View
          style={{
            marginLeft: 10,
            flexDirection: 'column',
            alignItems: 'flex-start',
            marginTop: 5,
          }}>
          <Text variant="subheading">{item.givenName}</Text>
            <Text
              style={{fontWeight: '300', fontSize: 14, marginTop: 2}}>
              {item?.phoneNumbers[0].number}
            </Text>
        </View>
      </View>
    </View>
  );

  return (
    //@ts-ignore
    <RBSheet
      ref={bottomSheetRef}
      height={500}
      closeOnDragDown={false}
      customStyles={{
        wrapper: {
          backgroundColor: 'transparent',
          shadowColor: '#000',
          shadowOffset: {width: 0, height: 2},
          shadowOpacity: 0.5,
          shadowRadius: 3.84,
          elevation: 12,
        },
        container: {
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
          elevation: 12,
        },
      }}>
      <View style={styles.container}>
        <View
          style={{
            width: 130,
            height: 2,
            backgroundColor: '#A3A3A3',
            alignSelf: 'center',
          }}
        />
        <FlatList
          showsVerticalScrollIndicator={false}
          style={{marginTop: 15}}
          contentContainerStyle={{gap: 20}}
          data={contacts}
          keyExtractor={item => item.recordID}
          renderItem={renderItem}
        />
      </View>
      <View style={styles.footer}>
        <Button
          text="Invite"
          textStyle={{fontWeight: '700'}}
          onPress={handleInviteFriends}
          isLoading={isLoading}
        />
      </View>
    </RBSheet>
  );
});

export default ManageFriendsBottomSheet;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginTop: 20,
    flex: 1,
  },
  footer: {
    backgroundColor: '#FFFFFF',
    padding: 25,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    shadowColor: '#000',
    shadowOffset: {width: 2, height: -7},
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 12,
  },
});
