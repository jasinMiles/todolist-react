import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addItem, setTodo, updateItem } from "../slices/todolistSlice";
import {
  useAddTodoMutation,
  useUpdateTodoMutation,
} from "../slices/todolistApi";

const AddTodo = ({ refetch }) => {
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [title, setTitle] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  //redux
  const { todo, todos } = useSelector((state) => state.todolist);
  const [addTodo] = useAddTodoMutation();
  const [updateTodo] = useUpdateTodoMutation();

  const dispatch = useDispatch();

  // clear form data
  function newTodo() {
    setIsEditing(false);
    setError("");
    setTitle("");
    setSuccessMsg("");
    dispatch(setTodo(null));
  }

  //if the state variable holding a todo changes, populate form and set editing to true
  useEffect(() => {
    if (todo) {
      setIsEditing(true);
      setTitle(todo.todo);
    }else{
      setIsEditing(false);
    }
  }, [todo]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    //form validations
    if (title === "") {
      setError("The title field is required");
      return
    } else if (title.length < 5) {
      setError("Characters in the title field must be more than 5");
      return
    }

    if (isEditing) {
      setIsLoading(true);
      //update the todo
      updateTodo({ id: todo.id, todo: title })
        .then((res) => {
          setSuccessMsg(res.data.message);
          dispatch(updateItem({ id: todo.id, todo: title }));
          setIsLoading(false);
          setError('')
        })
        .catch((err) => {
          setError("Failed to update:-");
          setIsLoading(false);
        });
    } else {
      setIsLoading(true);
      //create new todo
      await addTodo({ todo: title }).then((res) => {
        refetch();
        setIsLoading(false);
        setError('')
        setSuccessMsg(res.data.message);
      });
    }
  };

  return (
    <div className="mt-4 mb-12 block">
      {error && <p className="mb-4 text-md text-red-600">{error}</p>}
      {successMsg && (
        <p className="mb-4 text-md text-emerald-600">{successMsg}</p>
      )}
      <form onSubmit={handleSubmit}>
        <div className="w-full mb-4">
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className={`inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-white 
              ${
                isLoading
                  ? "bg-indigo-500 hover:bg-indigo-400 cursor-not-allowed"
                  : "bg-indigo-700 hover:bg-indigo-600 cursor-pointer"
              } transition ease-in-out duration-150 mr-4`}
            disabled={isLoading}
          >
            {isLoading && (
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            )}
            {isLoading
              ? "Processing..."
              : isEditing
              ? "Update Todo"
              : "Add Todo"}
          </button>
          {isEditing && (
            <button
              onClick={newTodo}
              className="inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md bg-teal-400 text-white"
            >
              New Todo
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default AddTodo;
