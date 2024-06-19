import express from "express";
import "./db/server.js";
import usersRouter from "./routes/usersRouter.js";
import { errorHandler } from "./middlewares/ErrorHandler.js";
import cors from "cors";

const app = express();
const PORT = 8001;

app.use(cors());
app.use(express.json());

//ROUTES

app.use("/users", usersRouter);

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server is running on Port: ${PORT}`));
