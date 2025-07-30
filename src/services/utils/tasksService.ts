import type { Task } from '../types/task'
import { v4 as uuidv4 } from 'uuid'
import { clientApi } from '../api/clientApi'

export const fetchTasks = async () => {
  const res = await clientApi.get('/tasks')

  return res.data
}

export const addTask = async (task: Task) => {
  const newTask = { ...task }
  newTask.id = uuidv4()
  const res = await clientApi.post('/tasks', newTask)
  return res.data
}

export const updateTask = async (id: string, task: Task) => {
  const res = await clientApi.put(`/tasks/${id}`, task)
  return res.data
}

export const deleteTask = async (id: string) => {
  const res = await clientApi.delete(`/tasks/${id}`)
  return res.data
}

export const toggleSubtask = async (task: Task, subtaskId: string) => {
  const newTask = { ...task }
  if (!newTask.subtasks) return
  const subtask = newTask.subtasks.find((st) => st.id === subtaskId)
  if (subtask) {
    subtask.done = !subtask.done
  }
  const res = await clientApi.put(`/tasks/${task.id}`, newTask)
  return res.data
}
