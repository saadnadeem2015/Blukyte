import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slices/auth";
import { emptySplitApi } from "./services/emptySplitApi";
import { persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'
import { auth0Api } from "./services/auth0Api";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [emptySplitApi.reducerPath]: emptySplitApi.reducer,
    [auth0Api.reducerPath]: auth0Api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      },
    }).concat(emptySplitApi.middleware, auth0Api.middleware),
});

export const persistor = persistStore(store);
