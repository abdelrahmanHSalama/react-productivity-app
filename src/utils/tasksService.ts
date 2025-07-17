import axios from "axios";
import type { Task } from "../types/task";

export const fetchTasks = async () => {
  const res = await axios.get("http://localhost:3000/tasks");
  return res.data;
};

export const addTask = async (task: Task) => {
  const res = await axios.post("http://localhost:3000/tasks", task);
  return res.data;
};

export const updateTask = async (id: string, task: Task) => {
  const res = await axios.put(`http://localhost:3000/tasks/${id}`, task);
  return res.data;
};

export const deleteTask = async (id: string) => {
  await axios.delete(`http://localhost:3000/tasks/${id}`);
};

export const toggleSubtask = async (task: Task, subtaskId: string) => {
  const newTask = { ...task };
  const subtask = newTask.subtasks.find((st) => st.id === subtaskId);
  if (subtask) {
    subtask.done = !subtask.done;
  }
  await axios.put(`http://localhost:3000/tasks/${task.id}`, newTask);
  return newTask;
};
