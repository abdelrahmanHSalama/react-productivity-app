type Subtask = {
  id: string;
  title: string;
  done: boolean;
};

type Comment = {
  id: string;
  text: string;
  author: string;
};

export type Task = {
  id: string;
  title: string;
  description?: string;
  assignee?: string;
  reportedTo?: string;
  dueDate?: string;
  dueDateObj?: Date;
  priority?: "low" | "medium" | "high";
  status: "todo" | "in-progress" | "done";
  subtasks?: Subtask[];
  comments?: Comment[];
};
