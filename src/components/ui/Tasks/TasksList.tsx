import { createPortal } from 'react-dom'
import TasksListCategory from './TasksListCategory'
import ExistingTaskModal from './ExistingTaskModal'
import type { Task } from '@/services/types/task'
import { useTasksListContext } from '@/services/context/TasksListContext'

const TasksList = ({ tasks }: { tasks: Task[] }) => {
  const { openTask } = useTasksListContext()

  return (
    <>
      {['todo', 'in-progress', 'done'].map((status) => (
        <TasksListCategory
          key={status}
          tasks={tasks.filter((t: Task) => t.status === status)}
          category={status}
        />
      ))}
      {openTask && createPortal(<ExistingTaskModal />, document.body)}
    </>
  )
}

export default TasksList
