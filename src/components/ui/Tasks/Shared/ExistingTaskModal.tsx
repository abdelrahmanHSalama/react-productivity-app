import { EditOutlined } from '@ant-design/icons'
import { useTasksListContext } from '@/services/context/TasksListContext'
import { Button } from 'antd'
import EditTaskModal from './EditTaskModal'
import ViewTaskModal from './ViewTaskModal'

const ExistingTaskModal = () => {
  const { openTask, setOpenTask, beingEditedTask, setBeingEditedTask } =
    useTasksListContext()

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/25">
      <div className="w-[60%] h-[80vh] overflow-y-auto bg-white rounded p-4 shadow-2xl">
        <div className="flex justify-between items-center mb-4">
          <p>{openTask?.id}</p>
          <div className="flex gap-1">
            <Button
              style={{
                padding: 8,
              }}
              type={beingEditedTask ? 'primary' : 'default'}
              onClick={() => {
                !beingEditedTask
                  ? setBeingEditedTask(openTask)
                  : setBeingEditedTask(null)
              }}
            >
              <EditOutlined />
            </Button>
            <Button
              style={{
                padding: 8,
              }}
              onClick={() => setOpenTask(null)}
            >
              ×
            </Button>
          </div>
        </div>
        {!beingEditedTask && <ViewTaskModal />}
        {beingEditedTask && <EditTaskModal />}
      </div>
    </div>
  )
}

export default ExistingTaskModal
