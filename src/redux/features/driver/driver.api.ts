import { baseApi } from "@/redux/baseApi";



export const driverApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getDriverProfile: builder.query({
            query: (params) => ({
                url: "/drivers/me",
                method: "GET",
                params,
            }),
            providesTags: ["DRIVER"],
        }),
        goOnline: builder.mutation({
            query: (location) => ({
                url: "drivers/go-online",
                method: "PATCH",
                data: location,
            }),
            invalidatesTags: ["DRIVER"],
        }),
    }),
});

export const {
    useGetDriverProfileQuery
} = driverApi

