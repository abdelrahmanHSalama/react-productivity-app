import TasksBoardItem from './TasksBoardItem'
import type { Task } from '@/services/types/task'
import { useDroppable } from '@dnd-kit/core'

const TasksBoardCategory = ({
  tasks,
  category,
}: {
  tasks: Task[]
  category: string
}) => {
  const { setNodeRef } = useDroppable({ id: category })

  return (
    <div className="">
      <div className="flex gap-1 items-center mb-4">
        <p className="font-semibold">
          {category === 'todo'
            ? 'Todo'
            : category === 'in-progress'
              ? 'In Progress'
              : 'Done'}
        </p>
        <div className="bg-white rounded-2xl border border-dark-grey w-[1.5rem] h-[1.25rem] flex justify-center items-center font-normal text-xs">
          {tasks.length}
        </div>
      </div>
      <div className="space-y-2" ref={setNodeRef}>
        {tasks.length > 0 ? (
          tasks.map((t) => (
            <div key={t.id}>
              <TasksBoardItem task={t} />
            </div>
          ))
        ) : (
          <p className="bg-background p-2 rounded">No {category} tasks.</p>
        )}
      </div>
    </div>
  )
}

export default TasksBoardCategory
