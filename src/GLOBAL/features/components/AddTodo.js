import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addItem, setTodo, updateItem } from "../slices/todolistSlice";
import { useAddTodoMutation, useUpdateTodoMutation } from "../slices/todolistApi";

const AddTodo = ({ refetch }) => {
  // State variables to manage form inputs and feedback messages
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [title, setTitle] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Redux: Accessing data from the store
  const { todo, todos } = useSelector((state) => state.todolist);
  const [addTodo] = useAddTodoMutation();
  const [updateTodo] = useUpdateTodoMutation();
  const dispatch = useDispatch();

  // Function to clear form data and reset state
  function newTodo() {
    setIsEditing(false);
    setError("");
    setTitle("");
    setSuccessMsg("");
    dispatch(setTodo(null));
  }

  // When the state variable 'todo' changes, populate form and set editing to true
  useEffect(() => {
    if (todo) {
      setIsEditing(true);
      setTitle(todo.todo);
    } else {
      setIsEditing(false);
    }
  }, [todo]);

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Form validations
    if (title === "") {
      setError("The title field is required");
      return;
    } else if (title.length < 5) {
      setError("Characters in the title field must be more than 5");
      return;
    }

    // If editing an existing todo
    if (isEditing) {
      setIsLoading(true);
      // Update the todo using the API call
      updateTodo({ id: todo.id, todo: title })
        .then((res) => {
          setSuccessMsg(res.data.message);
          // Update the store with the new todo data
          dispatch(updateItem({ id: todo.id, todo: title }));
          setIsLoading(false);
          setError("");
        })
        .catch((err) => {
          setError("Failed to update:-");
          setIsLoading(false);
        });
    } else {
      // If creating a new todo
      setIsLoading(true);
      // Create a new todo using the API call
      await addTodo({ todo: title }).then((res) => {
        // Refetch the data from the server to update the store
        refetch();
        setIsLoading(false);
        setError("");
        setSuccessMsg(res.data.message);
      });
    }
  };

  return (
    <div className="mt-4 mb-12 block">
      {error && <p className="mb-4 text-md text-red-600">{error}</p>}
      {successMsg && <p className="mb-4 text-md text-emerald-600">{successMsg}</p>}
      <form onSubmit={handleSubmit}>
        <div className="w-full mb-4">
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="form-control form-control-lg"
          />
        </div>
        <div className="flex justify-center">
          <button type="submit" id="submit-button">
            {/* Conditional rendering of the submit button text */}
            {isLoading
              ? "Processing..."
              : isEditing
              ? "Update Todo"
              : "Submit"}
          </button>
          &nbsp;&nbsp;&nbsp;&nbsp;
          {/* Render the cancel button only when editing an existing todo */}
          {isEditing && (
            <button onClick={newTodo} id="cancel-button">
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default AddTodo;
