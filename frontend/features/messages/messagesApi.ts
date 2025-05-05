import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Message {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export const messagesApi = createApi({
  reducerPath: "messagesApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8080" }),
  endpoints: (builder) => ({
    getMessages: builder.query<Message[], void>({
      query: () => "/messages",
    }),
    addMessage: builder.mutation<Message, string>({
      query: (content) => ({
        url: "/messages",
        method: "POST",
        body: { content },
        headers: { "Content-Type": "application/json" },
      }),
    }),
    updateMessage: builder.mutation<Message, { id: number; content: string }>({
      query: ({ id, content }) => ({
        url: `/messages/${id}`,
        method: "PUT",
        body: { content },
        headers: { "Content-Type": "application/json" },
      }),
    }),
    deleteMessage: builder.mutation<{ success: boolean }, number>({
      query: (id) => ({
        url: `/messages/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetMessagesQuery,
  useAddMessageMutation,
  useUpdateMessageMutation,
  useDeleteMessageMutation,
} = messagesApi;
