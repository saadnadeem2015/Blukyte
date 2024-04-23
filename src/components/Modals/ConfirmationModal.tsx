import React from 'react';
import {StyleSheet, View, Modal, Platform} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Button} from '../Button';
import {Text} from '../Text';
import {RED_COLOR} from '../../assets/colors';
import {AlertIcon} from '../../assets/svgs/AlertIcon';
import {useDeleteTripMutation, useLeaveTripMutation} from '../../store/services/api';
import Toast from 'react-native-toast-message';

interface ConfirmationModalProps {
  visible: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  tripId?: any;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  visible,
  onClose,
  title,
  description,
  tripId,
}) => {
  const navigation = useNavigation();
  const [deleteTrip, {isLoading:isLoadingDeleteTrip}] = useDeleteTripMutation();
  const [leaveTrip, {isLoading:isLoadingLeaveTrip}] = useLeaveTripMutation();

  if (!visible) {
    return null;
  }

  const handleNeverMind = () => {
    onClose();
  };
  const handleLeaveOrDelete = async () => {
    try {
      let res;
      let successMessage;
  
      if (title === 'Leave Trip') {
        res = await leaveTrip(tripId);
        successMessage = 'You have left the trip';
      } else {
        res = await deleteTrip(tripId);
        successMessage = 'Your trip has been deleted successfully';
      }
      if ('data' in res) {
        navigation.navigate('HomeScreen' as never);
        Toast.show({
          type: 'success',
          text1: successMessage,
        });
      } else {
        const error = res.error;
        Toast.show({
          type: 'error',
          //@ts-ignore
          text1: error.data?.errors || `An error occurred while ${title === 'Leave Trip' ? 'leaving' : 'deleting'} the trip.`,
        });
      }
    } catch (error) {
      console.log(error, 'console of error');
    } finally {
      onClose();
    }
  };
  
  return (
    <Modal
      transparent
      animationType="fade"
      visible={visible}
      onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.contentContainer}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <AlertIcon />
            <Text
              color="#FFFFFF"
              style={{...styles.successText, marginLeft: 10}}>
              {title}
            </Text>
          </View>

          <Text
            color="#FFFFFF"
            style={{marginVertical: 5, marginHorizontal: 22}}>
            {description}
          </Text>
          <View style={styles.buttonContainer}>
            <Button
              isLoading={isLoadingDeleteTrip || isLoadingLeaveTrip}
              onPress={handleLeaveOrDelete}
              style={{...styles.button, backgroundColor: RED_COLOR}}
              text={title}
              textStyle={{fontSize: 14, fontWeight: '600'}}
            />
            <Button
              onPress={handleNeverMind}
              style={{
                ...styles.button,
                marginLeft: 20,
                backgroundColor: '#FFFFFF',
              }}
              text="Nevermind"
              textStyle={{color: 'black', fontSize: 14}}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ConfirmationModal;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  contentContainer: {
    backgroundColor: '#171717CC',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  successText: {
    marginVertical: 5,
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    width: Platform.OS === 'ios' ? 100 : 120,
    marginHorizontal: 22,
  },
  button: {
    height: 38,
    marginTop: 20,
    borderRadius: 8,
  },
});
