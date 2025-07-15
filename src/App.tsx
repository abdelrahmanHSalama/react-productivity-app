import { useEffect, useState } from "react";
import "./App.css";
import { useTasks } from "./hooks/useTasks";
import type { Task } from "./types/task";

function App() {
  const [tasks, setTasks] = useState<Partial<Task>[]>([]);
  const { fetchTasks } = useTasks();

  useEffect(() => {
    fetchTasks().then(setTasks);
  }, []);

  useEffect(() => {
    console.log(tasks);
  }, [tasks]);

  return (
    <main className="flex flex-col justify-center items-center h-screen gap-2">
      <h1 className="text-2xl hover:*:block flex items-center">
        <span className="border p-0.5 mr-0.5 rounded">M</span>
        <span className="hidden">otion</span>
      </h1>
      {tasks.map((t) => (
        <div className="bg-gray-100 p-2 rounded flex gap-1" key={t.id}>
          <p> {t.title}</p>
          <button className="border rounded-full aspect-square hover:bg-black hover:text-gray-50 cursor-pointer">
            ×
          </button>
        </div>
      ))}
    </main>
  );
}

export default App;
