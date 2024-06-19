import express from "express";
import "./db/server.js";
import clientsRouter from "./routes/clientsRouter.js";
import prosRouter from "./routes/prosRouter.js";
import tasksRouter from "./routes/tasksRouter.js";
import { errorHandler } from "./middlewares/ErrorHandler.js";
import cors from "cors";

const app = express();
const PORT = 8001;

app.use(cors());
app.use(express.json());

//ROUTES

app.use("/clients", clientsRouter);
app.use("/pros", prosRouter);
app.use("/tasks", tasksRouter);

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server is running on Port: ${PORT}`));
