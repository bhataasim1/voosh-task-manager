/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useCallback } from "react";
import { Task } from "../types/types";
import { TaskServices } from "../API/taskServices";

export const useTask = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const taskService = new TaskServices();

  const fetchTasks = useCallback(async () => {
    const response = await taskService.getAllTasks();
    console.log(response.data.tasks);
    setTasks(response.data.tasks);
  }, []);

  const createTask = useCallback(
    async (task: Omit<Task, "id" | "createdAt">) => {
      await taskService.createTask(task);
      fetchTasks();
    },
    [fetchTasks]
  );

  const updateTask = useCallback(
    async (id: number, task: Partial<Task>) => {
      await taskService.updateTask(id, task);
      fetchTasks();
    },
    [fetchTasks]
  );

  const deleteTask = useCallback(
    async (id: number) => {
      await taskService.deleteTask(id);
      fetchTasks();
    },
    [fetchTasks]
  );

  return { tasks, fetchTasks, createTask, updateTask, deleteTask };
};
