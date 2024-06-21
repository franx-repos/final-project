import express from "express";
import "./db/server.js";
import clientsRouter from "./routes/clientsRouter.js";
import prosRouter from "./routes/prosRouter.js";
import tasksRouter from "./routes/tasksRouter.js";
import chatRouter from "./routes/chatRouter.js";
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

  socket.emit("connectionStatus", `Connection under socket ID ${socket.id}`);

  socket.on("userJoins", (data) => {
    console.log(data);
    io.emit(
      "userJoinResponse",
      `${data.username} is connected using socket ${data.socketID}`
    );
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

io.engine.on("connection_error", (err) => {
  console.log(err.req); // the request object
  console.log(err.message); // the error "Session ID unknown"
});

app.use(cors());
app.use(express.json());

//ROUTES

app.use("/clients", clientsRouter);
app.use("/pros", prosRouter);
app.use("/tasks", tasksRouter);
app.use("/chats", chatRouter);

app.use(errorHandler);

// app.listen(PORT, () => console.log(`Server is running on Port: ${PORT}`));

httpServer.listen(PORT, () => {
  console.log(`Server is running on Port: ${PORT} socket.io is attached`);
});
