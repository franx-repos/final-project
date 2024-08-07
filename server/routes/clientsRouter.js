import { Router } from "express";
import * as clientController from "../controllers/clients.js";
import * as authClient from "../controllers/authclient.js";
import verifyToken from "../middlewares/verifyToken.js";

const clientsRouter = Router();

clientsRouter.get("/me", verifyToken, authClient.getClient); // Route overlap

clientsRouter
  .route("/")
  .get(clientController.getAllClients)
  .post(clientController.addNewClient)
  .patch(verifyToken,clientController.updateClient);

clientsRouter
  .route("/:id")
  .get(clientController.getClientById)
  // .put(clientController.updateClient)
  .delete(clientController.deleteClient)
  // .patch(clientController.updateClient);
// clientsRouter.patch("/:id", clientController.addTagToClient);

clientsRouter.route("/email/:email").get(clientController.getClientByEmail);

clientsRouter.post("/register", authClient.signUp);
clientsRouter.post("/login", authClient.logIn);
clientsRouter.post("/logout", verifyToken, authClient.logout);
// clientsRouter.post('/forgotpassword', authClient.forgotpassword);
export default clientsRouter;
