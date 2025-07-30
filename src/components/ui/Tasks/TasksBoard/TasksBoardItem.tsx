import { useTasksListContext } from '@/services/context/TasksListContext'
import type { Task } from '@/services/types/task'
import { useDraggable } from '@dnd-kit/core'
import { HolderOutlined } from '@ant-design/icons'
const TasksBoardItem = ({ task }: { task: Task }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({ id: task.id })

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    opacity: isDragging ? 0.5 : 1,
  }

  const { setOpenTask } = useTasksListContext()

  return (
    <div
      className="bg-background rounded p-4 space-y-4 group"
      onClick={() => setOpenTask(task)}
      key={task.id}
      style={style}
    >
      <div className="flex justify-between">
        <p
          className="text-lg font-medium cursor-pointer"
          onClick={() => setOpenTask(task)}
        >
          {task.title}
        </p>
        <span className="transform opacity-0 group-hover:opacity-100 transition-all duration-100">
          <HolderOutlined
            ref={setNodeRef}
            {...listeners}
            {...attributes}
            style={{ cursor: 'grab' }}
          />
        </span>
      </div>
      {task.description && <p>{task.description}</p>}

      {task.image && <img src={task.image} className="rounded"></img>}
      <div className="flex justify-end">
        {task.reportTo?.name ? (
          <span className="flex items-center gap-1">
            Report to:{' '}
            <img src={task.reportTo.avatar} className="w-6 rounded-full"></img>
            {task.reportTo.name}
          </span>
        ) : null}
      </div>
    </div>
  )
}

export default TasksBoardItem
