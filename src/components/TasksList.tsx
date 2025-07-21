import type { Task } from "../types/task";
import TasksListCategory from "./TasksListCategory";

const TasksList = ({ tasks }: { tasks: Task[] }) => {
  return (
    <>
      {["todo", "in-progress", "done"].map((status) => (
        <TasksListCategory
          key={status}
          tasks={tasks.filter((t: Task) => t.status === status)}
          category={status}
        />
      ))}
    </>
  );
};

export default TasksList;
