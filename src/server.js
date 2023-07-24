import React, { useState, useEffect } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function TodoList() { 
  // State variables
  const [todos, setTodos] = useState([]);  // Array to store todos
  const [todoInput, setTodoInput] = useState(""); // Combined input for newTodo and updateTodo
  const [editMode, setEditMode] = useState(false); // State to track if we are in edit mode
  const [editTodoId, setEditTodoId] = useState(null); // ID of the todo being edited
  const [isUpdating, setIsUpdating] = useState(false); // State variable to track whether editing or adding new todo

  // Fetch todos from the server when the component mounts
  useEffect(() => {
    fetchTodos();
  }, []);

  // Function to fetch todos from the server
  async function fetchTodos() {
    try {
      const response = await axios.get("https://todo-app-nyce.onrender.com/api/v1/Todo");
      setTodos(response.data.data);
    } catch (error) {
      console.error(error);
    }
  }

  // Function to add or update a todo on the server
  async function addOrUpdateTodo() {
    try {
      if (isUpdating) {
        // Update existing todo if in edit mode
        await axios.put(`https://todo-app-nyce.onrender.com/api/v1/Todo/${editTodoId}`, {
          id: editTodoId,
          todo: todoInput,
        });
      } else {
        // Add new todo if not in edit mode
        await axios.post("https://todo-app-nyce.onrender.com/api/v1/Todo", { todo: todoInput });
      }

      // Reset states and fetch todos again after adding/updating
      setTodoInput("");
      setEditTodoId(null);
      setEditMode(false);
      setIsUpdating(false);
      fetchTodos();
    } catch (error) {
      console.error(error);
    }
  }

  // Function to delete a todo from the server
  async function deleteTodo(id) {
    try {
      await axios.delete(`https://todo-app-nyce.onrender.com/api/v1/Todo/${id}`);
      // Filter out the deleted todo from the todos array
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="Container App">
      {/* Header */}
      <h2> Server | To-Do List</h2>
      <br></br>

      {/* Form for adding/updating todos */}
      <div className='form-style'>
        <div className='col'>
          {/* Input field for entering todo */}
          <input
            type="text"
            value={todoInput}
            onChange={(e) => setTodoInput(e.target.value)}
            className='.form-control form-control-lg'
            placeholder={isUpdating ? "Enter updated todo" : "Enter your todo"}
          />
        </div>

        <div className='col-auto'>
          {/* Submit or Update and Cancel buttons */}
          {editMode ? (
            <>
              <button
                onClick={addOrUpdateTodo}
                className='btn btn-lg btn-success w-40'
                id="submit-button-local"
              >
                {isUpdating ? "Update" : "Submit"}
              </button>
              <button
                onClick={() => {
                  // Cancel edit mode and reset input fields
                  setTodoInput("");
                  setEditTodoId(null);
                  setEditMode(false);
                  setIsUpdating(false);
                }}
                className='btn btn-lg btn-secondary w-40'
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsUpdating(false)}
              className='btn btn-lg btn-primary w-40'
              id="submit-button-local"
            >
              Submit
            </button>
          )}
        </div>
      </div>
      <div className='line-break'></div>
      <br />
      <br></br>
      <div className='mx-auto col-10 col-md-8 col-lg-6'></div>
      <div className="form-style"></div>

      {/* Display the list of todos */}
      <ul>
        {todos.length > 0 && todos.map((todo) =>  (
          <li key={todo.id}>
            <div className="mx-auto col-10 ">
              <br></br>
              <br />
              {/* Show input field for editing if in edit mode */}
              {editMode && editTodoId === todo.id ? (
                <input
                  type="text"
                  value={todoInput}
                  onChange={(e) => setTodoInput(e.target.value)}
                  className='.form-control form-control-lg'
                  placeholder="Enter updated todo"
                />
              ) : (
                // Otherwise, show the todo text
                todo.todo
              )}
            </div>
            {/* Buttons for editing and deleting todos */}
            <span className="mx-auto col-10 ">
              <div>
                <button
                  title="Edit"
                  onClick={() => {
                    // Enter edit mode and set input field values
                    setTodoInput(todo.todo);
                    setEditTodoId(todo.id);
                    setEditMode(true);
                    setIsUpdating(true);
                  }}
                  className='btn btn-lg btn-success'
                  id='btn-four'
                >
                  Edit
                </button>
              </div>
              &nbsp;
              &nbsp;
              &nbsp;
              &nbsp;
              <button
                onClick={() => deleteTodo(todo.id)}
                className='btn btn-lg btn-danger'
                id="btn-five"
              >
                Delete
              </button>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
