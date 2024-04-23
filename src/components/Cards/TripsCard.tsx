import React, {FC} from 'react';
import {StyleSheet, View, Image, TouchableOpacity} from 'react-native';
import {Text} from '../Text';
import {useNavigation} from '@react-navigation/native';
import {images} from '../../assets/images';
import moment from 'moment';

interface TripsCardProps {
  item: any[];
}

const TripsCard: FC<TripsCardProps> = ({item}) => {
  const navigation = useNavigation();
  return (
    <>
      {item && item.map((trip: any, index: number) => (
          <View style={styles.cardContainer} key={trip.id}>
            <TouchableOpacity
              onPress={() =>
                //@ts-ignore
                navigation.navigate('TripDashboard', { tripId: trip.id })
              }>
              <Image
                resizeMode="cover"
                source={index === 0 ? images.onBoarding1 : images.onBoarding2}
                style={styles.cardImage}
              />
            </TouchableOpacity>
            <View style={styles.textContainer}>
              <Text style={styles.bottomText}>
                {index === 0 ? 'Now: ' + trip.name : 'Next: ' + trip.name}
              </Text>
              <Text style={{fontSize: 13}} color="#737373">
                {`${moment(trip.startDate).format('MMM Do')} - ${moment(trip.endDate).format('MMM Do')}`}
              </Text>
            </View>
          </View>
        ))}
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
  },
  bottomText: {
    fontWeight: '700',
  },
});

export default TripsCard;
