import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAllTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} from "@src/services/todoService";
import { Todo, TodoInput } from "@src/types/todo";

export const useTodos = () => {
  const queryClient = useQueryClient();

  // 1. Fetching Data dengan useQuery
  const { 
    data: todos = [], 
    isLoading: loading, 
    error 
  } = useQuery<Todo[]>({
    queryKey: ["todos"],
    queryFn: getAllTodos,
  });

  // 2. Mutations (Write Operations)
  const addMutation = useMutation({
    mutationFn: (newTodo: TodoInput) => createTodo(newTodo),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const toggleMutation = useMutation({
    mutationFn: ({ id, todo }: { id: number; todo: Partial<Todo> }) => updateTodo(id, todo),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => deleteTodo(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  // Handlers untuk UI
  const handleAdd = async (todo: TodoInput) => {
    await addMutation.mutateAsync(todo);
  };

  const handleToggle = async (todo: Todo) => {
    await toggleMutation.mutateAsync({
      id: todo.id,
      todo: { is_completed: !todo.is_completed },
    });
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Yakin hapus?")) return;
    await deleteMutation.mutateAsync(id);
  };

  return { 
    todos, 
    loading, 
    error: error ? (error as any).message : null, 
    handleAdd, 
    handleToggle, 
    handleDelete 
  };
};
