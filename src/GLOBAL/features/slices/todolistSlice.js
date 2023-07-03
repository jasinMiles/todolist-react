import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  todos: null,
  todo: null,
};

export const todoListSlice = createSlice({
  name: "todolist",
  initialState,

  reducers: {
    getTodos: (state, action) => {
      state.todos = action.payload.filter((item) => item.todo !== "");
    },

    setTodo: (state, action) => {
      state.todo = action.payload;
    },

    deleteItem: (state, action) => {
      state.todos = state.todos.filter((item) => item.id !== action.payload);
      state.todo = state.todo?.id === action.payload ? null : state.todo;
    },

    updateItem: (state, action) => {
      state.todos.forEach((item) => {
        if (item.id === action.payload.id) {
          item.todo = action.payload.todo;
        }
      });
    },

    addItem: (state, action) => {
      state.todos = state.todos.push(action.payload)
    },

  },
});

export const { getTodos, setTodo, deleteItem, updateItem, addItem } = todoListSlice.actions;

export default todoListSlice.reducer;
