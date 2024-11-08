
import React from 'react';
import { useDispatch } from 'react-redux';
import { toggleComplete, deleteTask } from '../features/taskSlice';
import { Button, Form, Table, Row, Col } from 'react-bootstrap'

const Task = ({ task }) => {
  const dispatch = useDispatch();

  return (
    <tr>
      <td>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => dispatch(toggleComplete(task.id))}
      />
      </td>
      
      <td style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>{task.title}</td>

      <td className='text-centre'>
      <Button variant='danger' onClick={() => dispatch(deleteTask(task.id))}>Delete</Button>
      </td>
      
    
        
    </tr>
   
  );
};

export default Task;
