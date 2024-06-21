import { Router } from "express";
import * as taskController from "../controllers/tasks.js";

const tasksRouter = Router();

tasksRouter
  .route("/")
  .get(taskController.getAllTasks)
  .post(taskController.CreateTask);

tasksRouter
  .route("/:id")
  .get(taskController.getTaskById)
  .put(taskController.updateTask)
  .delete(taskController.deleteTask);

// tasksRouter.patch("/:id", taskController.addTagToTask);

export default tasksRouter;
