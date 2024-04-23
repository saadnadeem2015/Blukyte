import React, { useMemo } from 'react';
import { StyleSheet, Text as BaseText, TextProps, TextStyle, Platform } from "react-native"
import { VISBY_BOLD, VISBY_LIGHT, VISBY_MEDIUM, VISBY_REGULAR, VISBY_SEMIBOLD } from '../assets/fonts';
import { BLACK_TEXT } from '../assets/colors';

const getFontFamilyFromWeight = (fontWeight: string | undefined , variant: string | undefined) => {
  if (fontWeight === '300') {
    return VISBY_LIGHT;
  } else if (fontWeight === '500' || variant === 'subheading') {
    return VISBY_MEDIUM;
  } else if (fontWeight === 'bold' || fontWeight === '700' || fontWeight === '800' || fontWeight === '900' || variant === 'heading' || variant === 'subheading') {
    return VISBY_BOLD;
  } else if (fontWeight === '600') {
    return Platform.OS === 'ios' ? VISBY_BOLD : VISBY_SEMIBOLD;
  } else if (fontWeight === 'normal' || fontWeight === '400' || variant === 'default') {
    return VISBY_REGULAR;
  } else {
    return VISBY_REGULAR;
  }
}

interface CustomTextProps extends TextProps {
  colors?: string[];
  color?: string;
  style?: TextStyle;
  variant?: 'default' | 'heading' | 'subheading';
  [x: string]: any;
}

export const Text = ({style={}, variant = 'default',color = BLACK_TEXT, ...props}: CustomTextProps) : JSX.Element => {
  const textDefaultStyles = useMemo(() => {
    switch (variant) {
      case 'default':
        return styles.defaultText;
      case 'heading':
        return styles.headingText;
      case 'subheading':
        return styles.subheadingText;
      default:
        return styles.defaultText;
    }
  }, [variant]);

  const fontFamily = useMemo(() => getFontFamilyFromWeight(style?.fontWeight, variant), [style]);

  return (
    <BaseText style={[textDefaultStyles, style, { fontFamily, color: color }]} {...props} />
    )
}

const styles = StyleSheet.create({
  defaultText: {
    fontSize: 16,
    lineHeight: 16,
    color: BLACK_TEXT,
  },
  headingText: {
    fontSize: 36,
    color: BLACK_TEXT,
  },
  subheadingText: {
    fontSize: 20,
    fontWeight: '500',
    color: BLACK_TEXT,
  },
})
