import React from "react";
import { useTask } from "../hooks/useTask";
import { Task } from "../types/types";

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
        <button
          onClick={() => deleteTask(task.id)}
          className="mt-2 text-white bg-red-500 hover:bg-red-700 px-2 py-[2px] rounded"
        >
          Delete
        </button>
        <button
          onClick={() => deleteTask(task.id)}
          className="mt-2 text-white bg-blue-400 hover:bg-blue-500 px-2 py-[2px] rounded"
        >
          Edit
        </button>
        <button
          onClick={() => deleteTask(task.id)}
          className="mt-2 text-white bg-blue-500 hover:bg-blue-700 px-2 py-[2px] rounded"
        >
          View Details
        </button>
      </div>
    </div>
  );
};
