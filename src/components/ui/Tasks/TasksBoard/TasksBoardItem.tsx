import { useTasksListContext } from '@/services/context/TasksListContext'
import type { Task } from '@/services/types/task'
import { useDraggable } from '@dnd-kit/core'
import MDEditor from '@uiw/react-md-editor'

const TasksBoardItem = ({ task }: { task: Task }) => {
  const { transform, isDragging } = useDraggable({ id: task.id })

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    opacity: isDragging ? 0.5 : 1,
  }

  const { setOpenTask } = useTasksListContext()

  return (
    <div
      className="bg-background rounded p-4 space-y-2"
      onClick={() => setOpenTask(task)}
      key={task.id}
      style={style}
    >
      <p className="text-lg font-medium">{task.title}</p>
      {task.description && (
        <p data-color-mode="light" className="bg-background *:text-lg">
          <MDEditor.Markdown source={task.description} skipHtml />
        </p>
      )}

      {task.image && <img src={task.image} className="rounded"></img>}
      <div className="flex justify-between">
        {task.assignee?.name ? (
          <span className="flex items-center gap-1">
            Assigned to:{' '}
            <img src={task.assignee.avatar} className="w-6 rounded-full"></img>
            {task.assignee.name}
          </span>
        ) : null}
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
