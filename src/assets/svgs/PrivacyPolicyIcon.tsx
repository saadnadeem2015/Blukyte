import React from 'react';
import {SvgXml, XmlProps} from 'react-native-svg';

interface PrivacyPolicyIconProps {
  style?: XmlProps['style'];
}

export const PrivacyPolicyIcon: React.FC<PrivacyPolicyIconProps> = ({style}) => {
  const xml = `
  <svg width="20" height="20" viewBox="0 0 13 17" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M12.25 10V8.03125C12.25 6.63328 11.1167 5.5 9.71875 5.5H8.59375C8.12776 5.5 7.75 5.12224 7.75 4.65625V3.53125C7.75 2.13328 6.61672 1 5.21875 1H3.8125M3.8125 10.5625H9.4375M3.8125 12.8125H6.625M5.5 1H1.84375C1.37776 1 1 1.37776 1 1.84375V14.7812C1 15.2472 1.37776 15.625 1.84375 15.625H11.4062C11.8722 15.625 12.25 15.2472 12.25 14.7812V7.75C12.25 4.02208 9.22792 1 5.5 1Z" stroke="#171717" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
  `;

  return <SvgXml xml={xml} style={style} />;
};