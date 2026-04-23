import api from "./api/api";
import { Todo, TodoInput } from "../types/todo";

export const getAllTodos = async (): Promise<Todo[]> => {
  try {
    const response = await api.get("/todos");
    return response.data;
  } catch (error: any) {
    console.error(
      "Service Error (getAllTodos):",
      error.response?.data || error.message,
    );
    throw error;
  }
};

export const createTodo = async (todo: TodoInput): Promise<Todo> => {
  try {
    const response = await api.post("/todos", todo);
    return response.data;
  } catch (error: any) {
    console.error(
      "Service Error (createTodo):",
      error.response?.data || error.message,
    );
    throw error;
  }
};

export const updateTodo = async (id: number, todo: Partial<Todo>): Promise<Todo> => {
  try {
    const response = await api.put(`/todos/${id}`, todo);
    return response.data;
  } catch (error: any) {
    console.error(
      "Service Error (updateTodo):",
      error.response?.data || error.message,
    );
    throw error;
  }
};

export const deleteTodo = async (id: number): Promise<void> => {
  try {
    await api.delete(`/todos/${id}`);
  } catch (error: any) {
    console.error(
      "Service Error (deleteTodo):",
      error.response?.data || error.message,
    );
    throw error;
  }
};
