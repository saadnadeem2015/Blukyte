import React from 'react';
import {SvgXml, XmlProps} from 'react-native-svg';

interface LocationMarkerIconProps {
  style?: XmlProps['style'];
}

export const LocationMarkerIcon: React.FC<LocationMarkerIconProps> = ({style}) => {
  const xml = `

  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M18.4 12.0001C18.4 15.5347 15.5346 18.4001 12 18.4001C8.46535 18.4001 5.59998 15.5347 5.59998 12.0001C5.59998 8.46548 8.46535 5.6001 12 5.6001C15.5346 5.6001 18.4 8.46548 18.4 12.0001Z" stroke="#00BBFF" stroke-width="1.5"/>
  <path d="M14.4 12.0001C14.4 13.3256 13.3255 14.4001 12 14.4001C10.6745 14.4001 9.59998 13.3256 9.59998 12.0001C9.59998 10.6746 10.6745 9.6001 12 9.6001C13.3255 9.6001 14.4 10.6746 14.4 12.0001Z" stroke="#00BBFF" stroke-width="1.5"/>
  <path d="M3.99998 12L5.59998 12" stroke="#00BBFF" stroke-width="1.5" stroke-linecap="round"/>
  <path d="M18.4 12L20 12" stroke="#00BBFF" stroke-width="1.5" stroke-linecap="round"/>
  <path d="M12 5.6V4" stroke="#00BBFF" stroke-width="1.5" stroke-linecap="round"/>
  <path d="M12 19.9999V18.3999" stroke="#00BBFF" stroke-width="1.5" stroke-linecap="round"/>
  </svg>
  
  `;

  return <SvgXml xml={xml} style={style} />;
};
