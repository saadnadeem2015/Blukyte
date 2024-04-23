import React from 'react';
import {SvgXml, XmlProps} from 'react-native-svg';

interface BottomTabAddIconProps {
  style?: XmlProps['style'];
}

export const BottomTabAddIcon: React.FC<BottomTabAddIconProps> = ({style}) => {
  const xml = `
  <svg width="52" height="52" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="48" height="48" rx="24" fill="#00BBFF"/>
  <path d="M24 16V32M32 24L16 24" stroke="#FAFAFA" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
  `;

  return <SvgXml xml={xml} style={style} />;
};
