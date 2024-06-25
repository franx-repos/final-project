import { Router } from "express";
import * as clientController from "../controllers/clients.js"
import * as authClient from "../controllers/authclient.js";
import verifyToken from "../middlewares/verifyToken.js";

const clientsRouter = Router();

clientsRouter
  .route("/")
  .get(clientController.getAllClients)
  .post(clientController.addNewClient);

clientsRouter
  .route("/:id")
  .get(clientController.getClientById)
  .put(clientController.updateClient)
  .delete(clientController.deleteClient);
  // clientsRouter.patch("/:id", clientController.addTagToClient);

  clientsRouter.post("/register", authClient.signUp);
  clientsRouter.post("/login",authClient.logIn);
  clientsRouter.post("/me", verifyToken,authClient.getClient);
  clientsRouter.post("/logout",authClient.logout);

export default clientsRouter; 
