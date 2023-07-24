// Import necessary functions from "@reduxjs/toolkit/query/react" and other dependencies
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from '../../constants';

// Create an API instance using the `createApi` function
export const todoListApi = createApi({
  // Define the name of the reducer slice for the generated reducer
  reducerPath: "todoListApi",
  
  // Configure the base query with the API base URL using `fetchBaseQuery`
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),

  // Define the available API endpoints and their HTTP methods using `endpoints` function
  endpoints: (builder) => ({
    // Define a query endpoint to fetch todos
    getTodos: builder.query({
      query: () => "/todo", // The query function that returns the endpoint URL
    }),

    // Define a mutation endpoint to add a new todo item
    addTodo: builder.mutation({
      query: (todo) => ({
        url: "/todo", // The endpoint URL to add a todo item
        method: "POST", // The HTTP method for this request
        body: todo, // The data to be sent as the request body
        headers: {
          accept: "application/json", // Define the headers for this request
        },
      }),
    }),

    // Define a mutation endpoint to update an existing todo item
    updateTodo: builder.mutation({
      query: (item) => ({
        url: `/todo/${item.id}`, // The endpoint URL to update a specific todo item
        method: "PUT", // The HTTP method for this request
        body: item, // The data to be sent as the request body
        headers: {
          accept: "application/json", // Define the headers for this request
        },
      }),
    }),

    // Define a mutation endpoint to delete a todo item
    deleteTodo: builder.mutation({
      query: (id) => ({
        url: `/todo/${id}`, // The endpoint URL to delete a specific todo item
        method: "DELETE", // The HTTP method for this request
        headers: {
          accept: "application/json", // Define the headers for this request
        },
      }),
    }),
  }),
});

// Destructure and export hooks for each endpoint to use them in React components
export const {
  useGetTodosQuery, // Hook to fetch todos
  useAddTodoMutation, // Hook to add a todo item
  useDeleteTodoMutation, // Hook to delete a todo item
  useUpdateTodoMutation, // Hook to update a todo item
} = todoListApi;
