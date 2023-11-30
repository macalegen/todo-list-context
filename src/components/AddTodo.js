import { useContext } from "react";
import styles from "../app.module.css";
import { TodoContext } from "./TodoContext";

export const AddTodo = () => {
  const { isCreating, requestAddTodo, newTodoTitle, setNewTodoTitle } =
    useContext(TodoContext);

  const handleAddTodo = () => {
    if (newTodoTitle) {
      requestAddTodo(newTodoTitle);
      setNewTodoTitle("");
    }
  };

  return (
    <div className={styles.app}>
      <input
        type="text"
        placeholder="Add a new todo"
        value={newTodoTitle}
        onChange={(e) => setNewTodoTitle(e.target.value)}
      />
      <button disabled={isCreating} onClick={handleAddTodo}>
        Add Todo
      </button>
    </div>
  );
};
