import { Button, DatePicker, Form, Input, Select } from "antd";
import type { Task } from "../types/task";
import { addTask } from "../utils/tasksService";
import { useTasksListContext } from "../context/TasksListContext";

const ExistingTaskModal = () => {
  const [form] = Form.useForm();
  const { TextArea } = Input;

  const onFinish = async (values: Task) => {
    console.log("Form submitted:", values);
    addTask(values).then((res) => console.log(res));
  };

  const { openTask, setOpenTask } = useTasksListContext();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/25">
      <div className="w-[50%] max-h-[80vh] overflow-y-auto bg-white rounded-2xl p-4 shadow-2xl">
        <div className="flex justify-between items-center mb-4">
          <p>{openTask.title}</p>
          <button
            className="p-1 bg-[var(--medium-grey)] rounded h-[2rem] w-[2rem] hover:bg-[var(--dark-grey)] transition duration-250 hover:text-white cursor-pointer"
            onClick={() => setOpenTask(null)}
          >
            ×
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExistingTaskModal;
