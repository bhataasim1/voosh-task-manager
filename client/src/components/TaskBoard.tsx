import React, { useEffect } from "react";
import { DndContext, useDroppable, DragEndEvent } from "@dnd-kit/core";
import { Task } from "../types/types";
import { TaskCard } from "./TaskCard";
import { useTask } from "../hooks/useTask";

export const TaskBoard: React.FC = () => {
  const { fetchTasks, updateTask, tasks } = useTask();

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const taskId = parseInt(active.id as string, 10);
      const newStatus = over?.id as Task["status"];
      if (newStatus) {
        const task = tasks.find((t) => t.id === taskId);
        if (task) {
          updateTask(task.id, { status: newStatus });
          fetchTasks();
        }
      }
    }
  };

  const columns: { [key in Task["status"]]: Task[] } = {
    TODO: tasks.filter((t) => t.status === "TODO"),
    IN_PROGRESS: tasks.filter((t) => t.status === "IN_PROGRESS"),
    DONE: tasks.filter((t) => t.status === "DONE"),
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="flex space-x-4 mt-8">
        {Object.entries(columns).map(([status, tasks]) => (
          <DroppableColumn key={status} status={status as Task["status"]}>
            {tasks.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </DroppableColumn>
        ))}
      </div>
    </DndContext>
  );
};

const DroppableColumn: React.FC<{
  status: Task["status"];
  children: React.ReactNode;
}> = ({ status, children }) => {
  const { setNodeRef } = useDroppable({
    id: status,
  });

  const getStatusStyles = (status: Task["status"]) => {
    switch (status) {
      case "TODO":
        return "bg-blue-100 border-blue-300 text-blue-800";
      case "IN_PROGRESS":
        return "bg-yellow-100 border-yellow-300 text-yellow-800";
      case "DONE":
        return "bg-green-100 border-green-300 text-green-800";
      default:
        return "";
    }
  };

  return (
    <div
      ref={setNodeRef}
      className={`flex-1 border rounded-lg p-4 min-h-[500px] ${getStatusStyles(status)}`}
    >
      <h2 className="text-xl font-bold mb-4">{status}</h2>
      <div>{children}</div>
    </div>
  );
};
