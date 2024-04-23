import React from 'react';
import {View, StyleSheet} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import {BLUE_COLOR} from '../assets/colors';
import {Text} from './Text';
import { useNavigation } from '@react-navigation/native';

interface CustomCheckBoxProps {
  label?: string;
  terms?: boolean;
  value: boolean;
  onValueChange: (newValue: boolean) => void;
}

export const CustomCheckBox: React.FC<CustomCheckBoxProps> = ({
  label,
  value,
  terms,
  onValueChange,
}) => {

  const navigation = useNavigation();
  const handleTermsAndPrivacy = () => {
    navigation.navigate("PrivacyPolicyScreen" as never);
  }

  return (
    <View style={styles.checkboxContainer}>
      <CheckBox
        value={value}
        lineWidth={1}
        onValueChange={onValueChange}
        onFillColor={BLUE_COLOR}
        onCheckColor="white"
        tintColors={{true: BLUE_COLOR, false: '#A3A3A3'}}
        onTintColor={BLUE_COLOR}
        boxType="square"
        style={styles.checkbox}
      />
      {label && <Text style={styles.label}>{label}</Text>}
      {terms && (
        <Text style={styles.label}>
          By using this app, you agree with our{' '}
          <Text onPress={handleTermsAndPrivacy} color={BLUE_COLOR}>Terms and Conditions</Text> and{' '}
          <Text onPress={handleTermsAndPrivacy} color={BLUE_COLOR}>Privacy Policy</Text>.
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    paddingLeft: 5,
  },
  checkbox: {
    width: 24,
    height: 24,
  },
  label: {
    paddingHorizontal: 20,
  },
});

export default CheckBox;
