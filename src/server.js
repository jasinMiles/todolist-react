import React, { useState, useEffect } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function TodoList() { 
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [updateTodo, setUpdateTodo] = useState("");
 
  
  
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

const cancelUpdate = async () => {
  try {
    // Re-fetch the current task data from the API
    const response = await axios.get("https://todo-app-nyce.onrender.com/api/v1/Todo/${id}");
    const currentTask = response.data;

    // Update the state variable with the current task data
    setUpdateTodo(currentTask);

    // Hide the editing form by setting the updateData state variable to null or an empty object, depending on your implementation
    // setUpdateData(null);
    // or
    // setUpdateData({});
  } catch (error) {
    console.error(error);
  }
};


const changeTask = (e) => {
  // Create a new task object with the updated title
  const updatedTask = {
    ...updateTodo, // Keep the existing properties of the task
    id: e.target.value // Update the title property with the new value
  };

  // Update the state variable with the new task object
  setUpdateTodo(updatedTask);

  // Send a PUT request to update the task data in the API
  axios.put("https://todo-app-nyce.onrender.com/api/v1/Todo/${id}", updatedTask)
    .then(response => {
      console.log('Task updated successfully:', response.data);
    })
    .catch(error => {
      console.error('Error updating task:', error);
    });
};

const updateTask = async () => {
  try {
    // Send a PUT request to update the task data in the API
    const response = await axios.put('https://todo-app-nyce.onrender.com/api/v1/Todo/${id}', updateTodo);
    const updatedTask = response.data;

    // Update the task data in the state variable by mapping over the existing task list and replacing the updated task data for the matching task ID
    const updatedTaskList = todos.map(task => {
      if (todos.id === updatedTask.id) {
        return updatedTask;
      } else {
        return task;
      }
    });

    // Update the state variables to reflect the updated task data and close the editing form
    setTodos(updatedTaskList);
    setUpdateTodo(null);
  } catch (error) {
    console.error(error);
  }
};

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
      <h2> Server | To-Do List</h2>
      <br></br>
      <div className='row'>
    <div className='col'>
      <input
        value={updateTodo && updateTodo.id}
        onChange={(e) => changeTask(e)}
        className='form-control form-control-lg'
      />
    </div>
    <div className='col-auto'>
      <button onClick={updateTask} className='btn btn-lg btn-success mr-2'>
        Update
      </button>
      <button onClick={cancelUpdate} className='btn btn-lg btn-warning'>
        Cancel
      </button>
    </div>
  </div>


      <div></div>
      <div className='form-style'>
        <div className='col'>
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        className='.form-control form-control-lg'
        placeholder="Enter your todo"
      />
      </div>
      
      <div className='col-auto'>
      <button
       onClick={addTodo}
       className='btn btn-lg btn-primary w-40'
       id="submit-button-local"
      >Submit</button>
      </div>
      </div>
      <div className='line-break'></div>
          <br/>
      <br></br>
      <div className='mx-auto col-10 col-md-8 col-lg-6'></div>
      <div className="form-style"></div>
<ul>
        { !!todos.length && todos.map((todo) =>  (
          
          <li key={todo.id}>
            <div className="mx-auto col-10 ">
                <br></br>
            {todo && todo.todo}{" "}
            </div>
            <span className="mx-auto col-10 ">
          
                      <div>
                      {todos.status ? null : (
  <button
    title="Edit"
    onClick={() => {
      axios.put("https://todo-app-nyce.onrender.com/api/v1/Todo/${id}", {
        id: todo.id,
        status: todo.status ? true : false,
      })
      .then(response => {
        // handle success response
        console.log('Task updated successfully:', response.data);
      })
      .catch(error => {
        // handle error response
        console.error('Error updating task:', error);
      });
    }}
    className='btn btn-lg btn-success'
    id='btn-four'
  > Edit
  </button>
)}
      </div>  
                     
                  &nbsp;
                  &nbsp;
                  &nbsp;
                  &nbsp;
                  
            <button onClick={() => deleteTodo(todo.id)}
            className='btn btn-lg btn-danger'
            id="btn-five"
            >Delete</button>
            </span>
            
            
          </li>
          
          
        ))}
      </ul>
      
    </div>
  );
}


export default TodoList;
