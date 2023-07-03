import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { API_URL } from '../../constants';

export const todoListApi = createApi({
  reducerPath: "todoListApi",
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (builder) => ({
    getTodos: builder.query({
      query: () => "/todo",
    }),

    addTodo: builder.mutation({
      query: (todo) => ({
        url: "/todo",
        method: "POST",
        body: todo,
        headers: {
          accept: "application/json",
        },
      }),
    }),

    updateTodo: builder.mutation({
      query: (item) => ({
        url: `/todo/${item.id}`,
        method: "PUT",
        body: item,
        headers: {
          accept: "application/json",
        },
      }),
    }),

    deleteTodo: builder.mutation({
      query: (id) => ({
        url: `/todo/${id}`,
        method: "DELETE",
        headers: {
          accept: "application/json",
        },
      }),
    }),
  }),
});

export const {
  useGetTodosQuery,
  useAddTodoMutation,
  useDeleteTodoMutation,
  useUpdateTodoMutation,
} = todoListApi;
