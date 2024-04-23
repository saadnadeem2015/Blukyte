import React from 'react';
import {SvgXml, XmlProps} from 'react-native-svg';

interface BackArrowProps {
  style?: XmlProps['style'];
  fill?: string;

}

export const BackArrow: React.FC<BackArrowProps> = ({ style, fill = "#171717" }) => {
  const xml = `
  <svg width="12" height="20" viewBox="0 0 12 20" fill="${fill}" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M10.927 1.43297C11.6377 2.14372 11.6377 3.29608 10.927 4.00684L4.93391 9.9999L10.927 15.993C11.6377 16.7037 11.6377 17.8561 10.927 18.5668C10.2162 19.2776 9.06386 19.2776 8.3531 18.5668L1.0731 11.2868C0.362351 10.5761 0.362351 9.42372 1.0731 8.71297L8.3531 1.43297C9.06386 0.722214 10.2162 0.722214 10.927 1.43297Z" fill=${fill}/>
  </svg>
  `;

  return <SvgXml xml={xml} style={style} />;
};
