import React from 'react';
import {SvgXml, XmlProps} from 'react-native-svg';

interface ClockIconProps {
  style?: XmlProps['style'];
}

export const ClockIcon: React.FC<ClockIconProps> = ({style}) => {
  const xml = `

  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M8 4.88889V8L10.3333 10.3333M15 8C15 11.866 11.866 15 8 15C4.13401 15 1 11.866 1 8C1 4.13401 4.13401 1 8 1C11.866 1 15 4.13401 15 8Z" stroke="#171717" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
  
  `;

  return <SvgXml xml={xml} style={style} />;
};
