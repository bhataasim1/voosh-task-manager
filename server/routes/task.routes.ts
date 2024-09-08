import express from "express";
import { TaskController } from "../controller/task/task.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const taskRouter = express.Router();
const taskController = new TaskController();

taskRouter.use(authMiddleware);

taskRouter.get("/", taskController.getAllTasks);
taskRouter.get("/:id", taskController.getSingleTask);
taskRouter.post("/create-task", taskController.createTask);
taskRouter.put("/update-task/:id", taskController.updateTask);
taskRouter.delete("/delete-task/:id", taskController.deleteTask);

export default taskRouter;
