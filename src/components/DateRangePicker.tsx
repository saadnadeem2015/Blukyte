import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Modal, TouchableWithoutFeedback, Platform } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { Text } from './Text';
import { CalenderIcon } from '../assets/svgs/CalenderIcon';

interface DateRangePickerProps {
  placeholder?: any;
  onDateChange: (date: string) => void;
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({ placeholder, onDateChange }) => {
  const [selectedDate, setSelectedDate] = useState<string | undefined>(undefined);
  const [isModalVisible, setModalVisible] = useState(false);

  const onDayPress = (day: any) => {
    const date = day.dateString;
    setSelectedDate(date);
    onDateChange(date);
    toggleModal();
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleModal} style={styles.startDateContainer}>
        <Text style={styles.text} color={selectedDate ? 'black' : '#737373'}>
          {selectedDate || placeholder}
        </Text>
        <CalenderIcon style={{ marginBottom: 10 }} />
      </TouchableOpacity>
      <Modal transparent visible={isModalVisible} animationType="slide">
        <TouchableWithoutFeedback onPress={toggleModal}>
          <View style={styles.modalOverlay} />
        </TouchableWithoutFeedback>

        <View style={styles.modalContent}>
          <Calendar
            onDayPress={onDayPress}
            markedDates={selectedDate ? { [selectedDate]: { selected: true } } : {}}
            minDate={new Date().toISOString().split('T')[0]}
          />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical:20,
    marginHorizontal:2
  },
  selectedDateContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
  },
  selectedDateText: {
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
  },
  modalContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    marginBottom: Platform.OS === 'ios' ? 20 : 0,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: -7 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 12,
  },
  startDateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  text: {
    marginBottom: 10,
  },
});

export default DateRangePicker;
