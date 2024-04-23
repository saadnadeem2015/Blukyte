import React from 'react';
import {SvgXml, XmlProps} from 'react-native-svg';

interface LocationIconProps {
  style?: XmlProps['style'];
}

export const LocationIconTransparent: React.FC<LocationIconProps> = ({style}) => {
  const xml = `
  <svg width="20" height="20" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M11.1005 10.8995C10.5073 11.4927 9.34855 12.6515 8.41372 13.5863C7.63267 14.3674 6.36726 14.3672 5.58621 13.5862C4.66866 12.6686 3.53024 11.5302 2.89953 10.8995C0.634888 8.63485 0.634888 4.96313 2.89953 2.69848C5.16418 0.433838 8.8359 0.433838 11.1005 2.69848C13.3652 4.96313 13.3652 8.63485 11.1005 10.8995Z" stroke="#171717" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M9.17466 6.79899C9.17466 8 8.20105 8.97361 7.00004 8.97361C5.79903 8.97361 4.82542 8 4.82542 6.79899C4.82542 5.59798 5.79903 4.62437 7.00004 4.62437C8.20105 4.62437 9.17466 5.59798 9.17466 6.79899Z" stroke="#171717" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
  `;
  

  return <SvgXml xml={xml} style={style} />;
};

export const LocationIconFilled: React.FC<LocationIconProps> = ({style}) => {
  const xml = `

  <svg width="13" height="16" viewBox="0 0 13 16" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M2.41829 2.76924C4.61731 0.570215 8.18263 0.570215 10.3817 2.76924C12.5807 4.96826 12.5807 8.53358 10.3817 10.7326L6.39997 14.7143L2.41829 10.7326C0.219263 8.53358 0.219263 4.96826 2.41829 2.76924ZM6.39997 8.87405C7.57254 8.87405 8.5231 7.92349 8.5231 6.75092C8.5231 5.57835 7.57254 4.62779 6.39997 4.62779C5.2274 4.62779 4.27684 5.57835 4.27684 6.75092C4.27684 7.92349 5.2274 8.87405 6.39997 8.87405Z" fill="#171717" stroke="#171717" stroke-width="0.8"/>
  </svg>
  
  `;
  

  return <SvgXml xml={xml} style={style} />;
};
