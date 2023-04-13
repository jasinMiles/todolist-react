import React, { useState, useEffect } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  
  useEffect(() => {
    fetchTodos();
  }, []);

  async function fetchTodos() {
    try {
      const response = await axios.get("https://todo-app-nyce.onrender.com/api/v1/Todo");
      setTodos(response.data.data);
    } catch (error) {
      console.error(error);
    }
  }

  async function addTodo() {
    try {
      const response = await axios.post("https://todo-app-nyce.onrender.com/api/v1/Todo", { todo: newTodo });
      setTodos([...todos, response.data.data]);
      setNewTodo("");
    } catch (error) {
      console.error(error);
    }
  }

  async function deleteTodo(id) {
    try {
      await axios.delete(`https://todo-app-nyce.onrender.com/api/v1/Todo/${id}`);
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error(error);
    }
  }
  
        console.log(todos); 
  return (
    
    <div>
      <h1>To-Do List</h1>
      
      <div className='row'>
        <div className='col'>
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        className='form-control form-control-lg'
      />
      </div>
      </div>

      <br />

      <button
       onClick={addTodo}
       className='btn btn-lg btn-primary w-50'
      >Submit</button>
      <br></br>
<ul>
        { !!todos.length && todos.map((todo) =>  (
          <li key={todo.id}>
            {todo && todo.todo}{" "}
            <button onClick={() => deleteTodo(todo.id)}
            className='btn btn-lg btn-danger'
            >Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
