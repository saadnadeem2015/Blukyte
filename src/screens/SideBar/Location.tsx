import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {HeaderWrapper} from '../../components/HeaderWrappers/HeaderWrapper';
import {TextInput} from '../../components/TextInput/TextInput';
import {LocationMarkerIcon} from '../../assets/svgs/LocationMarkerIcon';
import {Text} from '../../components/Text';
import {BLUE_COLOR, PLACEHOLDER_COLOR} from '../../assets/colors';

const Location = () => {
  const handleCurrentLocationPress = () => {
    console.log('Use current location pressed');
  };

  return (
    <HeaderWrapper title="Location">
      <View style={styles.container}>
        <TextInput placeholder="Search" showSearchIcon />
        <View style={styles.locationContainer}>
          <TouchableOpacity onPress={handleCurrentLocationPress}>
            <LocationMarkerIcon />
          </TouchableOpacity>
          <View style={styles.textContainer}>
            <Text color={BLUE_COLOR} style={styles.locationText}>
              Use current location
            </Text>
            <Text style={{fontSize: 14}} color={PLACEHOLDER_COLOR}>
              Liverpool, UK
            </Text>
          </View>
        </View>
      </View>
    </HeaderWrapper>
  );
};

export default Location;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
  },
  textContainer: {
    marginLeft: 10,
  },
  locationText: {
    fontWeight: '600',
  },
});
