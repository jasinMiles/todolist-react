import React from 'react';
import { connect } from 'react-redux';
import { deleteTask } from './store';

const TaskList = ({ tasks, deleteTask }) => (
  <ul>
    {tasks.map((task) => (
      <li key={task.id}>
        {task.title}
        <button onClick={() => deleteTask(task.id)}>Delete</button>
      </li>
    ))}
  </ul>
);

const mapStateToProps = (state) => ({
  tasks: state.tasks,
});

const mapDispatchToProps = { deleteTask };

export default connect(mapStateToProps, mapDispatchToProps)(TaskList);