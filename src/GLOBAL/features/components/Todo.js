import React from "react";
import { useDispatch } from "react-redux";
import { deleteItem, setTodo } from "../slices/todolistSlice";
import { useDeleteTodoMutation } from "../slices/todolistApi";

const Todo = ({ todo, refetch }) => {
  // Custom React hook 'useDeleteTodoMutation' returns a function 'deleteTodo' and an object 'a'.
  // 'deleteTodo' is used to delete a todo item through an API call.
  // 'a' contains various properties and functions, but it's not clear from the code what it's used for.
  const [deleteTodo, a] = useDeleteTodoMutation({
    onError: (err) => {
      console.log(err);
    },
  });

  // The useDispatch hook returns a reference to the Redux store's dispatch function.
  // This is used to dispatch Redux actions to update the state.
  const dispatch = useDispatch();

  // Function to confirm the deletion of a todo item.
  // If the user confirms the deletion, it makes an API call to delete the todo item.
  // If the deletion is successful (indicated by a truthy value in the response), it dispatches a Redux action to delete the item from the state.
  const confirmDelete = async () => {
    if (window.confirm("Are you sure you want to delete?") === true) {
      await deleteTodo(todo.id)
        .then((res) => {
          if (res.data) {
            dispatch(deleteItem(todo.id));
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    // Render the todo item with its data and action buttons.
    <div className="flex justify-between my-2 border-b border-blue-100 px-2 py-2">
      {/* Display the todo text */}
      <div className="font-mono text-xl font-semibold">{todo.todo}</div>
      <div className="flex ml-2">
        {/* Edit button */}
        <button
          // When clicked, dispatches a Redux action 'setTodo' to set the todo item as the currently edited one.
          onClick={() => dispatch(setTodo(todo))}
          id="btn-four"
          className="text-white w-24 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-semibold rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Edit
        </button>
        {/* Delete button */}
        <button
          // When clicked, calls the 'confirmDelete' function to start the deletion process.
          onClick={confirmDelete}
          id="btn-five"
          // The button's appearance is determined by the condition in the template literal (ternary operator).
          // If 'a.isLoading' is true, the button shows "deleting ..." and uses different styles, otherwise, it shows "Delete".
          className={`text-white w-24 bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-${
            a.isLoading ? "light" : "semibold"
          } rounded-lg text-${
            a.isLoading ? "xs" : "sm"
          } px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800`}
        >
          {a.isLoading ? "deleting ..." : "Delete"}
        </button>
      </div>
    </div>
  );
};

export default Todo;
