import { CaretDownOutlined, CaretRightOutlined } from '@ant-design/icons'
import { useState } from 'react'
import TasksListItem from './TasksListItem'
import type { Task } from '@/services/types/task'

const TasksListCategory = ({
  tasks,
  category,
}: {
  tasks: Task[]
  category: string
}) => {
  const [collapsed, setCollapsed] = useState(false)
  return (
    <div className="rounded-lg bg-[var(--color-light-grey)] border border-[var(--color-border)] shadow">
      <div className="flex gap-2 p-2 font-semibold border-b-[var(--color-border)] border-b items-center rounded-t-2xl">
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
        <div className="bg-white rounded-2xl border border-[var(--color-dark-grey)] w-[1.5rem] h-[1.25rem] flex justify-center items-center font-normal text-xs">
          {tasks.length}
        </div>
      </div>
      <div className="bg-white rounded-b-lg">
        {!collapsed &&
          (tasks.length > 0 ? (
            tasks.map((t) => <TasksListItem task={t} key={t.id} />)
          ) : (
            <p className="p-2 bg-[var(--color-background)] rounded-lg">
              No {category} tasks
            </p>
          ))}
      </div>
    </div>
  )
}

export default TasksListCategory
