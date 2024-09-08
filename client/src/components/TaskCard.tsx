import React from "react";
import { useTask } from "../hooks/useTask";
import { Task } from "../types/types";
import { Button } from "./ui/button";
import EditNewTaskDialog from "./EditNewTaskDialog";
import ViewDetailsTaskDialog from "./ViewDetailsTaskDialog";

interface TaskCardProps {
  task: Task;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  const { deleteTask } = useTask();

  return (
    <div className="bg-white p-4 mb-2 rounded shadow">
      <h3 className="font-bold">{task.title}</h3>
      <p className="text-sm text-gray-600">{task.description}</p>
      <p className="text-sm text-gray-400 mt-5">Created At: {task.createdAt}</p>
      <div className="flex items-center justify-end gap-3">
        <Button onClick={() => deleteTask(task.id)} variant={"destructive"}>
          Delete
        </Button>
        <EditNewTaskDialog task={task} />
        <ViewDetailsTaskDialog task={task} />
      </div>
    </div>
  );
};
