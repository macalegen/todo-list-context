import { createContext, useState, useEffect } from "react";

export const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
  const refreshTodos = () => setRefreshTodosFlag(!refreshTodosFlag);
  const [refreshTodosFlag, setRefreshTodosFlag] = useState(false);
  const [searchPhrase, setSearchPhrase] = useState("");
  const [sorted, setSorted] = useState(false);
  const [newTodoTitle, setNewTodoTitle] = useState("");
  const [editingTodoId, setEditingTodoId] = useState(null);
  const [editedTodoTitle, setEditedTodoTitle] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    fetch("http://localhost:3001/todos")
      .then((loadedData) => loadedData.json())
      .then((loadedTodos) => {
        setTodos(loadedTodos);
      })
      .finally(() => setIsLoading(false));
  }, [refreshTodosFlag]);

  const requestAddTodo = (title) => {
    setIsCreating(true);

    fetch("http://localhost:3001/todos", {
      method: "POST",
      headers: { "Content-type": "application/json;charset=utf-8" },
      body: JSON.stringify({
        title: title,
      }),
    })
      .then((rawResponce) => rawResponce.json())
      .then((response) => {
        console.log("Todo added, server pesponse:", response);
        refreshTodos();
      })
      .finally(() => setIsCreating(false));
  };

  const requestDeleteTodo = (id) => {
    setIsDeleting(true);

    fetch(`http://localhost:3001/todos/${id}`, {
      method: "DELETE",
    })
      .then((rawResponce) => rawResponce.json())
      .then((response) => {
        console.log("Todo deleted, server pesponse:", response);
        refreshTodos();
      })
      .finally(() => setIsDeleting(false));
  };

  const requestUpdateTodo = (id, updatedTitle) => {
    setIsUpdating(true);

    fetch(`http://localhost:3001/todos/${id}`, {
      method: "PUT",
      headers: { "Content-type": "application/json;charset=utf-8" },
      body: JSON.stringify({
        title: updatedTitle,
      }),
    })
      .then((rawResponce) => rawResponce.json())
      .then((response) => {
        console.log("Todo updated, server pesponse:", response);
        refreshTodos();
      })
      .finally(() => setIsUpdating(false));
  };

  return (
    <TodoContext.Provider
      value={{
        todos,
        isLoading,
        isCreating,
        requestAddTodo,
        isDeleting,
        requestDeleteTodo,
        isUpdating,
        requestUpdateTodo,
        searchPhrase,
        setSearchPhrase,
        sorted,
        setSorted,
        editedTodoTitle,
        setEditedTodoTitle,
        editingTodoId,
        setEditingTodoId,
        newTodoTitle,
        setNewTodoTitle,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
