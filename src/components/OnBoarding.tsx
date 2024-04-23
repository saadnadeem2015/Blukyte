import React, {useRef, useState} from 'react';
import {ImageBackground, StyleSheet, View} from 'react-native';
import Swiper from 'react-native-swiper';
import {WHITE_TEXT} from '../assets/colors';
import {Text} from './Text';
import {images} from '../assets/images';
import {Button} from './Button';
import {Dot} from '../assets/svgs/Dot';

export const OnBoardingScreens = ({
  onBoardingComplete,
}: {
  onBoardingComplete: () => void;
}) => {
  const swiperRef = useRef<Swiper>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () => {
    if (swiperRef.current) {
      swiperRef.current.scrollBy(1, true);
    }
  };
  const handleSkip = () => {
    if (swiperRef.current) {
      //@ts-ignore
      swiperRef.current.scrollTo(swiperRef.current.state.total - 1, true);
      onBoardingComplete();
    }
  };

  const handleIndexChange = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <Swiper
      ref={swiperRef}
      showsButtons={false}
      showsPagination={false}
      onIndexChanged={handleIndexChange}
      loop={false}>
      <ImageBackground
        source={images.onBoarding1}
        style={[styles.imageBackground, {height: '100%'}]}>
        <View style={styles.slide1}>
          <Text
            style={{textAlign: 'center'}}
            color={WHITE_TEXT}
            variant="heading">
            Collaborate on ideas
          </Text>
          <View style={{marginVertical: 20}}>
            <Text style={{textAlign: 'center'}} color={WHITE_TEXT}>
              No one ever has to feel stressed out or left out again.{' '}
            </Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Dot style={{paddingHorizontal: 20, opacity: activeIndex === 0 ? 1 : 0.6}} />
            <Dot style={{paddingHorizontal: 20, opacity: activeIndex === 1 ? 1 : 0.6}} />
            <Dot style={{paddingHorizontal: 20, opacity: activeIndex === 2 ? 1 : 0.6}} />
          </View>
          <View style={[styles.buttonContainer, { marginBottom: 20 }]}>
            <Button text="Next" onPress={handleNext} />
          </View>
          <Text color={WHITE_TEXT} onPress={handleSkip}>
            Skip
          </Text>
        </View>
      </ImageBackground>
      <ImageBackground
        source={images.onBoarding2}
        style={[styles.imageBackground, {height: '100%'}]}>
        <View style={styles.slide1}>
          <Text
            style={{textAlign: 'center'}}
            color={WHITE_TEXT}
            variant="heading">
            Turn them into activities, tasks, and expenses.
          </Text>
          <View style={{marginVertical: 20}}>
            <Text style={{textAlign: 'center'}} color={WHITE_TEXT}>
              All of the heavy lifting is done for you.
            </Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Dot style={{paddingHorizontal: 20, opacity: activeIndex === 0 ? 1 : 0.6}} />
            <Dot style={{paddingHorizontal: 20, opacity: activeIndex === 1 ? 1 : 0.6}} />
            <Dot style={{paddingHorizontal: 20, opacity: activeIndex === 2 ? 1 : 0.6}} />
          </View>
          <View style={[styles.buttonContainer, { marginBottom: 20 }]}>
            <Button text="Next" onPress={handleNext} />
          </View>
          <Text color={WHITE_TEXT} onPress={handleSkip}>
            Skip
          </Text>
        </View>
      </ImageBackground>
      <ImageBackground
        source={images.onBoarding3}
        style={[styles.imageBackground, {height: '100%'}]}>
        <View style={styles.slide1}>
          <Text
            style={{textAlign: 'center'}}
            color={WHITE_TEXT}
            variant="heading">
            Create stress-free memories.{' '}
          </Text>
          <View style={{marginVertical: 20}}>
            <Text style={{textAlign: 'center'}} color={WHITE_TEXT}>
              Easy day-to-day planning ensures a drama-free trip !{' '}
            </Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Dot style={{paddingHorizontal: 20, opacity: activeIndex === 0 ? 1 : 0.6}} />
            <Dot style={{paddingHorizontal: 20, opacity: activeIndex === 1 ? 1 : 0.6}} />
            <Dot style={{paddingHorizontal: 20, opacity: activeIndex === 2 ? 1 : 0.6}} />
          </View>
          <View style={styles.buttonContainer}>
            <Button text="Next" onPress={onBoardingComplete} />
          </View>
        </View>
      </ImageBackground>
    </Swiper>
  );
};

const styles = StyleSheet.create({
  slide1: {
    flex: 0.4,
    marginHorizontal: 30,
    alignItems: 'center',
    marginTop: 'auto',
    paddingBottom: '13%',
  },
  imageBackground: {
    width: '100%',
    overflow: 'hidden',
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginVertical: 30,
  },
});
