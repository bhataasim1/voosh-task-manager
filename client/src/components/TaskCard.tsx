import React from "react";
import { useTask } from "../hooks/useTask";
import { Task } from "../types/types";
import { Button } from "./ui/button";
import EditNewTaskDialog from "./EditNewTaskDialog";
import ViewDetailsTaskDialog from "./ViewDetailsTaskDialog";
import { useDraggable } from "@dnd-kit/core";

export const TaskCard: React.FC<{ task: Task }> = ({ task }) => {
  const { deleteTask } = useTask();
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  const { attributes, listeners, setNodeRef, transform, transition } = useDraggable({
    id: task.id.toString(),
  });

  const style = {
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className="bg-white p-4 mb-2 rounded shadow cursor-pointer"
    >
      <div {...listeners} className="cursor-move">
        {/* Draggable Handle */}
        <h3 className="font-bold text-lg">{task.title}</h3>
      </div>
      <p className="text-sm text-gray-600">{task.description}</p>
      <p className="text-sm text-gray-400 mt-5">Created At: {task.createdAt}</p>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mt-4">
        <Button
          onClick={(e) => {
            e.stopPropagation();
            deleteTask(task.id);
          }}
          variant={"destructive"}
          className="w-full sm:w-auto"
        >
          Delete
        </Button>
        <div className="flex gap-2">
          <EditNewTaskDialog task={task} />
          <ViewDetailsTaskDialog task={task} />
        </div>
      </div>
    </div>
  );
};
