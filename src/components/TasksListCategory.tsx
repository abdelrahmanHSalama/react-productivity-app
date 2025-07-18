import { CaretDownOutlined, CaretRightOutlined } from "@ant-design/icons";
import type { Task } from "../types/task";
import { useState } from "react";
import TasksListItem from "./TasksListItem";

const TasksListCategory = ({
  tasks,
  category,
}: {
  tasks: Task[];
  category: string;
}) => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <div>
      <div className="flex gap-2 p-2 font-semibold bg-[var(--light-grey)] border-b-[var(--medium-grey)] border-b items-center rounded">
        {collapsed === true ? (
          <CaretRightOutlined onClick={() => setCollapsed((prev) => !prev)} />
        ) : (
          <CaretDownOutlined onClick={() => setCollapsed((prev) => !prev)} />
        )}{" "}
        {category === "todo"
          ? "Todo"
          : category === "in-progress"
          ? "In Progress"
          : "Done"}
        <div className="bg-white rounded-2xl border-[var(--dark-grey)] w-[1.5rem] h-[1.25rem] flex justify-center items-center font-normal text-xs">
          {tasks.length}
        </div>
      </div>
      {!collapsed && tasks.map((t) => <TasksListItem task={t} key={t.id} />)}
    </div>
  );
};

export default TasksListCategory;
