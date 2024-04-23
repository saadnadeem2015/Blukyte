import React from 'react';
import {SvgXml, XmlProps} from 'react-native-svg';

interface ManageFriendsIconProps {
  style?: XmlProps['style'];
}

export const ManageFriendsIcon: React.FC<ManageFriendsIconProps> = ({style}) => {
  const xml = `
  <svg width="14" height="10" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M4.99992 6.16683C3.43992 6.16683 0.333252 6.94683 0.333252 8.50016V9.66683H9.66658V8.50016C9.66658 6.94683 6.55992 6.16683 4.99992 6.16683ZM1.89325 8.3335C2.45325 7.94683 3.80659 7.50016 4.99992 7.50016C6.19325 7.50016 7.54658 7.94683 8.10658 8.3335H1.89325ZM4.99992 5.00016C6.28658 5.00016 7.33325 3.9535 7.33325 2.66683C7.33325 1.38016 6.28658 0.333496 4.99992 0.333496C3.71325 0.333496 2.66659 1.38016 2.66659 2.66683C2.66659 3.9535 3.71325 5.00016 4.99992 5.00016ZM4.99992 1.66683C5.55325 1.66683 5.99992 2.1135 5.99992 2.66683C5.99992 3.22016 5.55325 3.66683 4.99992 3.66683C4.44659 3.66683 3.99992 3.22016 3.99992 2.66683C3.99992 2.1135 4.44659 1.66683 4.99992 1.66683ZM9.69325 6.20683C10.4666 6.76683 10.9999 7.5135 10.9999 8.50016V9.66683H13.6666V8.50016C13.6666 7.1535 11.3333 6.38683 9.69325 6.20683ZM8.99992 5.00016C10.2866 5.00016 11.3333 3.9535 11.3333 2.66683C11.3333 1.38016 10.2866 0.333496 8.99992 0.333496C8.63992 0.333496 8.30658 0.420163 7.99992 0.566829C8.41992 1.16016 8.66658 1.88683 8.66658 2.66683C8.66658 3.44683 8.41992 4.1735 7.99992 4.76683C8.30658 4.9135 8.63992 5.00016 8.99992 5.00016Z" fill="white"/>
  </svg>  
  `;

  return <SvgXml xml={xml} style={style} />;
};