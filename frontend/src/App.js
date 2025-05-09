import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  useEffect(() => {
    axios.get(`${API_URL}/api/tasks`)
      .then((res) => setTasks(res.data))
      .catch((err) => {
        console.error('Error fetching tasks:', err.message);
        if (err.response) {
          console.error('Response data:', err.response.data);
          console.error('Response status:', err.response.status);
        } else if (err.request) {
          console.error('No response received:', err.request);
        } else {
          console.error('Error setting up request:', err.message);
        }
      });
  }, []);

  const addTask = () => {
    axios.post(`${API_URL}/api/tasks`, { text: newTask })
      .then((res) => {
        setTasks([...tasks, res.data]);
        setNewTask('');
      })
      .catch((err) => console.error('Error adding task:', err.message));
  };

  const deleteTask = (id) => {
    axios.delete(`${API_URL}/api/tasks/${id}`)
      .then(() => setTasks(tasks.filter((task) => task._id !== id)))
      .catch((err) => console.error('Error deleting task:', err.message));
  };

  return (
    <div className="App">
      <h1>To-Do List</h1>
      <input value={newTask} onChange={(e) => setNewTask(e.target.value)} placeholder="Add a task" />
      <button onClick={addTask}>Add</button>
      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            {task.text} <button onClick={() => deleteTask(task._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
