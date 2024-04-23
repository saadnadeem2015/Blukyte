import React, { useEffect } from 'react';
import {ImageBackground, Platform, StyleSheet, View} from 'react-native';
import {images} from '../../assets/images';
import {Button} from '../../components/Button';
import {BLUE_COLOR} from '../../assets/colors';
import {OnBoardingScreens} from '../../components/OnBoarding';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, setOnboardingCompleted } from '../../store/slices/auth';

export const SignUpOptions = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch()
  const [showOnboarding, setShowOnboarding] = React.useState(false);
  const rememberMe = useSelector((state:RootState) => state.auth.rememberMe);
  const accessToken = useSelector((state:RootState) => state.auth.accessToken);
  const onboardingCompleted = useSelector((state: RootState) => state.auth.onboardingCompleted);

  const handleOnboardingComplete = () => {
    dispatch(setOnboardingCompleted());
    setShowOnboarding(false);
  };

  useEffect(() => {
    if(rememberMe && accessToken){
      navigation.reset({
        index: 0,
        routes: [{ name: 'Home' as never}],
      });
    }
    if (!accessToken && !onboardingCompleted) {
      setShowOnboarding(true);
    }
  },[])

  return (
    <>
      {showOnboarding ? (
        <OnBoardingScreens onBoardingComplete={handleOnboardingComplete} />
      ) : (
        <ImageBackground
          source={images.Login}
          style={[styles.imageBackground, {height: '100%'}]}>
          <View style={{...styles.slide1, flex: 0.3}}>
            <View style={styles.buttonContainer}>
              <Button onPress={() => navigation.navigate("Register" as never)} textStyle={{fontWeight: Platform.OS === 'ios' ? 'bold' : '600'}} text="Create account" />
            </View>
            <Button
              onPress={() => navigation.navigate('Login' as never)}
              style={{backgroundColor: 'white'}}
              textStyle={{color: BLUE_COLOR,fontWeight: Platform.OS === 'ios' ? 'bold' : '600'}}
              text="Sign in"
            />
          </View>
        </ImageBackground>
      )}
    </>
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
