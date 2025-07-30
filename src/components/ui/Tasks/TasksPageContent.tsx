import { useState } from 'react'
import { Button } from 'antd'
import { createPortal } from 'react-dom'
import { useQuery } from '@tanstack/react-query'
import { fetchTasks } from '@/services/utils/tasksService'
import { useTasksListContext } from '@/services/context/TasksListContext'
import TasksList from '@/components/ui/Tasks/TasksList/TasksList'
import NewTaskModal from '@/components/ui/Tasks/Shared/NewTaskModal'
import { AppstoreOutlined, MenuOutlined } from '@ant-design/icons'
import TasksBoard from './TasksBoard/TasksBoard'

const TasksPageContent = () => {
  const [showNewTaskModal, setShowNewTaskModal] = useState(false)
  const [modalType, setModalType] = useState('')

  const handleNewTaskModal = () => {
    setShowNewTaskModal((prev) => !prev)
  }

  const {
    data: tasks,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['tasks'],
    queryFn: fetchTasks,
  })
  // Uncaught Error: No QueryClient set, use QueryClientProvider to set one

  const [view, setView] = useState('list')
  const { openTask } = useTasksListContext()

  return (
    <main
      className={`flex flex-col gap-4 transition-all duration-100 ${
        showNewTaskModal || openTask ? 'blur-sm' : ''
      }`}
      id="tasks"
    >
      <div className="flex justify-between px-2">
        <div className="bg-background flex text-lg items-center rounded cursor-pointer">
          <div
            className={`${view === 'list' ? 'border-primary' : 'border-background'} border-2 p-2 rounded`}
            onClick={() => setView('list')}
          >
            <MenuOutlined />
          </div>
          <div
            className={`${view === 'cards' ? 'border-primary' : 'border-background'} border-2 p-2 rounded`}
            onClick={() => setView('cards')}
          >
            <AppstoreOutlined />
          </div>{' '}
        </div>

        <Button
          style={{
            color: 'var(--color-primary)',
            fontWeight: 600,
            borderColor: 'var(--color-primary)',
            padding: 8,
          }}
          onClick={() => {
            setModalType('new')
            setShowNewTaskModal((prev) => !prev)
          }}
        >
          + New Task
        </Button>
      </div>

      {isError && (
        <main className="w-full h-full flex justify-center items-center">
          {error.message}, please try again...
        </main>
      )}

      {isLoading && (
        <main className="w-full h-full flex justify-center items-center">
          Loading...
        </main>
      )}

      {!isLoading &&
        !isError &&
        (view === 'list' ? (
          <TasksList tasks={tasks} />
        ) : (
          <TasksBoard tasks={tasks} />
        ))}

      {showNewTaskModal &&
        createPortal(
          <NewTaskModal
            taskType={modalType}
            handleModal={handleNewTaskModal}
          />,
          document.body
        )}
    </main>
  )
}

export default TasksPageContent
