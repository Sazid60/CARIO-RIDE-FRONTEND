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
    }),
});

export const {
    useGetDriverProfileQuery
} = driverApi

