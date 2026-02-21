import { memo } from "react";
import { Task } from "./Task";

export const TodoItem = memo(({ task, onDelete }: { task: Task; onDelete: (task: Task) => void }) => {
  return (
    <li className="todo-item">
      <span>{task.title}</span>
      <button onClick={() => onDelete(task)}>×</button>
    </li>
  );
});
