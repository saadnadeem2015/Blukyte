import {NavigationContainer} from '@react-navigation/native';
import { AuthStack } from './AuthStack';
import { HomeStack } from './HomeStack';

export const MainStack = () => {
  return (
    <NavigationContainer>
      <AuthStack />
      {/* <HomeStack /> */}
    </NavigationContainer>
  );
};
