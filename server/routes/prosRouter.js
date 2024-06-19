import { Router } from "express";
import * as proController from "../controllers/pros.js";

const prosRouter = Router();

prosRouter
  .route("/")
  .get(proController.getAllPros)
  .post(proController.addNewPro);

prosRouter
  .route("/:id")
  .get(proController.getProById)
  .put(proController.updatePro)
  .delete(proController.deletePro);

// prosRouter.patch("/:id", proController.addTagToPro);

export default prosRouter;
