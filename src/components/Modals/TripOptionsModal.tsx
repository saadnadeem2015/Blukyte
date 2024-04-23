import React, {FC, useState} from 'react';
import {
  Modal,
  TouchableOpacity,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import {Text} from '../Text';
import {WHITE_TEXT} from '../../assets/colors';
import {DeleteIconWhite} from '../../assets/svgs/DeleteIcon';
import {LeaveIcon} from '../../assets/svgs/LeaveIcon';
import {EditIcon} from '../../assets/svgs/EditIcon';
import {ManageFriendsIcon} from '../../assets/svgs/ManageFriendsIcon';
import {useNavigation} from '@react-navigation/native';
import {UploadIcon} from '../../assets/svgs/UploadIcon';
import ConfirmationModal from './ConfirmationModal';

interface TripOptionsModalProps {
  isVisible: boolean;
  onClose: () => void;
  IsTripDashboard?: boolean;
  tripId?:any;
}

const TripOptionsModal: FC<TripOptionsModalProps> = ({
  isVisible,
  onClose,
  IsTripDashboard,
  tripId
}) => {
  const navigation = useNavigation();
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [confirmationModalProps, setConfirmationModalProps] = useState({
    title: '',
    description: '',
  });

  const handleEditTrip = () => {
    onClose();
    //@ts-ignore
    navigation.navigate('EditTrip',{tripId:tripId});
  };

  const handleConfirmationModalClose = () => {
    setShowConfirmationModal(false);
    onClose();
  };

  const handleLeaveTrip = () => {
    setConfirmationModalProps({
      title: 'Leave Trip',
      description: 'Are you sure you want to leave this trip? Your friends will be notified.',
    });
    setShowConfirmationModal(true);
  };

  const handleDeleteTrip = () => {
    setConfirmationModalProps({
      title: 'Delete Trip',
      description: 'Are you sure you want to delete this trip?',
    });
    setShowConfirmationModal(true);
  };

  return (
    <Modal visible={isVisible} transparent animationType="fade">
      <TouchableWithoutFeedback
        hitSlop={{right: 1000, left: 1000, bottom: 1000, top: 1000}}
        onPress={onClose}>
        <View style={styles.modalContainer}>
          {IsTripDashboard && (
            <>
              <TouchableOpacity style={styles.option} onPress={handleEditTrip}>
                <View style={styles.optionContent}>
                  <EditIcon />
                  <Text color={WHITE_TEXT} style={styles.optionText}>
                    Edit Trip Details
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={styles.option}>
                <View style={styles.optionContent}>
                  <ManageFriendsIcon />
                  <Text color={WHITE_TEXT} style={styles.optionText}>
                    Manage Friends
                  </Text>
                </View>
              </TouchableOpacity>
            </>
          )}
          {!IsTripDashboard && (
            <TouchableOpacity style={styles.option}>
              <View style={styles.optionContent}>
                <UploadIcon />
                <Text color={WHITE_TEXT} style={styles.optionText}>
                  Change Cover
                </Text>
              </View>
            </TouchableOpacity>
          )}
          <TouchableOpacity style={styles.option} onPress={handleLeaveTrip}>
            <View style={styles.optionContent}>
              <LeaveIcon />
              <Text color={WHITE_TEXT} style={styles.optionText}>
                Leave Trip
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleDeleteTrip} style={styles.option}>
            <View style={styles.optionContent}>
              <DeleteIconWhite />
              <Text color={WHITE_TEXT} style={styles.optionText}>
                Delete Trip
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
      <ConfirmationModal
        visible={showConfirmationModal}
        onClose={handleConfirmationModalClose}
        title={confirmationModalProps.title}
        description={confirmationModalProps.description}
        tripId={tripId}
      />
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    width: 200,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#171717CC',
    position: 'absolute',
    top: 86,
    right: 30,
    justifyContent: 'flex-end',
  },
  option: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderBottomWidth: 0.5,
    borderBottomColor: '#FFFFFF1A',
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionText: {
    fontSize: 16,
    marginLeft: 10,
    color: 'black',
  },
});

export default TripOptionsModal;
