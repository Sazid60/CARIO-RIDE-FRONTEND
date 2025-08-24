import { baseApi } from "@/redux/baseApi";



export const ridesApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllFeedbacks: builder.query({
            query: () => ({
                url: "/rides/all-feedbacks",
                method: "GET",
            }),
        }),

        getMyRide: builder.query({
            query: (id) => ({
                url: `/rides/my-ride/${id}`,
                method: "GET",
            }),
            providesTags: ["RIDES"],
        }),

        getAllRidesForRider: builder.query({
            query: () => ({
                url: "/rides/all-rides-rider",
                method: "GET",
            }),
            providesTags: ["RIDES"],
        }),

        driverNearMe: builder.query({
            query: () => ({
                url: "/rides/drivers-near",
                method: "GET",
            }),
            providesTags: ["DRIVER"],
        }),
        requestRide: builder.mutation({
            query: (rideInfo) => ({
                url: "/rides/request",
                method: "POST",
                data: rideInfo,
            }),
            invalidatesTags: ["RIDES"],
        }),
        cancelRide: builder.mutation({
            query: (id) => ({
                url: `/rides/cancel-ride/${id}`,
                method: "PATCH",
            }),
            invalidatesTags: ["RIDES"],
        }),

        // ______________________________driver_______________________________________
        ridesNearMe: builder.query({
            query: () => ({
                url: "rides/rides-near",
                method: "GET",
            }),
            providesTags: ["RIDES"],
        }),
        acceptRide: builder.mutation({
            query: (id) => ({
                url: `/rides/accept-ride/${id}`,
                method: "PATCH",
            }),
            invalidatesTags: ["RIDES"],
        }),
        rejectRide: builder.mutation({
            query: (id) => ({
                url: `/rides/reject-ride/${id}`,
                method: "PATCH",
            }),
            invalidatesTags: ["RIDES"],
        }),
        rideAcceptedByMe: builder.query({
            query: () => ({
                url: `/rides/my-accepted-ride`,
                method: "GET",
            }),
            providesTags: ["RIDES"],
        }),

        singleRideAcceptedByMe: builder.query({
            query: (id) => ({
                url: `/rides/my-accepted-ride/${id}`,
                method: "GET",
            }),
            providesTags: ["RIDES"],
        }),
        updateRideLocation: builder.mutation({
            query: ({ id, location }) => ({
                url: `/rides/ride-location-update/${id}`,
                method: "PATCH",
                data: location
            }),
            invalidatesTags: ["RIDES"],
        }),
    }),
});

export const {
    useUpdateRideLocationMutation,
    useRideAcceptedByMeQuery,
    useAcceptRideMutation,
    useRejectRideMutation,
    useGetAllFeedbacksQuery,
    useRidesNearMeQuery,
    useCancelRideMutation,
    useRequestRideMutation,
    useDriverNearMeQuery,
    useGetMyRideQuery,
    useGetAllRidesForRiderQuery,
    useSingleRideAcceptedByMeQuery
} = ridesApi