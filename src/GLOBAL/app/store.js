import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import todoListReducer from "../features/slices/todolistSlice";
import { todoListApi } from "../features/slices/todolistApi";

// Create a Redux store using the configureStore function from Redux Toolkit
export const store = configureStore({
  reducer: {
    // Set up the "todolist" reducer in the store
    todolist: todoListReducer,
    // Set up the reducer for the todoListApi slice and associate it with a specific reducer path
    [todoListApi.reducerPath]: todoListApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    // Add the middleware for handling API requests from the todoListApi slice
    getDefaultMiddleware().concat([todoListApi.middleware]),
});

// Set up listeners to automatically handle lifecycle events of the API endpoints defined in todoListApi
setupListeners(store.dispatch);
