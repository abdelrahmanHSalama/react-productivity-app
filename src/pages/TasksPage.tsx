import { useState } from "react";
import { Button } from "antd";
import { createPortal } from "react-dom";
import NewTaskModal from "../components/NewTaskModal";
import { useQuery } from "@tanstack/react-query";
import { fetchTasks } from "../utils/tasksService";
import TasksList from "../components/TasksList";
import { TasksListsProvider } from "../context/TasksListContext";

const TasksPage = () => {
  const [showNewTaskModal, setShowNewTaskModal] = useState(false);
  const [modalType, setModalType] = useState("");

  const handleNewTaskModal = () => {
    setShowNewTaskModal((prev) => !prev);
  };

  const {
    data: tasks,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["tasks"],
    queryFn: fetchTasks,
  });

  return (
    <TasksListsProvider>
      <main
        className={`flex flex-col gap-4 transition-all duration-100 ${
          showNewTaskModal ? "blur-sm" : ""
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
              setShowNewTaskModal((prev) => !prev);
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

        {!isLoading && !isError && <TasksList tasks={tasks} />}

        {showNewTaskModal &&
          createPortal(
            <NewTaskModal
              taskType={modalType}
              handleModal={handleNewTaskModal}
            />,
            document.body
          )}
      </main>
    </TasksListsProvider>
  );
};

export default TasksPage;
