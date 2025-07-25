import axios from 'axios'
import type { Task } from '../types/task'
import { v4 as uuidv4 } from 'uuid'

export const fetchTasks = async () => {
  const res = await axios.get('http://localhost:4000/tasks')
  return res.data
}

export const addTask = async (task: Task) => {
  const newTask = { ...task }
  newTask.id = uuidv4()
  const res = await axios.post('http://localhost:4000/tasks', newTask)
  return res.data
}

export const updateTask = async (id: string, task: Task) => {
  const res = await axios.put(`http://localhost:4000/tasks/${id}`, task)
  return res.data
}

export const deleteTask = async (id: string) => {
  await axios.delete(`http://localhost:4000/tasks/${id}`)
}

export const toggleSubtask = async (task: Task, subtaskId: string) => {
  const newTask = { ...task }
  const subtask = newTask.subtasks.find((st) => st.id === subtaskId)
  if (subtask) {
    subtask.done = !subtask.done
  }
  await axios.put(`http://localhost:4000/tasks/${task.id}`, newTask)
  return newTask
}
