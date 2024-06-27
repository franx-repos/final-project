import { Router } from "express";
import * as chatController from "../controllers/chats.js";

const chatRouter = Router();

chatRouter
  .route("/")
  .get(chatController.getAllChats)
  .post(chatController.createNewChat);

chatRouter
  .route("/:id")
  .get(chatController.getChatById)
  .put(chatController.updateChat);

chatRouter.get("/client_chat/:client_id", chatController.getChatByClientID);

export default chatRouter;
