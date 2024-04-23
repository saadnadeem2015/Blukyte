import React from 'react';
import {SvgXml, XmlProps} from 'react-native-svg';

interface DotsIconProps {
  style?: XmlProps['style'];
}

export const DotsIcon: React.FC<DotsIconProps> = ({style}) => {
  const xml = `

  <svg width="6" height="20" viewBox="0 0 6 20" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M2.99998 5.4499C1.74353 5.4499 0.724976 4.43135 0.724976 3.1749C0.724976 1.91845 1.74353 0.899902 2.99998 0.899902C4.25642 0.899902 5.27498 1.91845 5.27498 3.1749C5.27498 4.43135 4.25642 5.4499 2.99998 5.4499Z" fill="#FAFAFA"/>
  <path d="M2.99998 12.2749C1.74353 12.2749 0.724976 11.2564 0.724976 9.9999C0.724976 8.74345 1.74353 7.7249 2.99998 7.7249C4.25642 7.7249 5.27498 8.74345 5.27498 9.9999C5.27498 11.2564 4.25642 12.2749 2.99998 12.2749Z" fill="#FAFAFA"/>
  <path d="M2.99998 19.0999C1.74353 19.0999 0.724976 18.0814 0.724976 16.8249C0.724976 15.5685 1.74353 14.5499 2.99998 14.5499C4.25642 14.5499 5.27498 15.5685 5.27498 16.8249C5.27498 18.0814 4.25642 19.0999 2.99998 19.0999Z" fill="#FAFAFA"/>
  </svg>
  
  `;

  return <SvgXml xml={xml} style={style} />;
};
