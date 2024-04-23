import React from 'react';
import {SvgXml, XmlProps} from 'react-native-svg';

interface ForwardArrowIconProps {
  style?: XmlProps['style'];
}

export const ForwardArrowIcon: React.FC<ForwardArrowIconProps> = ({style}) => {
  const xml = `
  <svg width="6" height="12" viewBox="0 0 6 12" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M1 1.33342L5 6.00008L1 10.6667" stroke="#171717" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>  
  `;

  return <SvgXml xml={xml} style={style} />;
};
