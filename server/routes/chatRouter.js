import { Router } from "express";
import * as chatController from "../controllers/chats.js";
import verifyToken from "../middlewares/verifyToken.js";

const chatRouter = Router();

chatRouter
  .route("/client_chat/")
  .get(verifyToken, chatController.getChatByClientID);
chatRouter.route("/pro_chat/").get(verifyToken, chatController.getChatByProID);

chatRouter
  .route("/")
  .get(chatController.getAllChats)
  .post(verifyToken, chatController.createNewChat);

chatRouter
  .route("/:id")
  .get(verifyToken, chatController.getChatById)
  .patch(verifyToken, chatController.updateChat)
  .delete(verifyToken, chatController.deleteChat);

export default chatRouter;
