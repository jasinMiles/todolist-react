import { createStore } from 'redux';

const initialState = {
  tasks: [],
};

export const ADD_TASK = 'ADD_TASK';
export const DELETE_TASK = 'DELETE_TASK';

export const addTask = (task) => ({
  type: ADD_TASK,
  payload: task,
});

export const deleteTask = (id) => ({
  type: DELETE_TASK,
  payload: id,
});

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TASK:
      return { tasks: [...state.tasks, action.payload] };
    case DELETE_TASK:
      return { tasks: state.tasks.filter((task) => task.id !== action.payload) };
    default:
      return state;
  }
};