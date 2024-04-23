import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from './baseUrl';

export const emptySplitApi = createApi({
  reducerPath: 'serverApis',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const authState = (getState() as any)?.auth;
      const { accessToken, idToken, refreshToken } = authState;
      if (accessToken) {
        headers.set('authorization', `Bearer ${accessToken}`);
        // console.log(accessToken,'console of access token')
      }
      if (idToken) {
        headers.set('X-ID-Token', idToken);
        // console.log(idToken,'console of idtoken')
      }
      if (refreshToken) {
        headers.set('X-Refresh-Token', refreshToken);
        // console.log(refreshToken,'console of refreshtoken')
      }
      return headers;
    },
  }),
  endpoints: () => ({}),
  tagTypes: [ "User", "Trips", "TripsById"],
});

