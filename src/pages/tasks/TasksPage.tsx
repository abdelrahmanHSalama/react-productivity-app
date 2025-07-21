import { useEffect, useState } from 'react'
import { Button } from 'antd'
import { createPortal } from 'react-dom'
import { useQuery } from '@tanstack/react-query'
import { fetchTasks } from '@/services/utils/tasksService'
import { TasksListsProvider } from '@/services/context/TasksListContext'
import TasksList from '@/components/ui/Tasks/TasksList'
import NewTaskModal from '@/components/ui/Tasks/NewTaskModal'

const TasksPage = () => {
  const [showNewTaskModal, setShowNewTaskModal] = useState(false)
  const [modalType, setModalType] = useState('')

  const handleNewTaskModal = () => {
    setShowNewTaskModal((prev) => !prev)
  }

  const {
    data: tasks,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['tasks'],
    queryFn: fetchTasks,
  })

  useEffect(() => {
    console.log(tasks)
  }, [tasks])

  return (
    <TasksListsProvider>
      <main
        className={`flex flex-col gap-4 transition-all duration-100 ${
          showNewTaskModal ? 'blur-sm' : ''
        }`}
        id="tasks"
      >
        <div className="flex justify-between px-2">
          <div>viewToggle</div>
          <Button
            style={{
              color: 'var(--color-primary-orange)',
              fontWeight: 600,
              borderColor: 'var(--color-primary-orange)',
            }}
            onClick={() => {
              setModalType('new')
              setShowNewTaskModal((prev) => !prev)
            }}
          >
            + New Task
          </Button>
        </div>
        <div className="flex w-full justify-between bg-white rounded p-2 font-semibold text-[var(--dark-grey)]">
          <span className="flex-5/8">To Do Name</span>
          <span className="flex-1/8 flex justify-center">Assignee</span>
          <span className="flex-1/8 flex justify-center">Due Date</span>
          <span className="flex-1/8 flex justify-center">Priority</span>
        </div>

        {!isLoading && !isError && <TasksList tasks={tasks} />}

        {showNewTaskModal &&
          createPortal(
            <NewTaskModal
              taskType={modalType}
              handleModal={handleNewTaskModal}
            />,
            document.body
          )}
      </main>
    </TasksListsProvider>
  )
}

export default TasksPage
