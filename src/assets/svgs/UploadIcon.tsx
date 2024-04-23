import React from 'react';
import {SvgXml, XmlProps} from 'react-native-svg';

interface UploadIconProps {
  style?: XmlProps['style'];
}

export const UploadIcon: React.FC<UploadIconProps> = ({style}) => {
  const xml = `
  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M11.0002 13.3333H1.66683V3.99999H7.66683V2.66666H1.66683C0.933496 2.66666 0.333496 3.26666 0.333496 3.99999V13.3333C0.333496 14.0667 0.933496 14.6667 1.66683 14.6667H11.0002C11.7335 14.6667 12.3335 14.0667 12.3335 13.3333V7.33332H11.0002V13.3333ZM5.80683 11.22L4.50016 9.64666L2.66683 12H10.0002L7.64016 8.85999L5.80683 11.22ZM12.3335 2.66666V0.666656H11.0002V2.66666H9.00016C9.00683 2.67332 9.00016 3.99999 9.00016 3.99999H11.0002V5.99332C11.0068 5.99999 12.3335 5.99332 12.3335 5.99332V3.99999H14.3335V2.66666H12.3335Z" fill="white"/>
  </svg>  
  `;

  return <SvgXml xml={xml} style={style} />;
};