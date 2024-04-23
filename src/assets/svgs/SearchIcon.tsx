import React from 'react';
import {SvgXml, XmlProps} from 'react-native-svg';

interface SearchIconProps {
  style?: XmlProps['style'];
}

export const SearchIcon: React.FC<SearchIconProps> = ({style}) => {
  const xml = `
  <svg width="20" height="20" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="9.66665" cy="9.66683" r="6.33333" stroke="#737373" stroke-width="1.5"/>
  <path d="M14.3333 14.3335L16.6666 16.6668" stroke="#737373" stroke-width="1.5" stroke-linecap="round"/>
  </svg>
  `;

  return <SvgXml xml={xml} style={style} />;
};
