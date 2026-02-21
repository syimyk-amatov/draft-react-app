import { useCallback, useRef, useState } from "react";
import { Task } from "./Task";
import { TodoItem } from "./TodoItem";
import "./TodoList.scss";

export const TodoList = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const idCounter = useRef(0);

  const handleDelete = useCallback((taskToDelete: Task) => {
    setTasks((prevTasks) => prevTasks.filter((item) => item.id !== taskToDelete.id));
  }, []);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (inputRef.current && inputRef.current.value.trim()) {
      const newTask: Task = {
        title: inputRef.current.value,
        id: idCounter.current++,
      };
      setTasks((prev) => [...prev, newTask]);
      inputRef.current.value = "";
    }
  };

  return (
    <div className="todo-list">
      <h2>Todo List</h2>
      <form onSubmit={onSubmit}>
        <input type="text" placeholder="Add a new task" ref={inputRef} />
        <button type="submit">Add</button>
      </form>
      <ul>
        {tasks.map((task) => (
          <TodoItem key={task.id} task={task} onDelete={handleDelete} />
        ))}
      </ul>
    </div>
  );
};
