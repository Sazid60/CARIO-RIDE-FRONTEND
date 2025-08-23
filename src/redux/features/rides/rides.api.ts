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
    }),
});

export const {
    useGetAllFeedbacksQuery,
    useRequestRideMutation,
    useDriverNearMeQuery,
    useGetMyRideQuery,
    useGetAllRidesForRiderQuery
} = ridesApi