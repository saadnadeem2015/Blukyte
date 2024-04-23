import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Avatar from './Avatar';
import { InviteFriendsGrayIcon } from '../assets/svgs/AddFriendsIcon';
import { images } from '../assets/images';
import { BLUE_COLOR } from '../assets/colors';

interface MemberAvatarListProps {
  data: { members: { fullName: string,isCreator:any }[] } | { fullName: string,isCreator:any }[];
  FriendsBottomSheetRef?: React.MutableRefObject<any>;
}
const MemberAvatarList: React.FC<MemberAvatarListProps> = ({
  data,
  FriendsBottomSheetRef,
}) => {
  const members = Array.isArray(data) ? data : data?.members;
  return (
    <View style={styles.container}>
      <View style={styles.avatarsContainer}>
        {members?.slice(0, 4).map((member, index) => (
          <View
            key={index}
            style={[
              styles.avatarContainer,
              { zIndex: members?.length - index },
            ]}>
            {member?.fullName === ' ' ? (
              <Avatar size="small" imageUrl={images.onBoarding1} />
            ) : (
              <Avatar userNameImageStyle={{borderWidth: member.isCreator ? 1 : 0, borderColor: member.isCreator ? BLUE_COLOR : 'transparent'}} size="small" userName={member.fullName} />
            )}
          </View>
        ))}
        {members?.length > 4 && (
          <View
            style={[styles.avatarContainer, { zIndex: members?.length }]}>
            <Avatar size="small" userName={`+ ${members?.length - 5}`} />
          </View>
        )}
      </View>
      <TouchableOpacity
        onPress={() => FriendsBottomSheetRef?.current?.open()}
        style={{ marginTop: 10,marginLeft:5 }}>
        <InviteFriendsGrayIcon />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarsContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  avatarContainer: {
    position: 'relative',
    marginLeft: -15,
  },
});

export default MemberAvatarList;
