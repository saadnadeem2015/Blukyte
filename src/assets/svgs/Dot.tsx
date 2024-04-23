import React from 'react';
import {SvgXml, XmlProps} from 'react-native-svg';

interface DotProps {
  style?: XmlProps['style'];
}

export const Dot: React.FC<DotProps> = ({style}) => {
  const xml = `
<svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect opacity="1" width="10" height="10" rx="5" fill="#00BBFF"/>
</svg>
  `;

  return <SvgXml xml={xml} style={style} />;
};
