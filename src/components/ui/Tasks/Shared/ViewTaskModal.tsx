import { useTasksListContext } from '@/services/context/TasksListContext'
import {
  deleteTask,
  toggleSubtask,
  updateTask,
} from '@/services/utils/tasksService'
import { Button, Input, message, Modal, Select } from 'antd'
import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import {
  CheckCircleOutlined,
  CheckCircleTwoTone,
  DeleteOutlined,
  DownOutlined,
  EllipsisOutlined,
  FileOutlined,
  FlagOutlined,
  FlagTwoTone,
  RightOutlined,
  SendOutlined,
} from '@ant-design/icons'
import type { Task } from '@/services/types/task'
import MDEditor from '@uiw/react-md-editor'

const ViewTaskModal = () => {
  const { openTask } = useTasksListContext()
  if (!openTask) return

  const [descOpen, setDescOpen] = useState(false)
  const [attchOpen, setAttchOpen] = useState(false)
  const [commentInput, setCommentInput] = useState('')
  const { TextArea } = Input

  const handleToggleSubtask = (subtaskId: string) => {
    if (!openTask) return
    toggleSubtask(openTask, subtaskId)
      .then((res) => console.log(res))
      .catch((error) => {
        console.error('Failed to toggle subtask:', error)
      })
  }

  const handleStatusChange = (newStatus: string) => {
    if (!openTask) return
    let newTask = {
      ...openTask,
      status: newStatus as 'todo' | 'in-progress' | 'done',
    }
    updateTask(openTask.id, newTask)
      .then((res) => console.log(res))
      .catch((error) => {
        console.error('Failed to toggle subtask:', error)
      })
  }

  const handleAddComment = (comment: string) => {
    let newTask = {
      ...openTask,
      comments: [
        ...(openTask?.comments || []),
        { id: uuidv4(), author: 'Mentor', text: comment },
      ],
    }
    if (!openTask?.id) {
      message.error('ID is required!')
      return
    }
    updateTask(openTask.id, newTask as Task)
      .then((res) => console.log(res))
      .catch((error) => {
        console.error('Failed to toggle subtask:', error)
      })
  }

  const handleDeleteTask = async () => {
    try {
      await deleteTask(openTask.id)
      message.success('Task Deleted!')
    } catch (error) {
      message.error('Failed to Delete Task!')
    }
  }

  return (
    <div id="view">
      <div className="flex gap-2">
        <div className="flex-3/4 space-y-6">
          <div>
            <h2 className="text-2xl font-semibold">{openTask?.title}</h2>
          </div>
          <div>
            <h3
              className="flex items-center gap-1 cursor-pointer font-semibold mb-2"
              onClick={() => setDescOpen((prev) => !prev)}
            >
              <button className="text-xs">
                {descOpen ? <DownOutlined /> : <RightOutlined />}
              </button>
              Description
            </h3>
            <p className="text-sm">
              {descOpen && (
                <p className="p-2" data-color-mode="light">
                  <MDEditor.Markdown source={openTask?.description} />
                </p>
              )}
            </p>
          </div>
          <div>
            <div className="flex justify-between items-center">
              <h3
                className="flex items-center gap-1 cursor-pointer font-semibold"
                onClick={() => setAttchOpen((prev) => !prev)}
              >
                <button className="text-xs">
                  {attchOpen ? <DownOutlined /> : <RightOutlined />}
                </button>
                Attachments
              </h3>
              <div className="flex items-center gap-1">
                <Button
                  style={{
                    padding: 8,
                  }}
                >
                  <EllipsisOutlined />
                </Button>
                <Button
                  style={{
                    padding: 8,
                  }}
                >
                  +
                </Button>
              </div>
            </div>
            {attchOpen && (
              <div className="space-y-2 text-sm mt-2">
                <div className="flex">
                  <p className="flex-3/6">Name</p>
                  <p className="flex-1/6">Size</p>
                  <p className="flex-2/6">Date Added</p>
                </div>
                <div className="flex items-center border-b border-t px-1 py-2 border-dark-grey">
                  <p className="flex-3/6 flex gap-1 items-center">
                    <FileOutlined className="bg-blue-200 p-2 rounded" />{' '}
                    index.html
                  </p>
                  <p className="flex-1/6">10 KB</p>
                  <p className="flex-2/6">20 Jul 2025 11:00PM</p>
                </div>
              </div>
            )}
          </div>
          <div>
            <h3 className="flex items-center font-semibold mb-2">Subtasks</h3>
            <div className="space-y-2">
              {openTask.subtasks &&
                openTask.subtasks.map((st) => (
                  <p className="flex gap-2" key={st.id}>
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
          </div>
          <div>
            <h3 className="flex items-center gap-1 font-semibold mb-2">
              Linked Work Items
            </h3>
            <div className="flex gap-1">
              <Select
                value="is blocked by"
                options={[
                  {
                    value: 'is-blocked-by',
                    label: 'is blocked by',
                  },
                ]}
              />
              <Input
                placeholder="Search for work items"
                style={{
                  backgroundColor: 'var(--color-input)',
                }}
              />
            </div>
          </div>
          <div className="space-y-2">
            <h3 className="flex items-center gap-1 font-semibold">Activity</h3>
            <div className="flex gap-2">
              <img
                src="https://www.rockstargames.com/img/global/downloads/buddyiconsconavatars/sanandreas_grovestreetfamily3_256x256.jpg"
                className="rounded-full w-[2rem] h-[2rem]"
              />
              <TextArea
                placeholder="Add a comment..."
                value={commentInput}
                onChange={(e) => setCommentInput(e.target.value)}
              />
              <Button
                style={{
                  padding: 8,
                }}
                onClick={() => handleAddComment(commentInput)}
              >
                <SendOutlined />
              </Button>
            </div>
            {openTask?.comments?.map((c) => (
              <div
                className="bg-medium-grey p-2"
                key={openTask?.id + Math.random() * 10}
              >
                <p className="text-xs">@{c.author}</p>
                <p>{c.text}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="flex-1/4 space-y-4">
          <Select
            defaultValue={openTask?.status}
            onChange={handleStatusChange}
            options={[
              {
                value: 'todo',
                label: 'Todo',
              },
              {
                value: 'in-progress',
                label: 'In Progress',
              },
              {
                value: 'done',
                label: 'Done',
              },
            ]}
            className="w-full"
          />
          <div></div>
          {/* The Select sticks to the divs unless this one is here */}
          <div className="border border-border p-2 space-y-4">
            <h3 className="text-lg font-semibold">Details</h3>
            <div className="space-y-2">
              <h4 className="font-semibold">Assignee</h4>
              <div className="flex gap-1 items-center">
                <img
                  src={openTask?.assignee?.avatar}
                  className="h-[1.25rem] rounded-full"
                ></img>
                <p>{openTask?.assignee?.name}</p>
              </div>{' '}
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">Reported to</h4>
              <div className="flex gap-1 items-center">
                <img
                  src={openTask?.reportTo?.avatar}
                  className="h-[1.25rem] rounded-full"
                ></img>
                <p>{openTask?.reportTo?.name}</p>
              </div>{' '}
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">Priority</h4>
              <p>
                {openTask.priority === 'high' ? (
                  <FlagTwoTone twoToneColor="#ff0000" />
                ) : openTask.priority === 'medium' ? (
                  <FlagTwoTone twoToneColor="#0000ff" />
                ) : openTask.priority === 'low' ? (
                  <FlagOutlined />
                ) : (
                  'N/A'
                )}{' '}
                {`${openTask?.priority?.slice(0, 1).toUpperCase()}${openTask?.priority?.slice(1)}`}
              </p>
            </div>
          </div>
          <Button
            // className="delete-button"
            danger
            style={{
              color: 'red',
              backgroundColor: 'white',
              padding: 8,
              width: '100%',
            }}
            onClick={() => {
              Modal.confirm({
                content: 'Are you sure you want to delete this task?',
                onOk: handleDeleteTask,
              })
            }}
          >
            <DeleteOutlined /> Delete Task
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ViewTaskModal
