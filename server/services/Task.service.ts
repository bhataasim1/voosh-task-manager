import { PrismaClient } from "@prisma/client";

export type TaskData = {
  title: string;
  description: string;
  status: string;
};

export class TaskService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }
  async getAllTasks(userId: number) {
    return this.prisma.task.findMany({ where: { userId } });
  }

  async getSingleTask(taskId: number, userId: number) {
    return this.prisma.task.findFirst({ where: { id: taskId, userId } });
  }

  async createTask(
    userId: number,
    title: string,
    description: string,
    status: string
  ) {
    return this.prisma.task.create({
      data: { title, description, status, userId },
    });
  }

  async updateTask(taskId: number, userId: number, data: TaskData) {
    const task = await this.prisma.task.findFirst({
      where: { id: taskId, userId },
    });
    if (!task) {
      throw new Error("Task not found");
    }
    return this.prisma.task.update({ where: { id: taskId }, data });
  }

  async deleteTask(taskId: number, userId: number) {
    const task = await this.prisma.task.findFirst({
      where: { id: taskId, userId },
    });
    if (!task) {
      throw new Error("Task not found");
    }
    return this.prisma.task.delete({
      where: { id: taskId },
      select: { id: true, title: true, description: true, status: true },
    });
  }
}
