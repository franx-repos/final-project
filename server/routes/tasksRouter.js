import { Router } from "express";
import * as taskController from "../controllers/tasks.js";
import upload from "../services/upload.js";

const tasksRouter = Router();

tasksRouter
  .route("/")
  .get(taskController.getAllTasks)
  .post(taskController.CreateTask);

tasksRouter
  .route("/:id")
  .get(taskController.getTaskById)
  .put(upload.single("doc"), taskController.updateTask)
  .delete(taskController.deleteTask);

// tasksRouter.patch("/:id", taskController.addTagToTask);

export default tasksRouter;
