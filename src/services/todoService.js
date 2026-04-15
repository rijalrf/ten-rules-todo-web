import api from "./api/api";

export const getAllTodos = async () => {
  try {
    const response = await api.get("/todos");
    return response.data;
  } catch (error) {
    // Logika teknis: log ke console atau sistem monitoring
    console.error(
      "Service Error (getAllTodos):",
      error.response?.data || error.message,
    );
    throw error; // Lempar error ke UI layer
  }
};

export const createTodo = async (todo) => {
  try {
    const response = await api.post("/todos", todo);
    return response.data;
  } catch (error) {
    // Logika teknis: log ke console atau sistem monitoring
    console.error(
      "Service Error (createTodo):",
      error.response?.data || error.message,
    );
    throw error; // Lempar error ke UI layer
  }
};

export const updateTodo = async (id, todo) => {
  try {
    const response = await api.put(`/todos/${id}`, todo);
    return response.data;
  } catch (error) {
    // Logika teknis: log ke console atau sistem monitoring
    console.error(
      "Service Error (updateTodo):",
      error.response?.data || error.message,
    );
    throw error; // Lempar error ke UI layer
  }
};

export const deleteTodo = async (id) => {
  try {
    await api.delete(`/todos/${id}`);
  } catch (error) {
    // Logika teknis: log ke console atau sistem monitoring
    console.error(
      "Service Error (deleteTodo):",
      error.response?.data || error.message,
    );
    throw error; // Lempar error ke UI layer
  }
};
