import React, {useRef, FC, forwardRef, useImperativeHandle} from 'react';
import {View, TouchableOpacity, StyleSheet, Platform} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import {BLUE_COLOR} from '../../assets/colors';
import {Text} from '../Text';
import { useNavigation } from '@react-navigation/native';

interface CreateTripBottomSheetProps {
  forwardedRef: React.Ref<CreateTripBottomSheetRef>;
}

export interface CreateTripBottomSheetRef {
  open: () => void;
  close: () => void;
}

const CreateTripBottomSheet: FC<CreateTripBottomSheetProps> = forwardRef<
  CreateTripBottomSheetRef,
  CreateTripBottomSheetProps
>(({forwardedRef}, ref) => {
  const bottomSheetRef = useRef<RBSheet | null>(null);
  const navigation = useNavigation()

  useImperativeHandle(
    forwardedRef,
    () => ({
      open: () => bottomSheetRef.current?.open(),
      close: () => bottomSheetRef.current?.close(),
    }),
    [],
  );

  const handleCreateTrip = () => {
    bottomSheetRef.current?.close()
    navigation.navigate("CreateTrip" as never)
  }

  const handleJoinTrip = () => {
    bottomSheetRef.current?.close()
    navigation.navigate("JoinTrip" as never)
  }

  return (
    //@ts-ignore
    <RBSheet
      ref={bottomSheetRef}
      height={Platform.OS === "android" ? 180 : 200}
      closeOnDragDown={true}
      customStyles={{
        wrapper: {
          backgroundColor: 'transparent',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.5,
          shadowRadius: 3.84,
          elevation: 12,
        },
        container: {
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
          elevation:20
        },
        draggableIcon:{width:130,height:2,top:10,backgroundColor:'#A3A3A3'}
      }}>
      <View
        style={{padding: 20, justifyContent: 'center', alignItems: 'center'}}>
        <TouchableOpacity onPress={handleCreateTrip} style={styles.button}>
          <Text style={{fontWeight:'600'}}>Create a New Trip</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleJoinTrip} style={styles.button}>
          <Text style={{fontWeight:'600'}}>Join an Existing Trip</Text>
        </TouchableOpacity>
      </View>
    </RBSheet>
  );
});

export default CreateTripBottomSheet;

const styles = StyleSheet.create({
  button: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: BLUE_COLOR,
    width: '100%',
    marginBottom: 10,
    height: 45,
  },
});
