import { baseApi } from "@/redux/baseApi";



export const ridesApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllFeedbacks: builder.query({
            query: () => ({
                url: "rides/all-feedbacks",
                method: "GET",
            }),
            providesTags: ["RIDES"],
        }),
    }),
});

export const {
    useGetAllFeedbacksQuery
} = ridesApi