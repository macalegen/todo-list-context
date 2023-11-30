import { useContext } from "react";
import styles from "../app.module.css";
import { TodoContext } from "./TodoContext";

export const TodoList = () => {
  const {
    todos,
    isLoading,
    searchPhrase,
    setSearchPhrase,
    sorted,
    setSorted,
    editedTodoTitle,
    setEditedTodoTitle,
    editingTodoId,
    setEditingTodoId,
    requestUpdateTodo,
    requestDeleteTodo,
    isUpdating,
    isDeleting,
  } = useContext(TodoContext);

  const handleSearchChange = (e) => {
    setSearchPhrase(e.target.value);
  };

  const handleSortToggle = () => {
    setSorted(!sorted);
  };

  const handleEditTodo = (id) => {
    setEditingTodoId(id);
    const todoToEdit = todos.find((todo) => todo.id === id);
    setEditedTodoTitle(todoToEdit.title);
  };

  const handleUpdateTodo = (id, updatedTitle) => {
    requestUpdateTodo(id, updatedTitle);
    setEditingTodoId(null);
  };

  const handleDeleteTodo = (id) => {
    requestDeleteTodo(id);
  };

  let sortedTodos = [...todos];

  if (sorted) {
    sortedTodos = sortedTodos.sort((a, b) => a.title.localeCompare(b.title));
  }

  const filteredTodos = sortedTodos.filter((todo) => todo.title);

  return (
    <div className={styles.app}>
      <div>
        <input
          type="text"
          placeholder="Search in todos"
          value={searchPhrase}
          onChange={handleSearchChange}
        />
        <button onClick={handleSortToggle}>
          {sorted ? "Sorting off" : "A - Z Sorting"}
        </button>
      </div>
      <div>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          filteredTodos.map(({ id, title }) => (
            <div key={id}>
              {editingTodoId === id ? (
                <div>
                  <input
                    type="text"
                    value={editedTodoTitle}
                    onChange={(e) => setEditedTodoTitle(e.target.value)}
                  />
                  <button
                    disabled={isUpdating}
                    onClick={() => handleUpdateTodo(id, editedTodoTitle)}
                  >
                    Save
                  </button>
                </div>
              ) : (
                <div>
                  {title}
                  <button onClick={() => handleEditTodo(id)}>Edit</button>
                  <button
                    disabled={isDeleting}
                    onClick={() => handleDeleteTodo(id)}
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};
