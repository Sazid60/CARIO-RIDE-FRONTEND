import { baseApi } from "@/redux/baseApi";



export const faqApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        askQuestion: builder.mutation({
            query: (faqInfo) => ({
                url: "/faq/ask-question",
                method: "POST",
                data: faqInfo,
            }),
            invalidatesTags: ["FAQ"],
        }),
        replyQuestion: builder.mutation({
            query: (faqInfo) => ({
                url: "/auth/login",
                method: "PATCH",
                data: faqInfo,
            }),
            invalidatesTags: ["FAQ"],
        }),
        getAllQuestions: builder.query({
            query: (params) => ({
                url: "/faq",
                method: "GET",
                params,
            }),
            providesTags: ["FAQ"],
        }),
    }),
});

export const {
    useAskQuestionMutation,
    useGetAllQuestionsQuery,
    useReplyQuestionMutation
} = faqApi