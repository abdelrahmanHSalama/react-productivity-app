import { Button, DatePicker, Form, Input, Select } from 'antd'
import { addTask } from '@/services/utils/tasksService'
import type { Task } from '@/services/types/task'
import MDEditor from '@uiw/react-md-editor'

const NewTaskModal = ({
  taskType,
  handleModal,
}: {
  taskType: string
  handleModal: (show: boolean) => void
}) => {
  const [form] = Form.useForm()
  const onFinish = async (values: Task) => {
    console.log('Form submitted:', values)
    addTask(values).then((res) => console.log(res))
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/25">
      <div className="w-[60%] max-h-[80vh] overflow-y-auto bg-white rounded-2xl p-4 shadow-2xl">
        <div className="flex justify-between items-center mb-4">
          <p>{taskType === 'new' ? 'New Task' : 'Edit Task'}</p>
          <Button
            style={{
              padding: 8,
            }}
            onClick={() => handleModal(false)}
          >
            ×
          </Button>
        </div>

        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={{
            title: '',
            description: '',
            assignee: { name: '', avatar: '' },
            reportTo: '',
            dueDate: '',
            priority: 'medium',
            status: 'todo',
            subtasks: [],
            comments: [],
          }}
        >
          <Form.Item
            label="Title"
            name="title"
            rules={[
              { required: false, message: 'Please input the task title!' },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
            rules={[
              {
                required: false,
                message: 'Please input the task description!',
              },
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
                { required: false, message: 'Please input the task title!' },
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
                { required: false, message: 'Please input the task title!' },
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
                { required: false, message: 'Please input the task title!' },
              ]}
              className="w-full"
            >
              <DatePicker format="YYYY-MM-DD" className="w-full" />
            </Form.Item>
            <Form.Item
              label="Priority"
              name="priority"
              rules={[
                { required: false, message: 'Please select a priority!' },
              ]}
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
                { required: false, message: 'Please input the task title!' },
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
                          { required: false, message: 'Missing subtask title' },
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
                          { required: false, message: 'Missing comment text' },
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
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default NewTaskModal
