import React from 'react';
import {SvgXml, XmlProps} from 'react-native-svg';

interface AddFriendsIconProps {
  style?: XmlProps['style'];
}

export const AddFriendsIcon: React.FC<AddFriendsIconProps> = ({style}) => {
  const xml = `
  <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect x="1" y="1" width="48" height="48" rx="24" stroke="#00BBFF" stroke-dasharray="4 4"/>
  <path d="M25.0001 18.6001V25.0001M25.0001 25.0001V31.4001M25.0001 25.0001H31.4001M25.0001 25.0001L18.6001 25.0001" stroke="#00BBFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
  `;

  return <SvgXml xml={xml} style={style} />;
};

interface InviteFriendsGrayIconProps {
  style?: XmlProps['style'];
}

export const InviteFriendsGrayIcon: React.FC<InviteFriendsGrayIconProps> = ({style}) => {
  const xml = `
  <svg width="40" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect x="1" y="1" width="48" height="48" rx="24" stroke="#737373" stroke-dasharray="4 4"/>
  <path d="M25.0001 18.6001V25.0001M25.0001 25.0001V31.4001M25.0001 25.0001H31.4001M25.0001 25.0001L18.6001 25.0001" stroke="#737373" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
  `;

  return <SvgXml xml={xml} style={style} />;
};

