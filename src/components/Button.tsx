import React from 'react';
import {
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
  Text,
} from 'react-native';

import {ActivityIndicator} from 'react-native';
import {BLUE_COLOR, WHITE_TEXT} from '../assets/colors';
import {VISBY_MEDIUM} from '../assets/fonts';

interface CustomButtonProps extends TouchableOpacityProps {
  text?: string;
  icon?: SVGSVGElement;
  btnStyle?: ViewStyle;
  textStyle?: TextStyle;
  style?: ViewStyle;
  isLoading?: boolean;
  disabled?: any;
}

export const Button = ({
  text,
  icon,
  onPress = () => {},
  style = {},
  textStyle = {},
  isLoading,
  disabled,
  children,
  ...props
}: CustomButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.btnDefault, style, disabled && styles.disabledButton]}
      {...props}
      disabled={isLoading || disabled}>
      {isLoading ? (
        <ActivityIndicator animating={true} size="small" color={WHITE_TEXT} />
      ) : (
        <>
          {text && <Text style={{...styles.btnTxt, ...textStyle}}>{text}</Text>}
          {icon}
        </>
      )}
      {children}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btnDefault: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderRadius: 12,
    height: 50,
    width: '100%',
    backgroundColor: BLUE_COLOR,
  },
  btnTxt: {
    fontSize: 16,
    color: WHITE_TEXT,
    fontFamily: VISBY_MEDIUM,
    fontWeight: '500',
  },
  disabledButton: {
    backgroundColor: '#75DCFF',
    opacity: 0.7,
  },
});
