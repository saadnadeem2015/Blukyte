import React from 'react';
import {SvgXml, XmlProps} from 'react-native-svg';

interface LeaveIconProps {
  style?: XmlProps['style'];
}

export const LeaveIcon: React.FC<LeaveIconProps> = ({style}) => {
  const xml = `

<svg width="16" height="16" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6.37768 8.48888L3.88879 5.99999M3.88879 5.99999L6.37768 3.51111M3.88879 5.99999L12.5999 5.99999M9.48879 8.48888V9.11111C9.48879 10.142 8.65306 10.9778 7.62212 10.9778H3.26657C2.23564 10.9778 1.3999 10.142 1.3999 9.11111V2.88888C1.3999 1.85795 2.23564 1.02222 3.26657 1.02222H7.62212C8.65306 1.02222 9.48879 1.85795 9.48879 2.88888V3.51111" stroke="white" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

  `;

  return <SvgXml xml={xml} style={style} />;
};