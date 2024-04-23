// auth0Api.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { AUTH0_BASE_URL } from './baseUrl';

export const auth0Api = createApi({
  reducerPath: 'auth0Api',
  baseQuery: fetchBaseQuery({
    baseUrl: AUTH0_BASE_URL,
  }),
  endpoints: (builder) => ({
    passwordlessStart: builder.mutation({
      query: ({ phoneNumber }) => ({
        url: '/passwordless/start',
        method: 'POST',
        body: {
          client_id: '5Me3lWThowAKdVTNCpIE1ew0Ku4yz9nB',
          connection: 'sms',
          phone_number: phoneNumber,
          send: 'code',
        },
      }),
    }),
    verifyOtp: builder.mutation({
        query: ({ phoneNumber, otpValues }) => ({
          url: '/oauth/token',
          method: 'POST',
          body: {
            grant_type: 'http://auth0.com/oauth/grant-type/passwordless/otp',
            client_id: '5Me3lWThowAKdVTNCpIE1ew0Ku4yz9nB',
            audience: 'https://dev-2sgfyj57edl8066q.us.auth0.com/api/v2/',
            username: phoneNumber,
            otp: otpValues.join(''),
            realm: 'sms',
            scope: 'openid profile email phone offline_access',
          },
        }),
      }),
  }),
});

export const { usePasswordlessStartMutation,useVerifyOtpMutation } = auth0Api;
