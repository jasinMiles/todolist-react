import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import todoListReducer from "../features/slices/todolistSlice";
import { todoListApi } from "../features/slices/todolistApi";

export const store = configureStore({
  reducer: {
    todolist: todoListReducer,
    [todoListApi.reducerPath]: todoListApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([todoListApi.middleware]),
});

setupListeners(store.dispatch);
 