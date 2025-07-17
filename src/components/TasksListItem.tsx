import {
  CaretDownOutlined,
  CaretRightOutlined,
  CheckCircleOutlined,
  CheckCircleTwoTone,
  FlagOutlined,
  FlagTwoTone,
} from "@ant-design/icons";
import type { Task } from "../types/task";
import { useState } from "react";
import { toggleSubtask } from "../utils/tasksService";

const TasksListItem = ({ task }: { task: Task }) => {
  const [collapsed, setCollapsed] = useState(true);

  const handleToggleSubtask = (subtaskId: string) => {
    toggleSubtask(task, subtaskId)
      .then((res) => console.log(res))
      .catch((error) => {
        console.error("Failed to toggle subtask:", error);
      });
  };

  return (
    <div
      className="flex items-center w-full justify-between bg-white font-semibold text-[var(--dark-grey)]"
      key={task.id}
    >
      <div className="flex-5/8 px-2 py-3 space-y-2 ml-4">
        <p className="flex gap-2">
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
              style={{ color: "var(--medium-grey)" }}
              className="cursor-not-allowed"
            />
          )}
          {task.title}
        </p>
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
              )}{" "}
              {st.title}
            </p>
          ))}
      </div>
      <span className="flex-1/8 flex justify-center border-l border-l-[var(--medium-grey)] h-full">
        <img
          className="w-[1.5rem] rounded-full"
          src={
            task.assignee?.avatar ||
            "https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Solid_black.svg/512px-Solid_black.svg.png"
          }
          alt={task.assignee?.name}
        ></img>
      </span>
      <span className="flex-1/8 flex justify-center items-center border-l border-l-[var(--medium-grey)] h-full">
        {task.dueDate || "N/A"}
      </span>
      <span className="flex-1/8 flex justify-center items-center border-l border-l-[var(--medium-grey)] h-full">
        {task.priority === "high" ? (
          <FlagTwoTone twoToneColor="#ff0000" />
        ) : task.priority === "medium" ? (
          <FlagTwoTone twoToneColor="#0000ff" />
        ) : task.priority === "low" ? (
          <FlagOutlined />
        ) : (
          "N/A"
        )}
      </span>
    </div>
  );
};

export default TasksListItem;
