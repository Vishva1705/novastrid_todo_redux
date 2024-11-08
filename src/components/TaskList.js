
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks, addTask } from '../features/taskSlice';
import Task from './Task';
import { Button, Form, Table, Row, Col } from 'react-bootstrap'

const TaskList = () => {
    const [newTask, setNewTask] = useState('');
    const [filter, setFilter] = useState('all');

    const dispatch = useDispatch();
    const tasks = useSelector((state) => state.tasks.tasks);

    useEffect(() => {
        dispatch(fetchTasks());
    }, [dispatch]);

    const filteredTasks = tasks.filter((task) => {
        if (filter === 'completed') return task.completed;
        if (filter === 'pending') return !task.completed;
        return true;
    });

    const handleAddTask = () => {
        if (newTask.trim()) {
            dispatch(addTask(newTask));
            setNewTask('');
        }
    };

    return (
        <div className='container mt-5'>
            <h1 className='text-center mb-4'>Task Manager</h1>

            <Row className='mb-4'>

                <Form.Group className='d-flex'>
                    <Form.Control type='text'
                        value={newTask}
                        onChange={(e) => setNewTask(e.target.value)}
                        placeholder="Add a new task" />
                </Form.Group>

                <Button size='sm' variant='primary' className='ml-2' onClick={handleAddTask}>Add Task</Button>
            </Row>

            <Row className='mb-3'>
                <Col xs={12} className='text-center'>
                    <Button variant='outline-primary' className='mx-2 my-1' onClick={() => setFilter('all')}>All</Button>
                    <Button variant='outline-success' className='mx-2 my-1' onClick={() => setFilter('completed')}>Completed</Button>
                    <Button variant='outline-warning'className='mx-2 my-1' onClick={() => setFilter('pending')}>Pending</Button>

                </Col>

            </Row>

            

            <Table striped border hover responsive>
                <thead>
                    <tr>
                        <th>Status</th>
                        <th>Task</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                {filteredTasks.map((task) => (
                    <Task key={task.id} task={task} />
                ))}
                </tbody>
            </Table>


        </div>
    );
};

export default TaskList;
