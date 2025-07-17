import { useEffect, useState } from "react";
import { fetchTasks } from "../utils/tasksService";
import type { Task } from "../types/task";
import TasksListCategory from "../components/TasksListCategory";
import { Button } from "antd";
import { createPortal } from "react-dom";
import TaskModal from "../components/TaskModal";

const TasksPage = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const tasks = await fetchTasks();
      setTasks(tasks);
    };

    fetchData();
  }, []);

  useEffect(() => {
    console.log(tasks);
  }, [tasks]);

  const handleShowModal = () => {
    setShowModal((prev) => !prev);
  };

  return (
    <main
      className={`flex flex-col gap-4 transition-all duration-100 ${
        showModal ? "blur-sm" : ""
      }`}
    >
      <div className="flex justify-between px-2">
        <div>viewToggle</div>
        <Button
          style={{
            color: "var(--main-orange)",
            fontWeight: 600,
            borderColor: "var(--main-orange)",
          }}
          onClick={() => {
            setModalType("new");
            setShowModal((prev) => !prev);
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

      <TasksListCategory
        tasks={tasks.filter((t) => t.status === "todo")}
        category="todo"
      />

      <TasksListCategory
        tasks={tasks.filter((t) => t.status === "in-progress")}
        category="in-progress"
      />

      <TasksListCategory
        tasks={tasks.filter((t) => t.status === "done")}
        category="done"
      />

      {showModal &&
        createPortal(
          <TaskModal taskType={modalType} handleModal={handleShowModal} />,
          document.body
        )}
    </main>
  );
};

export default TasksPage;
