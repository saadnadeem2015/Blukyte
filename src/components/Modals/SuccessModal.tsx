import React from 'react';
import { StyleSheet, View, Modal } from 'react-native';
import { SuccessIcon } from '../../assets/svgs/SuccessIcon';
import { useNavigation } from '@react-navigation/native';
import { Button } from '../Button';
import { Text } from '../Text';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/slices/auth';

interface SuccessModalProps {
  visible: boolean;
  onClose: () => void;
  name?: string;
  members: Array<any>;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ visible, onClose, name, members }) => {
  const tripId = useSelector((state: RootState) => state.auth.tripId);
  const navigation = useNavigation();

  const formatInvitedMembers = () => {
    if (members.length === 0) return '';
    if (members.length === 1) return members[0].fullName;

    const lastMember = members[members.length - 1].fullName;
    const otherMembers = members.slice(0, members.length - 1).map(member => member.fullName).join(', ');
    return `${otherMembers} and ${lastMember}`;
  };

  if (!visible) {
    return null;
  }
  const handleDashboard = () => {
    //@ts-ignore
    navigation.navigate('TripDashboard', { tripId: tripId });
    onClose();
  };
  return (
    <Modal
      transparent
      animationType="slide"
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.contentContainer}>
          <SuccessIcon />
          <View style={{ marginTop: 20, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={styles.successText}>Congrats!</Text>
            <Text style={styles.successText}>You've created a trip:</Text>
            <Text style={styles.successText}>"{name}"</Text>
            {members.length >= 1 && (
            <Text style={{ marginVertical: 15 }}>We have sent an invite code to your friends: {formatInvitedMembers()}</Text>
            )}
          </View>
          <Button style={{ marginVertical: 10 }} onPress={handleDashboard} text="Dashboard" />
        </View>
      </View>
    </Modal>
  );
};

export default SuccessModal;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  contentContainer: {
    backgroundColor: 'white',
    paddingTop: 50,
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    width: '80%',
  },
  successText: {
    marginVertical: 5,
    fontSize: 18,
    fontWeight: '500',
  },
});
