import {
  CheckCircleOutlined,
  CheckCircleTwoTone,
  DownOutlined,
  EyeOutlined,
  FileOutlined,
  RightOutlined,
  ShareAltOutlined,
} from '@ant-design/icons'
import ModalButton from './ModalButton'
import { useState } from 'react'
import { useTasksListContext } from '@/services/context/TasksListContext'
import { toggleSubtask, updateTask } from '@/services/utils/tasksService'

const ExistingTaskModal = () => {
  const { openTask, setOpenTask } = useTasksListContext()
  const [descOpen, setDescOpen] = useState(false)
  const [attchOpen, setAttchOpen] = useState(false)

  const handleToggleSubtask = (subtaskId: string) => {
    toggleSubtask(openTask, subtaskId)
      .then((res) => console.log(res))
      .catch((error) => {
        console.error('Failed to toggle subtask:', error)
      })
  }

  const handleStatusChange = (newStatus: string) => {
    let newTask = { ...openTask, status: newStatus }
    updateTask(openTask.id, newTask)
      .then((res) => console.log(res))
      .catch((error) => {
        console.error('Failed to toggle subtask:', error)
      })
  }

  // const handleAddComment = (comment: string) => {
  //   let newTask: Partial<Task> = {
  //     ...openTask,
  //     comments: [...existingComments],
  //   };
  //   updateTask(openTask.id, newTask)
  //     .then((res) => console.log(res))
  //     .catch((error) => {
  //       console.error("Failed to toggle subtask:", error);
  //     });
  // };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/25">
      <div className="w-[60%] h-[80vh] overflow-y-auto bg-white rounded p-4 shadow-2xl">
        <div className="flex justify-between items-center mb-4">
          <p>{openTask?.id}</p>
          <div className="flex gap-1">
            <ModalButton
              variant="bordered"
              content={
                <span className="flex">
                  <EyeOutlined /> 1
                </span>
              }
            />
            <ModalButton variant="bordered" content={<ShareAltOutlined />} />
            <ModalButton variant="bordered" content="..." />
            <ModalButton
              variant="bordered"
              content="×"
              onClick={() => setOpenTask(null)}
            />
          </div>
        </div>
        <div className="flex">
          <div className="flex-3/4 space-y-4">
            <div>
              <h2 className="text-2xl font-semibold">{openTask?.title}</h2>
              {/* <ModalButton variant="bordered" content="+" /> */}
            </div>
            <div>
              <h3
                className="flex items-center gap-1 cursor-pointer font-semibold"
                onClick={() => setDescOpen((prev) => !prev)}
              >
                <button className="text-xs">
                  {descOpen ? <DownOutlined /> : <RightOutlined />}
                </button>{' '}
                Description
              </h3>
              <p className="text-sm">
                {descOpen && <p>{openTask?.description}</p>}
              </p>
            </div>
            <div>
              <div className="flex justify-between items-center">
                <h3
                  className="flex items-center gap-1 cursor-pointer"
                  onClick={() => setAttchOpen((prev) => !prev)}
                >
                  <button className="text-xs">
                    {attchOpen ? <DownOutlined /> : <RightOutlined />}
                  </button>{' '}
                  <span className="flex items-center gap-1 font-semibold">
                    Attachments
                    <div className="text-xs border rounded h-[1.rem] w-[1rem] px-1 flex justify-center items-center">
                      1
                    </div>
                  </span>
                </h3>
                <div className="flex items-center gap-1">
                  <ModalButton variant="no-border" content="..." />
                  <ModalButton variant="no-border" content="+" />
                </div>
              </div>
              <p className="text-sm">
                {attchOpen && (
                  <div className="space-y-2">
                    <div className="flex">
                      <p className="flex-3/6">Name</p>
                      <p className="flex-1/6">Size</p>
                      <p className="flex-2/6">Date Added</p>
                    </div>
                    <div className="flex items-center border-b border-t px-1 py-2 border-[var(--color-dark-grey)]">
                      <p className="flex-3/6 flex gap-1 items-center">
                        <FileOutlined className="bg-blue-200 p-2 rounded" />{' '}
                        index.html
                      </p>
                      <p className="flex-1/6">10 KB</p>
                      <p className="flex-2/6">20 Jul 2025 11:00PM</p>
                    </div>
                  </div>
                )}
              </p>
            </div>
            <div>
              {openTask?.subtasks.map((st) => (
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
            <div>
              <h3 className="flex items-center gap-1 font-semibold">
                Linked Work Items
              </h3>
              <div className="flex gap-2">
                <select className="flex-1/4 border border-[var(--color-dark-grey)] p-1">
                  <option selected>is blocked by</option>
                </select>
                <input
                  className="flex-3/4 border border-[var(--color-dark-grey)] p-1"
                  placeholder="Search for work items"
                ></input>
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="flex items-center gap-1 font-semibold">
                Activity
              </h3>
              <div className="flex gap-2">
                <img
                  src="https://www.rockstargames.com/img/global/downloads/buddyiconsconavatars/sanandreas_grovestreetfamily3_256x256.jpg"
                  className="rounded-full w-[2rem] h-[2rem]"
                />
                <textarea
                  className="flex-1 border border-[var(--color-dark-grey)] text-sm p-1"
                  placeholder="Add a comment..."
                ></textarea>
              </div>
              {openTask?.comments?.map((c) => (
                <div className="bg-[var(--color-medium-grey)] p-2">
                  <p className="text-xs">@{c.author}</p>
                  <p>{c.text}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="flex-1/4">
            <select
              className="bg-[var(--color-light-grey)] outline-[var(--color-light-grey)] p-1"
              value={openTask?.status}
              onChange={(e) => handleStatusChange(e.target.value)}
            >
              <option value="todo">Todo</option>
              <option value="in-progress">In Progress</option>
              <option value="done">Done</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ExistingTaskModal
