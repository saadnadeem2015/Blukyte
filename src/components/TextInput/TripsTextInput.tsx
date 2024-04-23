import React, { useState } from 'react';
import {
  StyleSheet,
  TextInput as DefaultTextInput,
  TextInputProps,
  TextStyle,
  View,
  Platform,
} from 'react-native';
import { VISBY_REGULAR, VISBY_SEMIBOLD } from '../../assets/fonts';
import { Text } from '../Text';
import { BORDER_COLOR, FOCUSED_BORDER_COLOR, RED_COLOR } from '../../assets/colors';

interface CustomTextInputProps extends TextInputProps {
  title?: string;
  onPressRightIcon?: () => void;
  showError?: boolean;
  errorMessage?: string;
  errorMessageStyle?: TextStyle;
  placeholder: any;
}

export const TripsTextInput = ({
  style = {},
  placeholderTextColor = '#737373',
  title = '',
  onPressRightIcon,
  showError,
  errorMessage,
  placeholder,
  errorMessageStyle = {},
  secureTextEntry = false,
  ...props
}: CustomTextInputProps): JSX.Element => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const borderColor = showError ? RED_COLOR : isFocused ? FOCUSED_BORDER_COLOR : BORDER_COLOR;

  return (
    <View style={styles.inputContainer}>
        {title.length > 0 && (
        <Text style={{ fontWeight: '600', fontFamily: VISBY_SEMIBOLD, fontSize: 15, marginBottom: 10 }}>
            {title}<Text color={RED_COLOR}> *</Text>
        </Text>
        )}
      <View style={[styles.searchContainer, { borderColor,backgroundColor: 'transparent' }]}>
        <DefaultTextInput
          style={[
            styles.textInput,
            {
              paddingLeft: '0.8%',
              paddingRight: '3.8%',
              borderColor,
            },
            style,
          ]}
          placeholderTextColor={placeholderTextColor}
          onFocus={handleFocus}
          onBlur={handleBlur}
          secureTextEntry={secureTextEntry}
          placeholder={placeholder}
          {...props}
        />
      </View>
      {showError && (
        <Text color={RED_COLOR} style={{ ...styles.errorMessage, ...errorMessageStyle }}>{errorMessage}</Text>
      )}
    </View>
  );
};

export const styles = StyleSheet.create({
  inputContainer: {
    marginTop: Platform.OS === 'ios' ? 20 : 0,
  },
  searchContainer: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
    borderRadius: 8,
    overflow: 'hidden',
    borderBottomColor:'#E5E5E5',
    borderBottomWidth:1
  },
  textInput: {
    flex: 1,
    fontFamily: VISBY_REGULAR,
    fontSize: 14,
  },
  errorMessage: {
    color: 'red',
    marginTop:10
  },
});
