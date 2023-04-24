import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addTask } from './store';

const TaskForm = ({ addTask }) => {
  const [title, setTitle] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    addTask({ id: Date.now(), title });
    setTitle('');
  };

  return (
    <form onSubmit={handleSubmit}>
    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
    <button type="submit">Add Task</button>
    </form>
    );
    };