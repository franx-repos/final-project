import { Router } from "express";
import * as clientController from "../controllers/clients.js";

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

export default clientsRouter;
