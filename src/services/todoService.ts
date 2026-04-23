import apiClient from "./apiClient";
import { Todo, TodoInput } from "@src/types/todo";

export const getAllTodos = async (): Promise<Todo[]> => {
  const response = await apiClient.get("/todos");
  return response.data;
};

export const createTodo = async (todo: TodoInput): Promise<Todo> => {
  const response = await apiClient.post("/todos", todo);
  return response.data;
};

export const updateTodo = async (id: number, todo: Partial<Todo>): Promise<Todo> => {
  const response = await apiClient.put(`/todos/${id}`, todo);
  return response.data;
};

export const deleteTodo = async (id: number): Promise<void> => {
  await apiClient.delete(`/todos/${id}`);
};
