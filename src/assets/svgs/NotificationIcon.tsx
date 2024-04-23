import React from 'react';
import {SvgXml, XmlProps} from 'react-native-svg';

interface NotificationIconProps {
  style?: XmlProps['style'];
}

export const NotificationIconFilled: React.FC<NotificationIconProps> = ({style}) => {
  const xml = `
  <svg width="20" height="24" viewBox="0 0 20 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M9.99999 0.799988C5.3608 0.799988 1.59999 4.5608 1.59999 9.19999V14.2201L0.610043 15.21C0.209645 15.6104 0.0898673 16.2126 0.306561 16.7357C0.523254 17.2589 1.03374 17.6 1.59999 17.6H18.4C18.9662 17.6 19.4767 17.2589 19.6934 16.7357C19.9101 16.2126 19.7903 15.6104 19.3899 15.21L18.4 14.2201V9.19999C18.4 4.5608 14.6392 0.799988 9.99999 0.799988Z" fill="#171717"/>
  <path d="M9.99995 23.2C7.68036 23.2 5.79995 21.3196 5.79995 19H14.2C14.2 21.3196 12.3195 23.2 9.99995 23.2Z" fill="#171717"/>
  </svg>
  `;

  return <SvgXml xml={xml} style={style} />;
};

export const NotificationIconTransparent: React.FC<NotificationIconProps> = ({style}) => {
  const xml = `
  <svg width="20" height="20" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M2.28036 8.91789L2.50003 8.69822V8.38756V5.25C2.50003 2.76472 4.51474 0.75 7.00003 0.75C9.48531 0.75 11.5 2.76472 11.5 5.25V8.38756V8.69822L11.7197 8.91789L12.3384 9.53661C12.3742 9.57236 12.3849 9.62613 12.3655 9.67283L13.0584 9.95985L12.3655 9.67284C12.3462 9.71954 12.3006 9.75 12.25 9.75H1.75003C1.69947 9.75 1.65389 9.71954 1.63454 9.67284C1.61519 9.62613 1.62589 9.57236 1.66164 9.53661L1.13131 9.00628L1.66164 9.53661L2.28036 8.91789ZM7 13.25C6.23113 13.25 5.57035 12.7872 5.28102 12.125H8.71898C8.42965 12.7872 7.76887 13.25 7 13.25Z" stroke="#171717" stroke-width="1.5"/>
  </svg>
  `;

  return <SvgXml xml={xml} style={style} />;
};