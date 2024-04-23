import React from 'react';
import {SvgXml, XmlProps} from 'react-native-svg';

interface CalenderIconProps {
  style?: XmlProps['style'];
}

export const CalenderIcon: React.FC<CalenderIconProps> = ({style}) => {
  const xml = `

  <svg width="20" height="20" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M4.625 1.5V3.375M13.375 1.5V3.375M1.5 14.625V5.25C1.5 4.21447 2.33947 3.375 3.375 3.375H14.625C15.6605 3.375 16.5 4.21447 16.5 5.25V14.625M1.5 14.625C1.5 15.6605 2.33947 16.5 3.375 16.5H14.625C15.6605 16.5 16.5 15.6605 16.5 14.625M1.5 14.625V8.375C1.5 7.33947 2.33947 6.5 3.375 6.5H14.625C15.6605 6.5 16.5 7.33947 16.5 8.375V14.625" stroke="#737373" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
  
  `;

  return <SvgXml xml={xml} style={style} />;
};

interface CalenderDarkIconProps {
  style?: XmlProps['style'];
}

export const CalenderDarkIcon: React.FC<CalenderDarkIconProps> = ({style}) => {
  const xml = `
<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M4.625 0.875C4.97018 0.875 5.25 1.15482 5.25 1.5V2.75H12.75V1.5C12.75 1.15482 13.0298 0.875 13.375 0.875C13.7202 0.875 14 1.15482 14 1.5V2.75H14.625C16.0057 2.75 17.125 3.86929 17.125 5.25V14.625C17.125 16.0057 16.0057 17.125 14.625 17.125H3.375C1.99429 17.125 0.875 16.0057 0.875 14.625V5.25C0.875 3.86929 1.99429 2.75 3.375 2.75H4V1.5C4 1.15482 4.27982 0.875 4.625 0.875ZM15.875 8.375C15.875 7.68464 15.3154 7.125 14.625 7.125H3.375C2.68464 7.125 2.125 7.68464 2.125 8.375V14.625C2.125 15.3154 2.68464 15.875 3.375 15.875H14.625C15.3154 15.875 15.875 15.3154 15.875 14.625V8.375Z" fill="#171717"/>
</svg>
  `;

  return <SvgXml xml={xml} style={style} />;
};

