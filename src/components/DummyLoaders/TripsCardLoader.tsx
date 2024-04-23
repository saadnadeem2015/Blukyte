import React, {FC} from 'react';
import {StyleSheet, View, Image, TouchableOpacity} from 'react-native';
import {Text} from '../Text';
import {images} from '../../assets/images';

const TripsCardLoader = () => {
  return (
    <>
      <View style={styles.cardContainer}>
        <TouchableOpacity>
          <Image
            resizeMode="cover"
            source={images.TripNow}
            style={styles.cardImage}
          />
        </TouchableOpacity>
        <View style={styles.textContainer}>
          <Text style={styles.bottomText}>Now</Text>
        </View>
      </View>
      <View style={styles.cardContainer}>
        <TouchableOpacity>
          <Image
            resizeMode="cover"
            source={images.TripUpcoming}
            style={styles.cardImage}
          />
        </TouchableOpacity>
        <View style={styles.textContainer}>
          <Text style={styles.bottomText}>UpComing</Text>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    marginVertical: 10,
  },
  cardImage: {
    height: 120,
    width: '100%',
    borderRadius: 20,
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  bottomText: {
    fontWeight: '700',
  },
});

export default TripsCardLoader;
