import { useEffect, useState } from "react";
import type { Task } from "../types/task";
import { deleteTask, fetchTasks } from "../utils/tasksService";

const TasksList = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    fetchTasks().then(setTasks);
  }, []);

  useEffect(() => {
    console.log(tasks);
  }, [tasks]);

  const handleDeleteTask = (id: string) => {
    deleteTask(id);
    fetchTasks().then(setTasks);
  };

  return (
    <main className="flex flex-col justify-center items-center h-screen gap-2">
      <h1 className="text-2xl flex items-center group">
        <span className="border w-[2rem] h-[2rem] flex items-center justify-center mr-0.5 rounded">
          M
        </span>
        <span className="opacity-0 max-w-0 overflow-hidden transition-all duration-500 group-hover:opacity-100 group-hover:max-w-[80px]">
          otion
        </span>
      </h1>
      {tasks.map((t) => (
        <div className="bg-gray-100 p-2 rounded flex gap-1" key={t.id}>
          <p> {t.title}</p>
          <button
            className="border rounded-full aspect-square hover:bg-black hover:text-gray-50 cursor-pointer"
            onClick={() => handleDeleteTask(t.id)}
          >
            ×
          </button>
        </div>
      ))}
    </main>
  );
};

export default TasksList;
