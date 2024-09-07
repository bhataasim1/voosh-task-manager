import { Request, Response } from "express";
import { BaseController } from "../_BaseController";
import { TaskService } from "../../services/Task.service";

export class TaskController extends BaseController {
  private taskService: TaskService;
  constructor() {
    super();
    this.taskService = new TaskService();
    this.getAllTasks = this.getAllTasks.bind(this);
    this.createTask = this.createTask.bind(this);
    this.updateTask = this.updateTask.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
  }
  async getAllTasks(req: Request, res: Response) {
    try {
      const userId = (req as any).userId;
      //   console.log(userId);
      const tasks = await this.taskService.getAllTasks(userId);
      return this._sendResponse(res, "Tasks fetched successfully", 200, {
        tasks,
      });
    } catch (error: any) {
      return this._sendError(res, error.message);
    }
  }

  async createTask(req: Request, res: Response) {
    try {
      const userId = (req as any).userId;
      const { title, description, status } = req.body;

      if (!title || !description || !status) {
        return this._sendResponse(res, "Please provide all fields", 400, {});
      }

      const task = await this.taskService.createTask(
        userId,
        title,
        description,
        status
      );
      return this._sendResponse(res, "Task created successfully", 201, {
        task,
      });
    } catch (error: any) {
      return this._sendError(res, error.message);
    }
  }

  async updateTask(req: Request, res: Response) {
    try {
      const userId = (req as any).userId;
      const taskId = parseInt(req.params.id);
      const { title, description, status } = req.body;

      const task = await this.taskService.updateTask(taskId, userId, {
        title,
        description,
        status,
      });
      return this._sendResponse(res, "Task updated successfully", 200, {
        task,
      });
    } catch (error: any) {
      return this._sendError(res, error.message);
    }
  }

  async deleteTask(req: Request, res: Response) {
    try {
      const userId = (req as any).userId;
      const taskId = parseInt(req.params.id);
      const task = await this.taskService.deleteTask(taskId, userId);
      return this._sendResponse(res, "Task deleted successfully", 200, {
        task,
      });
    } catch (error: any) {
      return this._sendError(res, error);
    }
  }
}
