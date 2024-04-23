import React from 'react';
import {SvgXml, XmlProps} from 'react-native-svg';

interface IdeasIconProps {
  style?: XmlProps['style'];
}

export const IdeasIcon: React.FC<IdeasIconProps> = ({style}) => {
  const xml = `
  <svg width="15" height="20" viewBox="0 0 15 20" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M7.125 15V10.625M7.125 10.625C7.55662 10.625 7.97548 10.5704 8.375 10.4675M7.125 10.625C6.69338 10.625 6.27453 10.5704 5.875 10.4675M9 16.6995C8.39266 16.8147 7.76587 16.875 7.125 16.875C6.48413 16.875 5.85735 16.8147 5.25 16.6995M8.375 18.685C7.9642 18.728 7.54717 18.75 7.125 18.75C6.70283 18.75 6.2858 18.728 5.875 18.685M9 15V14.8403C9 14.0212 9.54856 13.3209 10.257 12.9098C12.1213 11.8281 13.375 9.81048 13.375 7.5C13.375 4.04822 10.5768 1.25 7.125 1.25C3.67322 1.25 0.875 4.04822 0.875 7.5C0.875 9.81048 2.12871 11.8281 3.99296 12.9098C4.70144 13.3209 5.25 14.0212 5.25 14.8403V15" stroke="#171717" stroke-opacity="0.3" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>  
  `;

  return <SvgXml xml={xml} style={style} />;
};