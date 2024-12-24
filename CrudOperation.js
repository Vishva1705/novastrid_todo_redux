import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function CrudApp() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [editingTodo, setEditingTodo] = useState(null);
  const [updatedTodo, setUpdatedTodo] = useState('');

  // Fetch all todos
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/todos?_limit=10');
        setTodos(response.data);
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    };

    fetchTodos();
  }, []);

  // Create a new todo
  const createTodo = async () => {
    if (!newTodo.trim()) return;

    try {
      const response = await axios.post('https://jsonplaceholder.typicode.com/todos', {
        title: newTodo,
        completed: false,
      });
      setTodos([response.data, ...todos]);
      setNewTodo('');
    } catch (error) {
      console.error('Error creating todo:', error);
    }
  };

  // Delete a todo
  const deleteTodo = async (id) => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  // Update a todo
  const updateTodo = async () => {
    if (!updatedTodo.trim()) return;

    try {
      const response = await axios.put(`https://jsonplaceholder.typicode.com/todos/${editingTodo.id}`, {
        ...editingTodo,
        title: updatedTodo,
      });
      setTodos(
        todos.map((todo) => (todo.id === editingTodo.id ? response.data : todo))
      );
      setEditingTodo(null);
      setUpdatedTodo('');
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>CRUD App with JSONPlaceholder</h1>

      {/* Create New Todo */}
      <div>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new todo"
        />
        <button onClick={createTodo}>Add Todo</button>
      </div>

      <hr />

      {/* Display Todos */}
      <ul>
        {todos.map((todo) => (
          <li key={todo.id} style={{ marginBottom: '10px' }}>
            {editingTodo?.id === todo.id ? (
              <>
                <input
                  type="text"
                  value={updatedTodo}
                  onChange={(e) => setUpdatedTodo(e.target.value)}
                />
                <button onClick={updateTodo}>Save</button>
                <button onClick={() => setEditingTodo(null)}>Cancel</button>
              </>
            ) : (
              <>
                <span>{todo.title}</span>
                <button onClick={() => setEditingTodo(todo)}>Edit</button>
                <button onClick={() => deleteTodo(todo.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
