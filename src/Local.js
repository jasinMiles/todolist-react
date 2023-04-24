import React, {useState} from 'react';
//import { Connect } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
//import { FontAwesomeIcon, fontAwesomeIcon } from '@fortawesome/react-fontawesome'
//import {
//  faCircleCheck, faPen, faTrashCan
//} from '@fortawesome/free-solid-svg-icons'
import './App.css';


function Client() {

  // Tasks (ToDo List) state
  const [toDo, setToDo] = useState([
   //{id: 1, title: "Task 1", status: false},
   //{id: 2, title: "Task 2", status: false}
  ]);

  // Temp State
  const [newTask, setNewTask] = useState('');
  const [updateData, setUpdateData] = useState('');

  // Add task
   const addTask = () => {
    if(newTask) {
      let num = toDo.length + 1;
      let newEntry = { id: num, title: newTask, status: false}
      setToDo([...toDo, newEntry])
      setNewTask('');
    }
   }

   // Delete task
   const deleteTask = (id) => {
    let newTasks = toDo.filter( task => task.id !== id)
    setToDo(newTasks);
   }

   // mark task as done or completed
  // const markDone = (id) => {
    //let newTask = toDo.map( task => {
      //if( task.id === id ) {
        //return ({ ...task, status: !task.status })
      //}
      //return task;
    //})
    //setToDo(newTask);
   //}

   // cancel update
   const cancelUpdate = () => {
    setUpdateData('');
   }

   // change task for update
   const changeTask = (e) => {
    let newEntry = {
      id: updateData.id,
      title: e.target.value,
      status: updateData.status ? true : false
    }
    setUpdateData(newEntry);
   }

   // update task
   const updateTask = () => {
    let filterRecords = [...toDo].filter( task => task.id !== updateData.id );
    let updatedObject = [...filterRecords, updateData]
    setToDo(updatedObject);
    setUpdateData('');
   }


  return (
    <div className="Container App">

      
      <h2> LOCAL | TO DO LIST</h2>
      <br /><br />

      {/* Update Task */}
      {updateData && updateData ? (
        <>
        <div className='row'>
        <div className='col'>
          <input
          value={ updateData && updateData.title}
          onChange={ (e) => changeTask(e)}
          className='form-control form-control-lg'
          />
        </div>
        <div className='col-auto'>
          <button
          onClick={updateTask}
          className='btn btn-lg btn-success mr-20'
          >Update</button>
          <button
          onClick={cancelUpdate}
          className='btn btn-lg btn-warning'
          >cancel</button>
        </div>
      </div>
      <br />

        </>
      ) : (
        <>
        { /* Add Task */}
        <div className='form-style'>
        <div className='col'>
          <input
          value={newTask}
          onChange={  (e) => setNewTask(e.target.value)}
          className='form-control form-control-lg'
          placeholder='Enter your todo'
          />
        </div>
      
      <div className='col-auto'>
          <button
          onClick={addTask}
          className='btn btn-lg btn-primary w-40'
          id='submit-button'
          >Submit</button>
        </div>
        </div>

          <div className='line-break'></div>
          <br/>
        </>
      )
      
}


             {/* Display ToDos */}

    
    {toDo && toDo
    .sort((a, b) => a.id > b.id ? 1 : -1)
    .map(  (task, index) => {
      return(
        <React.Fragment key={task.id}>

          <div className="col taskBg">

            <div className={task.status ? 'done' : ''}>
          <span className="taskNumber">{index + 1}</span>
          <span className="taskText">{task.title}
          </span>
          </div>
          <div className='iconsWrap'>
            <span title='Completed / Not Completed'
           // onClick={ (e) => markDone(task.id) }
            >
           {/*<FontAwesomeIcon icon={faCircleCheck} />*/}
            </span>
            {task.status ? null : (
                  <button title="Edit"
                    onClick={ () => setUpdateData({ 
                      id: task.id, 
                      title: task.title, 
                      status: task.status ? true : false
                    }) }
                    className='btn btn-lg btn-success'
                    id='btn-four'
                  > Edit
                  </button>
                )}
                &nbsp;
                &nbsp;
            <button title='Delete'
            onClick={() => deleteTask(task.id)}
            className='btn btn-lg btn-danger'
            id='btn-five'
            >
              Delete
            </button>
          </div>
          </div>
        </React.Fragment>
      )
    })
    }
    </div>
  );
}

export default Client;