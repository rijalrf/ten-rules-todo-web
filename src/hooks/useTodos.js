import { useState, useEffect } from "react";
import {
  getAllTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} from "../services/todoService";

export const useTodos = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getAllTodos();
      setTodos(data);
    } catch (err) {
      setError(err.message || "Gagal mengambil daftar tugas");
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (todo) => {
    try {
      setError(null);
      const result = await createTodo(todo);
      setTodos([...todos, result]);
    } catch (err) {
      setError(err.message || "Gagal menambah tugas");
    }
  };

  const handleToggle = async (todo) => {
    try {
      setError(null);
      const result = await updateTodo(todo.id, {
        ...todo,
        is_completed: !todo.is_completed,
      });
      setTodos(todos.map((t) => (t.id === todo.id ? result : t)));
    } catch (err) {
      setError(err.message || "Gagal memperbarui status");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Yakin hapus?")) return;
    try {
      setError(null);
      await deleteTodo(id);
      setTodos(todos.filter((t) => t.id !== id));
    } catch (err) {
      setError(err.message || "Gagal menghapus tugas");
    }
  };

  return { todos, loading, error, handleAdd, handleToggle, handleDelete };
};
