import styles from "./app.module.css";
import { AddTodo } from "./components/AddTodo";
import { TodoList } from "./components/TodoList";
import { TodoProvider } from "./components/TodoContext";

export const App = () => {
  return (
    <div className={styles.app}>
      <TodoProvider>
        <h2>Todo List</h2>
        <AddTodo />
        <TodoList />
      </TodoProvider>
    </div>
  );
};
