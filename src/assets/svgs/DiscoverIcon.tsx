import React from 'react';
import {SvgXml, XmlProps} from 'react-native-svg';
import { BLUE_COLOR } from '../colors';

interface DiscoverIconProps {
  style?: XmlProps['style'];
}

export const DiscoverIcon: React.FC<DiscoverIconProps> = ({style}) => {
  const xml = `
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M2.92225 0.900024V4.94447M0.900024 2.92225H4.94447M3.93336 15.0556V19.1M1.91114 17.0778H5.95558M11.0111 0.900024L13.3222 7.83336L19.1 10L13.3222 12.1667L11.0111 19.1L8.70002 12.1667L2.92225 10L8.70002 7.83336L11.0111 0.900024Z" stroke="#171717" stroke-width="1.336" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
  `;

  return <SvgXml xml={xml} style={style} />;
};

interface DiscoverIconBlueProps {
  style?: XmlProps['style'];
}

export const DiscoverIconBlue: React.FC<DiscoverIconBlueProps> = ({style}) => {
  const xml = `
  <svg width="20" height="20" viewBox="0 0 20 20" fill=${BLUE_COLOR} xmlns="http://www.w3.org/2000/svg">
  <path d="M2.92225 0.900024V4.94447M0.900024 2.92225H4.94447M3.93336 15.0556V19.1M1.91114 17.0778H5.95558M11.0111 0.900024L13.3222 7.83336L19.1 10L13.3222 12.1667L11.0111 19.1L8.70002 12.1667L2.92225 10L8.70002 7.83336L11.0111 0.900024Z" stroke="#171717" stroke-width="1.336" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
  `;
  return <SvgXml xml={xml} style={style} />;
};

