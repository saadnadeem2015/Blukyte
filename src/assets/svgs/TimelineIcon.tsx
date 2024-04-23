import React from 'react';
import {SvgXml, XmlProps} from 'react-native-svg';
import { BLUE_COLOR } from '../colors';

interface TimelineIconProps {
  style?: XmlProps['style'];
}

export const TimelineIcon: React.FC<TimelineIconProps> = ({style}) => {
  const xml = `
  <svg width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M6.79367 4.94447V0.900024M15.2061 4.94447V0.900024M5.74211 8.98891H16.2577M3.639 19.1H18.3608C19.5223 19.1 20.4639 18.1946 20.4639 17.0778V4.94447C20.4639 3.82763 19.5223 2.92225 18.3608 2.92225H3.639C2.47748 2.92225 1.53589 3.82763 1.53589 4.94447V17.0778C1.53589 18.1946 2.47748 19.1 3.639 19.1Z" stroke="#171717" stroke-width="1.336" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>  
  `;

  return <SvgXml xml={xml} style={style} />;
};

interface TimelineIconBlueProps {
  style?: XmlProps['style'];
}

export const TimelineIconBlue: React.FC<TimelineIconBlueProps> = ({style}) => {
  const xml = `
  <svg width="22" height="20" viewBox="0 0 22 20" fill=${BLUE_COLOR} xmlns="http://www.w3.org/2000/svg">
  <path d="M6.79367 4.94447V0.900024M15.2061 4.94447V0.900024M5.74211 8.98891H16.2577M3.639 19.1H18.3608C19.5223 19.1 20.4639 18.1946 20.4639 17.0778V4.94447C20.4639 3.82763 19.5223 2.92225 18.3608 2.92225H3.639C2.47748 2.92225 1.53589 3.82763 1.53589 4.94447V17.0778C1.53589 18.1946 2.47748 19.1 3.639 19.1Z" stroke="#171717" stroke-width="1.336" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>  
  `;

  return <SvgXml xml={xml} style={style} />;
};
