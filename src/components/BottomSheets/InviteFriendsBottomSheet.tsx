import React, {
  useRef,
  FC,
  forwardRef,
  useImperativeHandle,
  useState,
} from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import Contacts from 'react-native-contacts';
import { Text } from '../Text';
import { CustomCheckBox } from '../CheckBox';
import { Button } from '../Button';

interface InviteFriendsBottomSheetProps {
  forwardedRef: React.Ref<InviteFriendsBottomSheetRef>;
  onSelectedFriends: (selectedContacts: { fullName: string, phoneNumber: string }[]) => void;
}
interface Contact {
  recordID: string;
  givenName: string;
  phoneNumbers: { number: string }[];
}
export interface InviteFriendsBottomSheetRef {
  open: () => void;
  close: () => void;
}

const InviteFriendsBottomSheet: FC<InviteFriendsBottomSheetProps> = forwardRef<
  InviteFriendsBottomSheetRef,
  InviteFriendsBottomSheetProps
>(( { forwardedRef, onSelectedFriends }, ref) => {
  const bottomSheetRef = useRef<RBSheet | null>(null);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [selectedContacts, setSelectedContacts] = useState<string[]>([]);

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

  const handleInviteFriends = () => {
    const selectedContactsInfo = contacts
      .filter(contact => selectedContacts.includes(contact.recordID))
      .map(contact => {
        const phoneNumber = contact.phoneNumbers.length > 0 ? contact.phoneNumbers[0].number : null;
        return { fullName: contact.givenName, phoneNumber };
      })
      .filter(contactInfo => contactInfo.phoneNumber !== null) as { fullName: string, phoneNumber: string }[];

    onSelectedFriends(selectedContactsInfo);
    bottomSheetRef.current?.close();
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

  const renderItem = ({ item }: { item: Contact }) => (
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
              style={{ fontWeight: '300', fontSize: 14, marginTop: 2 }}>
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
          shadowOffset: { width: 0, height: 2 },
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
          style={{ marginTop: 15 }}
          contentContainerStyle={{ gap: 20 }}
          data={contacts}
          keyExtractor={item => item.recordID}
          renderItem={renderItem}
        />
      </View>
      <View style={styles.footer}>
        <Button
          text="Invite"
          textStyle={{ fontWeight: '700' }}
          onPress={handleInviteFriends}
        />
      </View>
    </RBSheet>
  );
});

export default InviteFriendsBottomSheet;

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
    shadowOffset: { width: 2, height: -7 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 12,
  },
});
