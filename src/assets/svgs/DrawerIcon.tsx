import React from 'react';
import {SvgXml, XmlProps} from 'react-native-svg';

interface DrawerIconProps {
  style?: XmlProps['style'];
}

export const DrawerIcon: React.FC<DrawerIconProps> = ({style}) => {
  const xml = `
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M25.3334 10.6667C25.3334 11.1085 24.9752 11.4667 24.5334 11.4667L7.46671 11.4667C7.02488 11.4667 6.66671 11.1085 6.66671 10.6667C6.66671 10.2248 7.02488 9.86667 7.46671 9.86667L24.5334 9.86667C24.9752 9.86667 25.3334 10.2248 25.3334 10.6667Z" fill="#171717"/>
  <path fill-rule="evenodd" clip-rule="evenodd" d="M25.3334 16C25.3334 16.4418 24.9752 16.8 24.5334 16.8L7.46671 16.8C7.02488 16.8 6.66671 16.4418 6.66671 16C6.66671 15.5582 7.02488 15.2 7.46671 15.2L24.5334 15.2C24.9752 15.2 25.3334 15.5582 25.3334 16Z" fill="#171717"/>
  <path fill-rule="evenodd" clip-rule="evenodd" d="M25.3334 21.3333C25.3334 21.7752 24.9752 22.1333 24.5334 22.1333L7.46671 22.1333C7.02488 22.1333 6.66671 21.7752 6.66671 21.3333C6.66671 20.8915 7.02488 20.5333 7.46671 20.5333L24.5334 20.5333C24.9752 20.5333 25.3334 20.8915 25.3334 21.3333Z" fill="#171717"/>
  </svg>
  `;

  return <SvgXml xml={xml} style={style} />;
};

