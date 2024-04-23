import React from 'react';
import { StyleSheet, Text, View, Image, ImageStyle } from 'react-native';
import { CameraIcon } from '../assets/svgs/CameraIcon';

interface AvatarProps {
  size: 'small' | 'medium' | 'large';
  userName?: string;
  imageUrl?: any;
  showCameraIcon?: boolean;
  imageStyle?: ImageStyle;
  width?: number;
  height?: number;
  userNameImageStyle?:any
}

const Avatar: React.FC<AvatarProps> = ({
  size,
  userName,
  imageUrl,
  showCameraIcon = false,
  imageStyle,
  userNameImageStyle,
  width,
  height,
}) => {
  const avatarSizes: Record<string, number> = {
    small: 40,
    medium: 80,
    large: 120,
  };

  const avatarSize = avatarSizes[size] || avatarSizes.medium;

  const getInitials = (name: string | undefined): string => {
    if (!name) {
      return '';
    }
    const initials = name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase();
  
    return initials.slice(0, 1);
  };
  
  return (
    <View
      style={[
        styles.avatarContainer,
        { width: width || avatarSize, height: height || avatarSize },
        userNameImageStyle
      ]}
    >
      {imageUrl ? (
        <>
          <Image
            source={imageUrl}
            resizeMode="cover"
            style={[styles.avatarImage, imageStyle]}
          />
          {showCameraIcon && (
            <View style={styles.cameraIconContainer}>
              <CameraIcon />
            </View>
          )}
        </>
      ) : (
        <>
          <Text style={styles.avatarText}>{getInitials(userName)}</Text>
          {showCameraIcon && (
            <View style={styles.cameraIconContainer}>
              <CameraIcon />
            </View>
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  avatarContainer: {
    borderRadius: 999,
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    borderRadius: 100,
  },
  avatarText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  cameraIconContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    padding: 1,
    zIndex: 9999,
  },
});

export default Avatar;
