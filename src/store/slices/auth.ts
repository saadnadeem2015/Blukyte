import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface AuthState {
  accessToken: string | null;
  idToken: string | null;
  refreshToken: string | null;
  rememberMe: boolean;
  appUserId: any;
  onboardingCompleted: boolean;
  userData:any;
  tripId:any;
}

const persistConfig = {
  key: 'root',
  version: 1,
  storage: AsyncStorage,
  blacklist: [],
}

const initialState: AuthState = {
  accessToken: null,
  refreshToken:null,
  appUserId:null,
  idToken: null,
  userData:null,
  tripId:null,
  rememberMe: false,
  onboardingCompleted: false,
}
export type RootState = {
  auth: AuthState;
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<string | null>) => {
      state.userData = action.payload;
    },
    setAuthData: (
      state,
      action: PayloadAction<{
        accessToken: string | null;
        idToken: string | null;
        refreshToken: string | null;
      }>
    ) => {
      const { accessToken, idToken, refreshToken } = action.payload;
      state.accessToken = accessToken;
      state.idToken = idToken;
      state.refreshToken = refreshToken;
    },
    setAppUserId: (state, action: PayloadAction<any | null>) => {
      state.appUserId = action.payload;
    },
    setRememberMe: (state, action: PayloadAction<boolean>) => {
      state.rememberMe = action.payload;
    },
    setOnboardingCompleted: (state) => {
      state.onboardingCompleted = true;
    },
    setTripId: (state, action: PayloadAction<any>) => {
      state.tripId = action.payload;
    },
    ClearTokens: (state) => {
      state.accessToken = null;
      state.idToken = null;
      state.refreshToken = null;
    },
  },
});

export const { setAuthData, setRememberMe, ClearTokens,setOnboardingCompleted,setAppUserId,setUserData,setTripId } = authSlice.actions;

export const authReducer = persistReducer(persistConfig, authSlice.reducer);
