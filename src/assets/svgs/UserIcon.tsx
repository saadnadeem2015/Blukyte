import React from 'react';
import {SvgXml, XmlProps} from 'react-native-svg';

interface UserIconProps {
  style?: XmlProps['style'];
}

export const UserIcon: React.FC<UserIconProps> = ({style}) => {
  const xml = `
  <svg width="20" height="20" viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M10.125 4C10.125 5.72589 8.72592 7.125 7.00003 7.125C5.27414 7.125 3.87503 5.72589 3.87503 4C3.87503 2.27411 5.27414 0.875 7.00003 0.875C8.72592 0.875 10.125 2.27411 10.125 4Z" stroke="#171717" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M0.750977 15.7652C0.809564 12.3641 3.58492 9.625 7.00003 9.625C10.4152 9.625 13.1906 12.3642 13.2491 15.7654C11.3468 16.6383 9.23036 17.125 7.0003 17.125C4.77003 17.125 2.65344 16.6383 0.750977 15.7652Z" stroke="#171717" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>  
  `;

  return <SvgXml xml={xml} style={style} />;
};
