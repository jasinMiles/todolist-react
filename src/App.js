import React, { useState, useEffect } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [updateTodo, setUpdateTodo] = useState("")
  
  
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
      setNewTodo("");
      fetchTodos()
    } catch (error) {
      console.error(error);
    }
  }
  async function EditTodo(id) {
    axios.put(`https://todo-app-nyce.onrender.com/api/v1/Todo/${id}`, { todo: updateTodo })
        setUpdateTodo("")
        fetchTodos()
        .then((res) => console.log(res))
      .catch((err) => console.log(err));
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
    
    <div className="Container App">
      <h1>To-Do List</h1>
      
      <div className='row'>
        <div className='mx-auto col-10 col-md-8 col-lg-6'>
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        className='.form-control form-control-lg w-50'
        placeholder="Enter your todo"
      />
      </div>
      </div>

      <br />
      <div className='mx-auto col-10 col-md-8 col-lg-6'>
      <button
       onClick={addTodo}
       className='btn btn-lg btn-primary w-50'
      >Submit</button>
      </div>
      <br></br>
<ul>
        { !!todos.length && todos.map((todo) =>  (
          
          <li key={todo.id}>
            {todo && todo.todo}{" "}
            <div className='mx-auto col-10 col-md-8 col-lg-6'>
          <button
                       title="Edit"
                       className="btn btn-lg btn-success"
                       onClick={() =>
                         EditTodo(todo.id)
                       }
                       
                     >
                       Edit
                     </button>
                     
                     
                  &nbsp;
                  &nbsp;
                  &nbsp;
                  &nbsp;
                  
            <button onClick={() => deleteTodo(todo.id)}
            className='btn btn-lg btn-danger'
            >Delete</button>
            </div>
            
          </li>
          
          
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
