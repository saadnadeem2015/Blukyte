import React from 'react';
import {SvgXml, XmlProps} from 'react-native-svg';

interface InstagramIconProps {
  style?: XmlProps['style'];
}

export const InstagramIcon: React.FC<InstagramIconProps> = ({style}) => {
  const xml = `

  <svg width="40" height="40" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M0 16C0 24.8366 7.16344 32 16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0C7.16344 0 0 7.16344 0 16Z" fill="#F00073"/>
  <path d="M16 9.19995C18.2 9.19995 18.5 9.19995 19.4 9.19995C20.2 9.19995 20.6 9.39995 20.9 9.49995C21.3 9.69995 21.6 9.79995 21.9 10.1C22.2 10.4 22.4 10.7 22.5 11.1C22.6 11.4 22.7 11.8 22.8 12.6C22.8 13.5 22.8 13.7 22.8 16C22.8 18.3 22.8 18.5 22.8 19.4C22.8 20.2 22.6 20.6 22.5 20.9C22.3 21.3 22.2 21.6 21.9 21.9C21.6 22.2 21.3 22.4 20.9 22.5C20.6 22.6 20.2 22.7 19.4 22.8C18.5 22.8 18.3 22.8 16 22.8C13.7 22.8 13.5 22.8 12.6 22.8C11.8 22.8 11.4 22.6 11.1 22.5C10.7 22.3 10.4 22.2 10.1 21.9C9.79995 21.6 9.59995 21.3 9.49995 20.9C9.39995 20.6 9.29995 20.2 9.19995 19.4C9.19995 18.5 9.19995 18.3 9.19995 16C9.19995 13.7 9.19995 13.5 9.19995 12.6C9.19995 11.8 9.39995 11.4 9.49995 11.1C9.69995 10.7 9.79995 10.4 10.1 10.1C10.4 9.79995 10.7 9.59995 11.1 9.49995C11.4 9.39995 11.8 9.29995 12.6 9.19995C13.5 9.19995 13.8 9.19995 16 9.19995ZM16 7.69995C13.7 7.69995 13.5 7.69995 12.6 7.69995C11.7 7.69995 11.1 7.89995 10.6 8.09995C10.1 8.29995 9.59995 8.59995 9.09995 9.09995C8.59995 9.59995 8.39995 9.99995 8.09995 10.6C7.89995 11.1 7.79995 11.7 7.69995 12.6C7.69995 13.5 7.69995 13.8 7.69995 16C7.69995 18.3 7.69995 18.5 7.69995 19.4C7.69995 20.3 7.89995 20.9 8.09995 21.4C8.29995 21.9 8.59995 22.4 9.09995 22.9C9.59995 23.4 9.99995 23.6 10.6 23.9C11.1 24.1 11.7 24.1999 12.6 24.2999C13.5 24.2999 13.8 24.2999 16 24.2999C18.2 24.2999 18.5 24.2999 19.4 24.2999C20.3 24.2999 20.9 24.1 21.4 23.9C21.9 23.7 22.4 23.4 22.9 22.9C23.4 22.4 23.6 22 23.9 21.4C24.1 20.9 24.1999 20.3 24.2999 19.4C24.2999 18.5 24.2999 18.2 24.2999 16C24.2999 13.8 24.2999 13.5 24.2999 12.6C24.2999 11.7 24.1 11.1 23.9 10.6C23.7 10.1 23.4 9.59995 22.9 9.09995C22.4 8.59995 22 8.39995 21.4 8.09995C20.9 7.89995 20.3 7.79995 19.4 7.69995C18.5 7.69995 18.3 7.69995 16 7.69995Z" fill="white"/>
  <path d="M16 11.7C13.6 11.7 11.7 13.6 11.7 16C11.7 18.4 13.6 20.3 16 20.3C18.4 20.3 20.3 18.4 20.3 16C20.3 13.6 18.4 11.7 16 11.7ZM16 18.8C14.5 18.8 13.2 17.6 13.2 16C13.2 14.5 14.4 13.2 16 13.2C17.5 13.2 18.8 14.4 18.8 16C18.8 17.5 17.5 18.8 16 18.8Z" fill="white"/>
  <path d="M20.4 12.6C20.9522 12.6 21.4 12.1522 21.4 11.6C21.4 11.0477 20.9522 10.6 20.4 10.6C19.8477 10.6 19.4 11.0477 19.4 11.6C19.4 12.1522 19.8477 12.6 20.4 12.6Z" fill="white"/>
  </svg>
  
  `;

  return <SvgXml xml={xml} style={style} />;
};