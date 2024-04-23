import React, { useState } from 'react';
import {
  ImageSourcePropType,
  StyleSheet,
  TextInput as DefaultTextInput,
  TextInputProps,
  TextStyle,
  View,
  Platform,
} from 'react-native';
import { VISBY_REGULAR, VISBY_SEMIBOLD } from '../../assets/fonts';
import { Text } from '../Text';
import { BORDER_COLOR, FOCUSED_BORDER_COLOR, PLACEHOLDER_COLOR, RED_COLOR } from '../../assets/colors';
import { SearchIcon } from '../../assets/svgs/SearchIcon';
import { FormikErrors } from 'formik';

interface CustomTextInputProps extends TextInputProps {
  title?: string;
  leftIconstyle?: {};
  rightIconstyle?: {};
  leftIcon?: ImageSourcePropType;
  rightIcon?: ImageSourcePropType;
  onPressRightIcon?: () => void;
  showError?: boolean;
  errorMessage?: string | string[] | FormikErrors<any> | FormikErrors<any>[] | undefined;
  errorMessageStyle?: TextStyle;
  placeholder: any;
  showSearchIcon?: boolean;
}

export const TextInput = ({
  style = {},
  placeholderTextColor = PLACEHOLDER_COLOR,
  title = '',
  leftIcon,
  rightIcon,
  onPressRightIcon,
  showError,
  errorMessage,
  placeholder,
  errorMessageStyle = {},
  leftIconstyle = {},
  rightIconstyle = {},
  secureTextEntry = false,
  showSearchIcon = false,
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
        <Text style={{ fontWeight: '300', fontFamily: VISBY_SEMIBOLD, fontSize: 14, marginBottom: 5 }}>
          {title}
        </Text>
      )}
      <View style={[styles.searchContainer, { borderColor,backgroundColor: showSearchIcon ? '#F4F4F4' : 'transparent', }]}>
        {showSearchIcon && <SearchIcon style={styles.searchIcon} />}
        <DefaultTextInput
          style={[
            styles.textInput,
            {
              paddingLeft: showSearchIcon ? '10%' : '3.8%',
              paddingRight: '3.8%',
              borderColor,
            },
            style,
          ]}
          placeholderTextColor={placeholderTextColor}
          onFocus={handleFocus}
          onBlur={handleBlur}
          secureTextEntry={secureTextEntry}
          placeholder={`${placeholder} *`}
          {...props}
        />
      </View>
      {showError && (
        //@ts-ignore
        <Text color={RED_COLOR} style={{ ...styles.errorMessage, ...errorMessageStyle }}>{errorMessage}</Text>
      )}
    </View>
  );
};

export const styles = StyleSheet.create({
  inputContainer: {
    marginTop: Platform.OS === 'ios' ? 30 : 0,
  },
  searchContainer: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
    borderRadius: 8,
    borderWidth: 1,
    overflow: 'hidden',
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
  searchIcon: {
    position: 'absolute',
    left: 10,
    zIndex: 1,
  },
});
