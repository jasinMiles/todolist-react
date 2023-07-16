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
            className="form-control form-control-lg"
          />
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            id='submit-button'
          >
            
            {isLoading
              ? "Processing..."
              : isEditing
              ? "Update Todo"
              : "Submit"}
          </button>
          &nbsp;
                  &nbsp;
                  &nbsp;
                  &nbsp;
          {isEditing && (
            <button
              onClick={newTodo}
              id='cancel-button'
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default AddTodo;
