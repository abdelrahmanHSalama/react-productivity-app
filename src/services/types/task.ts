type Subtask = {
  id: string
  title: string
  done: boolean
}

type Comment = {
  id: string
  text: string
  author: string
}

export type Task = {
  id: string
  title: string
  description?: string
  assignee?: { name: string; avatar: string }
  reportTo?: { name: string; avatar: string }
  dueDate?: string
  priority?: 'low' | 'medium' | 'high'
  status: 'todo' | 'in-progress' | 'done'
  subtasks?: Subtask[]
  comments?: Comment[]
}

export type TaskFormValues = {
  id: string
  title: string
  description?: string
  assignee?: string
  reportTo?: string
  dueDate?: string
  priority?: 'low' | 'medium' | 'high'
  status: 'todo' | 'in-progress' | 'done'
  subtasks?: Subtask[]
  comments?: Comment[]
}
