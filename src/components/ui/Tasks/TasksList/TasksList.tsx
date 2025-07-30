import { createPortal } from 'react-dom'
import TasksListCategory from './TasksListCategory'
import ExistingTaskModal from '../Shared/ExistingTaskModal'
import type { Task } from '@/services/types/task'
import { useTasksListContext } from '@/services/context/TasksListContext'
import { useState } from 'react'
import { updateTask } from '@/services/utils/tasksService'
import { DndContext, type DragEndEvent } from '@dnd-kit/core'

const TasksList = ({ tasks }: { tasks: Task[] }) => {
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
    <>
      <div className="flex w-full justify-between bg-white rounded px-2 py-3 font-semibold text-dark-grey">
        <span className="flex-5/8">To Do Name</span>
        <span className="flex-1/8 flex justify-center">Assignee</span>
        <span className="flex-1/8 flex justify-center">Due Date</span>
        <span className="flex-1/8 flex justify-center">Priority</span>
      </div>

      <DndContext onDragEnd={handleDragEnd}>
        {['todo', 'in-progress', 'done'].map((status) => (
          <TasksListCategory
            key={status}
            tasks={taskList.filter((t: Task) => t.status === status)}
            category={status}
          />
        ))}
        {openTask && createPortal(<ExistingTaskModal />, document.body)}
      </DndContext>
    </>
  )
}

export default TasksList
