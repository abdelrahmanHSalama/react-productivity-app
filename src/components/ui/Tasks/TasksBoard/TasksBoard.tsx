import { createPortal } from 'react-dom'
import TasksBoardCategory from './TasksBoardCategory'
import ExistingTaskModal from '../Shared/ExistingTaskModal'
import type { Task } from '@/services/types/task'
import { useTasksListContext } from '@/services/context/TasksListContext'
import { useState } from 'react'
import { updateTask } from '@/services/utils/tasksService'
import { DndContext, type DragEndEvent } from '@dnd-kit/core'

const TasksBoard = ({ tasks }: { tasks: Task[] }) => {
  const { openTask } = useTasksListContext()
  const [taskList, setTaskList] = useState<Task[]>(tasks)

  const handleDragEnd = (e: DragEndEvent) => {
    const { active, over } = e

    if (active.id && over?.id && active.id !== over.id) {
      const draggedTask = taskList.find((t) => t.id === active.id)
      if (!draggedTask) return

      const updatedTask = { ...draggedTask, status: over.id }

      setTaskList((prev) =>
        prev.map((t) =>
          t.id === active.id
            ? {
                ...updatedTask,
                status: updatedTask.status as 'todo' | 'in-progress' | 'done',
              }
            : t
        )
      )
      updateTask(draggedTask.id, {
        ...updatedTask,
        status: updatedTask.status as 'todo' | 'in-progress' | 'done',
      })
    }
  }

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="flex gap-2 mb-4">
        {['todo', 'in-progress', 'done'].map((status) => (
          <div className="flex-1/3">
            <TasksBoardCategory
              key={status}
              tasks={taskList.filter((t: Task) => t.status === status)}
              category={status}
            />
          </div>
        ))}
        {openTask && createPortal(<ExistingTaskModal />, document.body)}
      </div>
    </DndContext>
  )
}

export default TasksBoard
