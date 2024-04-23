import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  StatusBar,
  TouchableOpacity,
  Platform,
  ImageBackground,
} from 'react-native';
import {BLACK_TEXT, MAIN_BODY_COLOR, WHITE_TEXT} from '../../assets/colors';
import {BackArrow} from '../../assets/svgs/BackArrow';
import {useNavigation} from '@react-navigation/native';
import {Text} from '../Text';
import {images} from '../../assets/images';
import {DotsIcon} from '../../assets/svgs/DotsIcon';
import TripOptionsModal from '../Modals/TripOptionsModal';

interface TripDashboardHeaderWrapperProps {
  children: React.ReactNode;
  title?: string;
  tripId?: any;
  IsTripDashboard?: boolean;
}

export const TripDashboardHeaderWrapper: React.FC<
  TripDashboardHeaderWrapperProps
> = ({children, title, IsTripDashboard, tripId}) => {
  const navigation = useNavigation();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleBackPress = () => {
    if (IsTripDashboard) {
      navigation.navigate('HomeScreen' as never);
    } else {
      navigation.goBack();
    }
  };

  const handleDotsPress = () => {
    if (isModalVisible) {
      closeModal();
    } else {
      setIsModalVisible(true);
    }
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle={'dark-content'} />
      <ImageBackground
        source={images.onBoarding1}
        style={styles.headerBackground}
        resizeMode="cover">
        <View style={styles.overlay} />
        <View style={styles.headerContainer}>
          <TouchableOpacity
            hitSlop={{left: 10, right: 10}}
            onPress={handleBackPress}
            style={styles.backButton}>
            <BackArrow fill="white" />
          </TouchableOpacity>
          {!IsTripDashboard && (
            <View style={styles.backButton}>
              <Text
                variant="subheading"
                style={{fontWeight: 'bold'}}
                color={WHITE_TEXT}>
                Settings
              </Text>
            </View>
          )}
          <TouchableOpacity
            hitSlop={{left: 10, right: 10}}
            onPress={handleDotsPress}
            style={styles.backButton}>
            <DotsIcon />
          </TouchableOpacity>
          {title && (
            <View style={styles.titleContainer}>
              <Text style={styles.titleText}>{title}</Text>
            </View>
          )}
        </View>
      </ImageBackground>
      <View style={styles.mainContent}>
        <View style={styles.childrenContainer}>{children}</View>
      </View>
      <TripOptionsModal
        isVisible={isModalVisible}
        onClose={closeModal}
        IsTripDashboard={IsTripDashboard}
        tripId={tripId}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: MAIN_BODY_COLOR,
  },
  headerBackground: {
    flex: 0.32,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    overflow: 'hidden',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    marginHorizontal:10,
    marginTop:'10%'
  },
  backButton: {
    padding: 20,
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    marginRight: 30,
  },
  titleText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: BLACK_TEXT,
  },
  mainContent: {
    flex: 1,
    backgroundColor: MAIN_BODY_COLOR,
    position: 'relative',
  },
  childrenContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    top: '-10%',
    backgroundColor: MAIN_BODY_COLOR,
    marginHorizontal: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
});
