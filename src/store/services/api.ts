// userApi.js
import { emptySplitApi } from './emptySplitApi';

export const userApi = emptySplitApi.injectEndpoints({
  endpoints: (builder) => ({
    ////User Section////
    createUser: builder.mutation({
      query: (user) => ({
        url: '/user',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: user,
      }),
      invalidatesTags:["User"]
    }),
    getUserProfile: builder.query({
      query: () => ({
        url: '/user',
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }),
      providesTags:["User"],
      transformErrorResponse(baseQueryReturnValue, meta, arg) {
        //@ts-ignore
        if (baseQueryReturnValue.data && baseQueryReturnValue.data.message === "User profile not found") {
          return { error: 'User Profile not found' };
        }
        return null;
      },
    }),
    
    ////Trip Section/////
    createTrip: builder.mutation({
      query: (data) => ({
        url: '/trip',
        method: 'POST',
        body: data,
      }),
      invalidatesTags:["Trips"]
    }),
    joinTrip: builder.mutation({
      query: (data) => ({
        url: '/trip/join',
        method: 'POST',
        body: data,
      }),
      invalidatesTags:["TripsById","Trips"],
    }),
    getTrips: builder.query({
      query: () => ({
        url: '/trips',
        method: 'GET',
      }),
      providesTags:["Trips"],
    }),
    getTripById: builder.query({
      query: (id) => ({
        url: `/trip/${id}`,
        method: 'GET',
      }),
      providesTags:["TripsById"],
    }),
    DeleteTrip: builder.mutation({
      query: (id) => ({
        url: `/trip/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags:["TripsById","Trips"],
    }),
    LeaveTrip: builder.mutation({
      query: (id) => ({
        url: `/trip/${id}/members/leave`,
        method: 'POST',
      }),
      invalidatesTags:["TripsById","Trips"],
    }),
    inviteMembers: builder.mutation({
      query: (data) => ({
        url: `/trip/members/invite`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags:["TripsById","Trips"],
    }),
    removeMember: builder.mutation<{ id: any }, { data: any }>({
      query: ({ id, data }: { id: any, data: any }) => ({
        url: `/trip/${id}/members/delete`,
        method: 'DELETE',
        body: data,
      }),
      invalidatesTags: ["TripsById", "Trips"],
    }),
  }),
});

export const {useCreateUserMutation,useCreateTripMutation,useGetUserProfileQuery,useJoinTripMutation,useGetTripsQuery,useGetTripByIdQuery,useDeleteTripMutation,useLeaveTripMutation,useRemoveMemberMutation,useInviteMembersMutation} = userApi
