import { useTasksListContext } from '@/services/context/TasksListContext'
import type { TaskFormValues } from '@/services/types/task'
import { updateTask } from '@/services/utils/tasksService'
import MDEditor from '@uiw/react-md-editor'
import { Button, DatePicker, Form, Input, Select } from 'antd'
import dayjs from 'dayjs'

const users = [
  {
    name: 'Michael',
    avatar:
      'https://www.rockstargames.com/img/global/downloads/buddyiconsconavatars/v_hunt_m_256x256.jpg',
  },
  {
    name: 'Franklin',
    avatar:
      'https://media-rockstargames-com.akamaized.net/rockstargames-newsite/img/global/downloads/buddyiconsconavatars/v_hunt_f_256x256.jpg',
  },
  {
    name: 'Trevor',
    avatar:
      'https://www.rockstargames.com/img/global/downloads/buddyiconsconavatars/v_hunt_t_256x256.jpg',
  },
]

const EditTaskModal = () => {
  const { openTask, beingEditedTask } = useTasksListContext()
  if (!openTask || !beingEditedTask) return
  const [form] = Form.useForm()

  const onFinish = async (values: TaskFormValues) => {
    const assigneeObj = users.find((u) => u.name === values.assignee)
    const reportToObj = users.find((u) => u.name === values.reportTo)
    const dueDateString = values.dueDate
      ? dayjs(values.dueDate).format('YYYY-MM-DD')
      : ''

    const updatedTask = {
      ...beingEditedTask,
      ...values,
      assignee: assigneeObj || null,
      reportTo: reportToObj || null,
      dueDate: dueDateString,
    }

    updateTask(beingEditedTask?.id, {
      ...updatedTask,
      assignee: updatedTask.assignee || { name: '', avatar: '' },
      reportTo: updatedTask.reportTo || { name: '', avatar: '' },
    })
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-8">
        Editing: {openTask?.title}
      </h2>

      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{
          title: beingEditedTask.title,
          description: beingEditedTask.description,
          assignee: beingEditedTask.assignee?.name,
          reportTo: beingEditedTask.reportTo?.name,
          dueDate: beingEditedTask.dueDate
            ? dayjs(beingEditedTask.dueDate)
            : null,
          priority: beingEditedTask.priority,
          status: beingEditedTask.status,
          subtasks: beingEditedTask.subtasks,
          comments: beingEditedTask.comments,
        }}
      >
        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: false, message: 'Please input the task title!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Description"
          name="description"
          rules={[
            { required: false, message: 'Please input the task description!' },
          ]}
          getValueFromEvent={(value) => value}
          trigger="onChange"
        >
          <MDEditor height={200} />
        </Form.Item>
        <div className="flex gap-2">
          <Form.Item
            label="Assignee"
            name="assignee"
            rules={[
              {
                required: false,
                message: 'Please input the task title!',
              },
            ]}
            className="w-full"
          >
            <Select
              showSearch
              placeholder="Select a person"
              optionFilterProp="label"
              options={[
                {
                  value: 'Michael',
                  label: 'Michael',
                },
                {
                  value: 'Franklin',
                  label: 'Franklin',
                },
                {
                  value: 'Trevor',
                  label: 'Trevor',
                },
              ]}
            />
          </Form.Item>
          <Form.Item
            label="Report to"
            name="reportTo"
            rules={[
              {
                required: false,
                message: 'Please input the task title!',
              },
            ]}
            className="w-full"
          >
            <Select
              showSearch
              placeholder="Select a person"
              optionFilterProp="label"
              options={[
                {
                  value: 'Michael',
                  label: 'Michael',
                },
                {
                  value: 'Franklin',
                  label: 'Franklin',
                },
                {
                  value: 'Trevor',
                  label: 'Trevor',
                },
              ]}
            />
          </Form.Item>
        </div>
        <div className="flex gap-1">
          <Form.Item
            label="Due Date"
            name="dueDate"
            rules={[
              {
                required: false,
                message: 'Please input the task title!',
              },
            ]}
            className="w-full"
          >
            <DatePicker format="YYYY-MM-DD" className="w-full" />
          </Form.Item>
          <Form.Item
            label="Priority"
            name="priority"
            rules={[{ required: false, message: 'Please select a priority!' }]}
            className="w-full"
          >
            <Select
              options={[
                { value: 'low', label: 'Low' },
                { value: 'medium', label: 'Medium' },
                { value: 'high', label: 'High' },
              ]}
            />
          </Form.Item>
          <Form.Item
            label="Status"
            name="status"
            rules={[
              {
                required: false,
                message: 'Please input the task title!',
              },
            ]}
            className="w-full"
          >
            <Select
              options={[
                { value: 'todo', label: 'Todo' },
                { value: 'in-progress', label: 'In Progress' },
                { value: 'done', label: 'Done' },
              ]}
            />
          </Form.Item>
        </div>
        <Form.Item label="Subtasks">
          <Form.List name="subtasks">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <div key={key} className="flex gap-2 mb-2">
                    <Form.Item
                      {...restField}
                      name={[name, 'title']}
                      rules={[
                        {
                          required: false,
                          message: 'Missing subtask title',
                        },
                      ]}
                      className="flex-1"
                    >
                      <Input placeholder="Subtask Title" />
                    </Form.Item>
                    <Button danger onClick={() => remove(name)}>
                      Remove
                    </Button>
                  </div>
                ))}
                <Button type="dashed" onClick={() => add()} block>
                  + Add Subtask
                </Button>
              </>
            )}
          </Form.List>
        </Form.Item>

        <Form.Item label="Comments">
          <Form.List name="comments">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <div key={key} className="flex gap-2 mb-2">
                    <Form.Item
                      {...restField}
                      name={[name, 'text']}
                      rules={[
                        {
                          required: false,
                          message: 'Missing comment text',
                        },
                      ]}
                      className="flex-1"
                    >
                      <Input placeholder="Comment" />
                    </Form.Item>
                    <Button danger onClick={() => remove(name)}>
                      Remove
                    </Button>
                  </div>
                ))}
                <Button type="dashed" onClick={() => add()} block>
                  + Add Comment
                </Button>
              </>
            )}
          </Form.List>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit Edits
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default EditTaskModal
