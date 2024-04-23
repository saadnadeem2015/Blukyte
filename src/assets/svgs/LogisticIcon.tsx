import React from 'react';
import {SvgXml, XmlProps} from 'react-native-svg';
import { BLUE_COLOR } from '../colors';

interface LogisticIconProps {
  style?: XmlProps['style'];
}

export const LogisticIcon: React.FC<LogisticIconProps> = ({style}) => {
  const xml = `
  <svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M13.0334 0.922241V2.94446M13.0334 6.98891V9.01113M13.0334 13.0556V15.0778M2.92225 0.922241C1.8054 0.922241 0.900024 1.82762 0.900024 2.94446V5.9778C2.01687 5.9778 2.92225 6.88318 2.92225 8.00002C2.92225 9.11686 2.01687 10.0222 0.900024 10.0222V13.0556C0.900024 14.1724 1.8054 15.0778 2.92225 15.0778H17.0778C18.1946 15.0778 19.1 14.1724 19.1 13.0556V10.0222C17.9832 10.0222 17.0778 9.11686 17.0778 8.00002C17.0778 6.88318 17.9832 5.9778 19.1 5.9778V2.94446C19.1 1.82762 18.1946 0.922241 17.0778 0.922241H2.92225Z" stroke="#171717" stroke-width="1.67" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
  `;

  return <SvgXml xml={xml} style={style} />;
};

interface LogisticIconBlueProps {
  style?: XmlProps['style'];
}

export const LogisticIconBlue: React.FC<LogisticIconBlueProps> = ({style}) => {
  const xml = `
  <svg width="20" height="16" viewBox="0 0 20 16" fill=${BLUE_COLOR} xmlns="http://www.w3.org/2000/svg">
  <path d="M13.0334 0.922241V2.94446M13.0334 6.98891V9.01113M13.0334 13.0556V15.0778M2.92225 0.922241C1.8054 0.922241 0.900024 1.82762 0.900024 2.94446V5.9778C2.01687 5.9778 2.92225 6.88318 2.92225 8.00002C2.92225 9.11686 2.01687 10.0222 0.900024 10.0222V13.0556C0.900024 14.1724 1.8054 15.0778 2.92225 15.0778H17.0778C18.1946 15.0778 19.1 14.1724 19.1 13.0556V10.0222C17.9832 10.0222 17.0778 9.11686 17.0778 8.00002C17.0778 6.88318 17.9832 5.9778 19.1 5.9778V2.94446C19.1 1.82762 18.1946 0.922241 17.0778 0.922241H2.92225Z" stroke="#171717" stroke-width="1.67" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
  `;

  return <SvgXml xml={xml} style={style} />;
};

