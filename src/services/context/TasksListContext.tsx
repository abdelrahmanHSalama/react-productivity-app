import { createContext, useContext, useEffect, useState } from 'react'
import type { Task } from '../types/task'

type TaskListContextType = {
  openTask: Task | null
  setOpenTask: (task: Task | null) => void
  beingEditedTask: Task | null
  setBeingEditedTask: (task: Task | null) => void
}

const TasksListContext = createContext<TaskListContextType | null>(null)

export const TasksListsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [openTask, setOpenTask] = useState<Task | null>(null)
  const [beingEditedTask, setBeingEditedTask] = useState<Task | null>(null)

  useEffect(() => {
    console.log(openTask)
  }, [openTask])

  return (
    <TasksListContext.Provider
      value={{ openTask, setOpenTask, beingEditedTask, setBeingEditedTask }}
    >
      {children}
    </TasksListContext.Provider>
  )
}

export const useTasksListContext = () => {
  const context = useContext(TasksListContext)
  if (!context) {
    throw new Error(
      'useTasksListContext must be used within a TasksListsProvider'
    )
  }
  return context
}

export default TasksListContext
