import express from "express";
import "./db/server.js";
import clientsRouter from "./routes/clientsRouter.js";
import prosRouter from "./routes/prosRouter.js";
import tasksRouter from "./routes/tasksRouter.js";
import { errorHandler } from "./middlewares/ErrorHandler.js";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const PORT = 8001;

// attaching socket.io to express server
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
  },
});

io.on("connection", (socket) => {
  console.log(`${socket.id} user just connected`);
  console.log(`${io.engine.clientCount} user are connected`);

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

io.engine.on("connection_error", (err) => {
  console.log(err.req); // the request object
  console.log(err.code); // the error code, for example 1
  console.log(err.message); // the error message, for example "Session ID unknown"
  console.log(err.context); // some additional error context
});

app.use(cors());
app.use(express.json());

//ROUTES

app.use("/clients", clientsRouter);
app.use("/pros", prosRouter);
app.use("/tasks", tasksRouter);

app.use(errorHandler);

// app.listen(PORT, () => console.log(`Server is running on Port: ${PORT}`));

httpServer.listen(PORT, () => {
  console.log(`Server is running on Port: ${PORT} socket.io is attached`);
});
