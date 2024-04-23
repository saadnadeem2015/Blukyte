import React from 'react';
import {SvgXml, XmlProps} from 'react-native-svg';

interface SuccessIconProps {
  style?: XmlProps['style'];
}

export const SuccessIcon: React.FC<SuccessIconProps> = ({style}) => {
  const xml = `

  <svg width="36" height="26" viewBox="0 0 36 26" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M34.7678 1.23223C35.7441 2.20854 35.7441 3.79146 34.7678 4.76777L14.7678 24.7678C13.7915 25.7441 12.2085 25.7441 11.2322 24.7678L1.23223 14.7678C0.255922 13.7915 0.255922 12.2085 1.23223 11.2322C2.20854 10.2559 3.79146 10.2559 4.76777 11.2322L13 19.4645L31.2322 1.23223C32.2085 0.255922 33.7915 0.255922 34.7678 1.23223Z" fill="#22C55E"/>
  </svg>
  
  `;

  return <SvgXml xml={xml} style={style} />;
};
