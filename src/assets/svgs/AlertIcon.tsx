import React from 'react';
import {SvgXml, XmlProps} from 'react-native-svg';

interface AlertIconProps {
  style?: XmlProps['style'];
}

export const AlertIcon: React.FC<AlertIconProps> = ({style}) => {
  const xml = `

  <svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M5.24401 1.01419C6.02416 -0.338064 7.97584 -0.338065 8.75598 1.01419L13.7257 9.62837C14.5054 10.9799 13.53 12.6687 11.9697 12.6687H2.03028C0.469986 12.6687 -0.505417 10.9799 0.274299 9.62837L5.24401 1.01419ZM7.00014 4.55961C7.28005 4.55961 7.50696 4.78652 7.50696 5.06642V7.6005C7.50696 7.88041 7.28005 8.10732 7.00014 8.10732C6.72023 8.10732 6.49333 7.88041 6.49333 7.6005V5.06642C6.49333 4.78652 6.72023 4.55961 7.00014 4.55961ZM7.00014 10.1346C7.28005 10.1346 7.50696 9.90767 7.50696 9.62776C7.50696 9.34785 7.28005 9.12095 7.00014 9.12095C6.72023 9.12095 6.49333 9.34785 6.49333 9.62776C6.49333 9.90767 6.72023 10.1346 7.00014 10.1346Z" fill="#DC2626"/>
  </svg>
  
  `;

  return <SvgXml xml={xml} style={style} />;
};