import { Router } from "express";
import * as userController from "../controllers/users.js";

const usersRouter = Router();

usersRouter
  .route("/")
  .get(userController.getAllUsers)
  .post(userController.addNewUser);

usersRouter
  .route("/:id")
  .get(userController.getUserById)
  .put(userController.updateUser)
  .delete(userController.deleteUser);

// usersRouter.patch("/:id", userController.addTagToUser);

export default usersRouter;
