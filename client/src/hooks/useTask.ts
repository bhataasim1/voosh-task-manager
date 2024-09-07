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

  const createTask = useCallback(async (task: Omit<Task, "id" | "createdAt">) => {
    const response = await taskService.createTask(task);
    setTasks((prevTasks) => [...prevTasks, response.data]);
  }, []);

  const updateTask = useCallback(async (id: number, task: Partial<Task>) => {
    const response = await taskService.updateTask(id, task);
    setTasks((prevTasks) =>
      prevTasks.map((t) => (t.id === id ? response.data : t))
    );
  }, []);

  const deleteTask = useCallback(async (id: number) => {
    await taskService.deleteTask(id);
    setTasks((prevTasks) => prevTasks.filter((t) => t.id !== id));
  }, []);

  return { tasks, fetchTasks, createTask, updateTask, deleteTask };
};
