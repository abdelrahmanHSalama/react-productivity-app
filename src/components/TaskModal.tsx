import { useForm } from "react-hook-form";
import type { Task } from "../types/task";
import { Input, Select } from "antd";

const TaskModal = ({
  taskType,
  handleModal,
}: {
  taskType: string;
  handleModal: (show: boolean) => void;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Task>({
    defaultValues: {
      title: "New Task",
      description: "",
      assignee: { name: "", avatar: "" },
      dueDate: "",
      priority: "medium",
      subtasks: [],
      comments: [],
      status: "todo",
    },
  });

  const { TextArea } = Input;
  const onChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  const onSearch = (value: string) => {
    console.log("search:", value);
  };

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/25">
      <div className="w-[50%] bg-white rounded-2xl p-4 shadow-2xl">
        <div className="flex justify-between items-center mb-4">
          <p>{taskType === "new" ? "New Task" : "Edit Task"}</p>
          <button
            className="p-1 bg-[var(--medium-grey)] rounded h-[2rem] w-[2rem] hover:bg-[var(--dark-grey)] transition duration-250 hover:text-white cursor-pointer"
            onClick={() => handleModal(false)}
          >
            ×
          </button>
        </div>
        <form className="space-y-2">
          <label className="flex gap-2 items-center">
            Title <Input></Input>
          </label>
          <label>
            Description <TextArea />
          </label>
          <div></div>
          <label className="flex items-center gap-2">
            Assignee
            <Select
              showSearch
              style={{ width: "max-content" }}
              placeholder="Select a person"
              optionFilterProp="label"
              onChange={onChange}
              onSearch={onSearch}
              options={[
                {
                  value: "Michael",
                  label: "Michael",
                },
                {
                  value: "Franklin",
                  label: "Franklin",
                },
                {
                  value: "Trevor",
                  label: "Trevor",
                },
              ]}
            />
          </label>
          <label className="flex items-center gap-2">
            Report to
            <Select
              showSearch
              style={{ width: "max-content" }}
              placeholder="Select a person"
              optionFilterProp="label"
              onChange={onChange}
              onSearch={onSearch}
              options={[
                {
                  value: "Michael",
                  label: "Michael",
                },
                {
                  value: "Franklin",
                  label: "Franklin",
                },
                {
                  value: "Trevor",
                  label: "Trevor",
                },
              ]}
            />
          </label>
        </form>
      </div>
    </div>
  );
};

export default TaskModal;
