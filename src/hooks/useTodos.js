import { useState, useEffect } from 'react';
import { getAllTodos, createTodo, updateTodo, deleteTodo } from '../services/todoService';

export const useTodos = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await getAllTodos();
      setTodos(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (title, description) => {
    const newTodo = await createTodo({ title, description, is_completed: false });
    setTodos([...todos, newTodo]);
  };

  const handleToggle = async (todo) => {
    const result = await updateTodo(todo.id, { ...todo, is_completed: !todo.is_completed });
    setTodos(todos.map(t => t.id === todo.id ? result : t));
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Yakin hapus?")) return;
    await deleteTodo(id);
    setTodos(todos.filter(t => t.id !== id));
  };

  // Kita return semua yang dibutuhin UI
  return { todos, loading, handleAdd, handleToggle, handleDelete };
};