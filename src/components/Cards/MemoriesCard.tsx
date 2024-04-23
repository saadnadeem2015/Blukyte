import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { images } from '../../assets/images';
import { Text } from '../Text';
import { PLACEHOLDER_COLOR } from '../../assets/colors';

interface MemoryData {
  id: number;
  name: string;
  duration: string;
  imageSource: any;
}

const MemoryCard: React.FC<{ memory: MemoryData }> = ({ memory }) => {
  return (
    <View style={styles.cardContainer}>
      <Image source={memory.imageSource} style={styles.image} />
      <Text style={{fontWeight:'700'}}>{memory.name}</Text>
      <Text style={{fontSize:13}} color={PLACEHOLDER_COLOR}>{memory.duration}</Text>
    </View>
  );
};

export const MemoriesCard: React.FC = () => {
  const dummyData: MemoryData[] = [
    { id: 1, name: 'Memory 1', duration: 'Sep 10th - Sep 15th', imageSource: images.onBoarding1 },
    { id: 2, name: 'Memory 2', duration: 'Sep 10th - Sep 15th', imageSource: images.onBoarding2 },
    { id: 3, name: 'Memory 3', duration: 'Sep 10th - Sep 15th', imageSource: images.onBoarding3 },
    { id: 4, name: 'Memory 4', duration: 'Sep 10th - Sep 15th', imageSource: images.Login },
  ];

  return (
    <View style={styles.container}>
      {dummyData.map((memory) => (
        <MemoryCard key={memory.id} memory={memory} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  cardContainer: {
    padding: 5,
    marginBottom: 8,
    width: '50%',
  },
  image: {
    width: '100%',
    height: 110,
    marginBottom: 8,
    borderRadius:20
  },
});

