import { useState } from "react";
import type { Task } from "../types/task";
import { v4 as uuidv4 } from "uuid";

export const fakeTasks: Task[] = [
  {
    id: uuidv4(),
    title: "Build task list screen",
    description:
      "Implement the list view of all tasks using reusable components.",
    assignee: "Abdelrahman",
    reportedTo: "Mentor",
    dueDate: "2025-07-20",
    priority: "high",
    status: "todo",
    subtasks: [
      { id: uuidv4(), title: "Design UI", done: true },
      { id: uuidv4(), title: "Map over tasks", done: false },
      { id: uuidv4(), title: "Handle empty state", done: false },
    ],
    comments: [
      {
        id: uuidv4(),
        text: "Start by mocking the UI first",
        author: "Mentor",
      },
    ],
  },
  {
    id: uuidv4(),
    title: "Implement subtasks logic",
    description:
      "Users should be able to toggle subtasks and prevent completion unless all are done.",
    assignee: "Abdelrahman",
    reportedTo: "Mentor",
    dueDate: "2025-07-22",
    priority: "medium",
    status: "in-progress",
    subtasks: [
      { id: uuidv4(), title: "Create subtask type", done: true },
      { id: uuidv4(), title: "Add toggle logic", done: true },
      { id: uuidv4(), title: "Block status change", done: false },
    ],
    comments: [
      {
        id: uuidv4(),
        text: "Make sure to test this thoroughly",
        author: "Mentor",
      },
    ],
  },
  {
    id: uuidv4(),
    title: "Test useTasks hook",
    description:
      "Log and inspect the behavior of the hook before UI integration.",
    assignee: "Abdelrahman",
    reportedTo: "Self",
    dueDate: "2025-07-15",
    priority: "low",
    status: "done",
    subtasks: [
      { id: uuidv4(), title: "Create fake task data", done: true },
      { id: uuidv4(), title: "Call hook from test file", done: true },
    ],
    comments: [
      {
        id: uuidv4(),
        text: "Done and logged correctly",
        author: "Abdelrahman",
      },
    ],
  },
  {
    id: uuidv4(),
    title: "Create modal for task editing",
    description: "Allow user to view, edit, and update tasks in a modal.",
    assignee: "Abdelrahman",
    reportedTo: "Mentor",
    dueDate: "2025-07-25",
    priority: "high",
    status: "todo",
    subtasks: [
      { id: uuidv4(), title: "Build modal shell", done: false },
      { id: uuidv4(), title: "Add form inputs", done: false },
      { id: uuidv4(), title: "Save edited task", done: false },
    ],
    comments: [],
  },
  {
    id: uuidv4(),
    title: "Implement task board view",
    description:
      "Display tasks grouped by status in cards (To-Do, In Progress, Done).",
    assignee: "Abdelrahman",
    reportedTo: "Mentor",
    dueDate: "2025-07-23",
    priority: "medium",
    status: "in-progress",
    subtasks: [
      { id: uuidv4(), title: "Setup 3 columns", done: true },
      { id: uuidv4(), title: "Render tasks in correct column", done: false },
    ],
    comments: [
      {
        id: uuidv4(),
        text: "Try adding drag-and-drop later",
        author: "Mentor",
      },
    ],
  },
];

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>(fakeTasks);

  const addTask = (taskData: Partial<Task>) => {
    const newTask = {
      id: uuidv4(),
      status: "todo",
      ...taskData,
    };
    setTasks((prev) => [...prev, newTask as Task]);
  };

  const updateTask = (id: string, updates: Partial<Task>) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, ...updates } : task))
    );
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const changeStatus = (
    id: string,
    newStatus: "todo" | "in-progress" | "done"
  ) => {
    updateTask(id, { status: newStatus });
  };

  return { tasks, addTask, updateTask, deleteTask, changeStatus };
};
