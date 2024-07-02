import { Router } from "express";
import * as taskController from "../controllers/tasks.js";
import upload from "../services/upload.js";
import verifyToken from "../middlewares/verifyToken.js";
// import verifyToken1 from "../middlewares/verifyToken1.js";
const tasksRouter = Router();

tasksRouter
  .route("/")
  .get(verifyToken,taskController.getAllTasks)
  .post(verifyToken,taskController.CreateTask);

tasksRouter
  .route("/:id")
  .get(verifyToken,taskController.getTaskById)
  .put(upload.single("doc"),verifyToken,taskController.updateTask)
  .delete(verifyToken,taskController.deleteTask);

// tasksRouter.patch("/:id", taskController.addTagToTask);
tasksRouter.route("/:id/:docID").delete(verifyToken,taskController.deleteTaskDocument);

export default tasksRouter;
