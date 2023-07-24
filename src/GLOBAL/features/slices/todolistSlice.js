// Importing the createSlice function from Redux Toolkit
import { createSlice } from "@reduxjs/toolkit";

// Defining the initial state for the todo list
const initialState = {
  todos: null,
  todo: null,
};

// Creating a Redux slice using createSlice function
export const todoListSlice = createSlice({
  // The name of the slice, used to generate action types
  name: "todolist",

  // Initial state of the slice
  initialState,

  // Reducer functions - define how the state should be updated in response to actions
  reducers: {
    // Reducer function for "getTodos" action
    getTodos: (state, action) => {
      // Filter the todos from the payload, removing items with an empty "todo" property
      state.todos = action.payload.filter((item) => item.todo !== "");
    },

    // Reducer function for "setTodo" action
    setTodo: (state, action) => {
      // Set the "todo" property of the state to the payload value
      state.todo = action.payload;
    },

    // Reducer function for "deleteItem" action
    deleteItem: (state, action) => {
      // Remove the item with the specified ID from the "todos" array
      state.todos = state.todos.filter((item) => item.id !== action.payload);

      // If the deleted item is the currently selected "todo", set "todo" to null
      state.todo = state.todo?.id === action.payload ? null : state.todo;
    },

    // Reducer function for "updateItem" action
    updateItem: (state, action) => {
      // Find the item with the matching ID in "todos" array and update its "todo" property
      state.todos.forEach((item) => {
        if (item.id === action.payload.id) {
          item.todo = action.payload.todo;
        }
      });
    },

    // Reducer function for "addItem" action
    addItem: (state, action) => {
      // Push the new todo item from the payload into the "todos" array
      state.todos = state.todos.push(action.payload)
    },
  },
});

// Extracting the action creators from the slice to be used elsewhere
export const { getTodos, setTodo, deleteItem, updateItem, addItem } = todoListSlice.actions;

// Exporting the reducer function to be used in the Redux store
export default todoListSlice.reducer;
