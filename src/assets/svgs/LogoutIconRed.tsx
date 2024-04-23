import React from 'react';
import {SvgXml, XmlProps} from 'react-native-svg';

interface LogoutIconRedProps {
  style?: XmlProps['style'];
}

export const LogoutIconRed: React.FC<LogoutIconRedProps> = ({style}) => {
  const xml = `

  <svg width="20" height="20" viewBox="0 0 13 17" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M7.22222 10.1112L4.11111 7.00005M4.11111 7.00005L7.22222 3.88894M4.11111 7.00005L15 7.00005M11.1111 10.1112V10.8889C11.1111 12.1776 10.0664 13.2223 8.77778 13.2223H3.33333C2.04467 13.2223 1 12.1776 1 10.8889V3.11117C1 1.8225 2.04467 0.777832 3.33333 0.777832H8.77778C10.0664 0.777832 11.1111 1.8225 11.1111 3.11117V3.88894" stroke="#DC2626" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
  
  `;

  return <SvgXml xml={xml} style={style} />;
};
