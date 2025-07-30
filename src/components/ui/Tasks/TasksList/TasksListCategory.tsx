import { CaretDownOutlined, CaretRightOutlined } from '@ant-design/icons'
import { useState } from 'react'
import TasksListItem from './TasksListItem'
import type { Task } from '@/services/types/task'
import { useDroppable } from '@dnd-kit/core'

const TasksListCategory = ({
  tasks,
  category,
}: {
  tasks: Task[]
  category: string
}) => {
  const [collapsed, setCollapsed] = useState(false)
  const { setNodeRef } = useDroppable({ id: category })

  return (
    <div className="rounded-lg bg-light-grey border border-border shadow">
      <div className="flex gap-2 p-2 font-semibold border-b-border border-b items-center rounded-t-2xl">
        {collapsed === true ? (
          <CaretRightOutlined onClick={() => setCollapsed((prev) => !prev)} />
        ) : (
          <CaretDownOutlined onClick={() => setCollapsed((prev) => !prev)} />
        )}
        {category === 'todo'
          ? 'Todo'
          : category === 'in-progress'
            ? 'In Progress'
            : 'Done'}
        <div className="bg-white rounded-2xl border border-dark-grey w-[1.5rem] h-[1.25rem] flex justify-center items-center font-normal text-xs">
          {tasks.length}
        </div>
      </div>
      <div className="bg-white rounded-b-lg" ref={setNodeRef}>
        {' '}
        {!collapsed &&
          (tasks.length > 0 ? (
            tasks.map((t, i) => (
              <div key={t.id}>
                <TasksListItem task={t} />
                {i < tasks.length - 1 && (
                  <div className="h-0.25 w-full bg-border"></div>
                )}
              </div>
            ))
          ) : (
            <p className="p-2 bg-background rounded-lg">No {category} tasks.</p>
          ))}
      </div>
    </div>
  )
}

export default TasksListCategory
