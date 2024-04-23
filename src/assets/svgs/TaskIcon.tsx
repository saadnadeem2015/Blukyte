import React from 'react';
import {SvgXml, XmlProps} from 'react-native-svg';

interface TaskIconProps {
  style?: XmlProps['style'];
}

export const TaskIcon: React.FC<TaskIconProps> = ({style}) => {
  const xml = `

  <svg width="15" height="18" viewBox="0 0 13 16" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M4.04165 2.55556H2.4861C1.62699 2.55556 0.930542 3.252 0.930542 4.11111V13.4444C0.930542 14.3036 1.62699 15 2.4861 15H10.2639C11.123 15 11.8194 14.3036 11.8194 13.4444V4.11111C11.8194 3.252 11.123 2.55556 10.2639 2.55556H8.70832M4.04165 2.55556C4.04165 3.41467 4.7381 4.11111 5.59721 4.11111H7.15276C8.01187 4.11111 8.70832 3.41467 8.70832 2.55556M4.04165 2.55556C4.04165 1.69645 4.7381 1 5.59721 1H7.15276C8.01187 1 8.70832 1.69645 8.70832 2.55556M6.37499 8H8.70832M6.37499 11.1111H8.70832M4.04165 8H4.04943M4.04165 11.1111H4.04943" stroke="#171717" stroke-opacity="0.3" stroke-width="1.5" stroke-linecap="round"/>
  </svg>
  
  `;

  return <SvgXml xml={xml} style={style} />;
};
