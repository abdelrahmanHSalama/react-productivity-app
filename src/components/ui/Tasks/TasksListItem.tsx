import { useTasksListContext } from '@/services/context/TasksListContext'
import type { Task } from '@/services/types/task'
import { toggleSubtask } from '@/services/utils/tasksService'
import {
  CaretDownOutlined,
  CaretRightOutlined,
  CheckCircleOutlined,
  CheckCircleTwoTone,
  FlagOutlined,
  FlagTwoTone,
} from '@ant-design/icons'
import { useState } from 'react'

const TasksListItem = ({ task }: { task: Task }) => {
  const [collapsed, setCollapsed] = useState(true)

  const handleToggleSubtask = (subtaskId: string) => {
    toggleSubtask(task, subtaskId)
      .then((res) => console.log(res))
      .catch((error) => {
        console.error('Failed to toggle subtask:', error)
      })
  }

  const { setOpenTask } = useTasksListContext()
  // Property 'openTask' does not exist on type 'TaskListContextType | null'.ts(2339)

  return (
    <div
      className="flex items-center w-full justify-between bg-white font-semibold rounded-lg"
      key={task.id}
    >
      <div className="flex-5/8 px-2 py-3 space-y-2 ml-4">
        <div className="flex gap-2">
          {task.subtasks.length > 0 ? (
            collapsed === true ? (
              <CaretRightOutlined
                onClick={() => setCollapsed((prev) => !prev)}
              />
            ) : (
              <CaretDownOutlined
                onClick={() => setCollapsed((prev) => !prev)}
              />
            )
          ) : (
            <CaretRightOutlined
              style={{ color: 'var(--color-medium-grey)' }}
              className="cursor-not-allowed"
            />
          )}
          <span className="cursor-pointer" onClick={() => setOpenTask(task)}>
            {task.title}
          </span>
        </div>
        {!collapsed &&
          task.subtasks.map((st) => (
            <p className="ml-6 flex gap-2">
              {st.done ? (
                <CheckCircleTwoTone
                  twoToneColor="#ff0000"
                  onClick={() => handleToggleSubtask(st.id)}
                />
              ) : (
                <CheckCircleOutlined
                  onClick={() => handleToggleSubtask(st.id)}
                />
              )}{' '}
              {st.title}
            </p>
          ))}
      </div>
      <span className="flex-1/8 flex justify-center border-l border-l-[var(--color-medium-grey)] h-full">
        <img
          className="w-[1.5rem] rounded-full"
          src={
            task.assignee?.avatar ||
            'https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Solid_black.svg/512px-Solid_black.svg.png'
          }
          alt={task.assignee?.name}
        ></img>
      </span>
      <span className="flex-1/8 flex justify-center items-center border-l border-l-[var(--color-medium-grey)] h-full">
        {task.dueDate || 'N/A'}
      </span>
      <span className="flex-1/8 flex justify-center items-center border-l border-l-[var(--color-medium-grey)] h-full">
        {task.priority === 'high' ? (
          <FlagTwoTone twoToneColor="#ff0000" />
        ) : task.priority === 'medium' ? (
          <FlagTwoTone twoToneColor="#0000ff" />
        ) : task.priority === 'low' ? (
          <FlagOutlined />
        ) : (
          'N/A'
        )}
      </span>
    </div>
  )
}

export default TasksListItem
