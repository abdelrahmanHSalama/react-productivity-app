import axios from "axios";
import type { Task } from "../types/task";

export const useTasks = () => {
  const fetchTasks = async () => {
    const res = await axios.get("http://localhost:3000/tasks");
    return res.data;
  };

  const addTask = async (task: Task) => {
    const res = await axios.post("http://localhost:3000/tasks", task);
    return res.data;
  };

  const updateTask = async (id: string, updates: Partial<Task>) => {
    const res = await axios.put(`http://localhost:3000/tasks/${id}`, updates);
    return res.data;
  };

  const deleteTask = async (id: string) => {
    await axios.delete(`http://localhost:3000/tasks/${id}`);
  };

  return { fetchTasks, addTask, updateTask, deleteTask };
};
