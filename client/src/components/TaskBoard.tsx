import React, { useEffect } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import { Task } from "../types/types";
import { TaskCard } from "./TaskCard";
import { useTask } from "../hooks/useTask";

export const TaskBoard: React.FC = () => {
  const { tasks, fetchTasks, updateTask } = useTask();

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const task = tasks.find((t) => t.id === parseInt(draggableId));
    if (task) {
      updateTask(task.id, {
        status: destination.droppableId as Task["status"],
      });
    }
  };

  const columns: { [key in Task["status"]]: Task[] } = {
    TODO: tasks.filter((t) => t.status === "TODO"),
    IN_PROGRESS: tasks.filter((t) => t.status === "IN_PROGRESS"),
    DONE: tasks.filter((t) => t.status === "DONE"),
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex justify-between mt-8">
        {Object.entries(columns).map(([status, tasks]) => (
          <div key={status} className="w-1/3 px-2">
            <h2 className="text-xl font-bold mb-4">{status}</h2>
            <Droppable droppableId={status}>
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="bg-gray-100 p-4 rounded min-h-[500px]"
                >
                  {tasks.map((task, index) => (
                    <Draggable
                      key={task.id}
                      draggableId={task.id.toString()}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <TaskCard task={task} />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        ))}
      </div>
    </DragDropContext>
  );
};
