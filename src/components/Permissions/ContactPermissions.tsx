import { PermissionsAndroid } from 'react-native';
import Contacts from 'react-native-contacts';

export const requestContactsPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
      {
        title: 'Contacts',
        message: 'This app would like to view your contacts.',
        buttonPositive: 'Please accept bare mortal',
      }
    );

    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      getContacts();
    } else {
      console.log('Contacts permission denied');
    }
  } catch (error) {
    console.error('Permission error: ', error);
  }
};

const getContacts = () => {
  Contacts.getAll()
    .then((contacts) => {
      // console.log('Contacts:', contacts);
    })
    .catch((error) => {
      console.log('Error fetching contacts:', error);
    });
};

