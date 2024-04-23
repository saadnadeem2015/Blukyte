import React from 'react';
import {SvgXml, XmlProps} from 'react-native-svg';

interface ExpensesIconProps {
  style?: XmlProps['style'];
}

export const ExpensesIcon: React.FC<ExpensesIconProps> = ({style}) => {
  const xml = `

  <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M16.125 8C16.125 6.96447 15.2855 6.125 14.25 6.125H11.125C11.125 7.50571 10.0057 8.625 8.625 8.625C7.24429 8.625 6.125 7.50571 6.125 6.125H3C1.96447 6.125 1.125 6.96447 1.125 8M16.125 8V13C16.125 14.0355 15.2855 14.875 14.25 14.875H3C1.96447 14.875 1.125 14.0355 1.125 13V8M16.125 8V5.5M1.125 8V5.5M16.125 5.5C16.125 4.46447 15.2855 3.625 14.25 3.625H3C1.96447 3.625 1.125 4.46447 1.125 5.5M16.125 5.5V3C16.125 1.96447 15.2855 1.125 14.25 1.125H3C1.96447 1.125 1.125 1.96447 1.125 3V5.5" stroke="#171717" stroke-opacity="0.3" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
  
  `;

  return <SvgXml xml={xml} style={style} />;
};
