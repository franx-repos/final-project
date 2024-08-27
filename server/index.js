import express from "express";
import "./db/server.js";
import clientsRouter from "./routes/clientsRouter.js";
import prosRouter from "./routes/prosRouter.js";
import tasksRouter from "./routes/tasksRouter.js";
import chatRouter from "./routes/chatRouter.js";
import { errorHandler } from "./middlewares/ErrorHandler.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import { createServer } from "http";
import { Server } from "socket.io";
import { instrument } from "@socket.io/admin-ui";
import { create } from "domain";
import Chat from "./models/chatSchema.js";

const app = express();
const PORT = 8001;

// attaching socket.io to express server
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: [
      "http://localhost:5173",
      "https://admin.socket.io/",
      "https://tax-max-rm6g.onrender.com",
      "https://taxmax.netlify.app/",
    ],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  // console.log(`${socket.id} user just connected`);
  // console.log(`${io.engine.clientsCount} user are connected`);
  // may or may not be similar to the count of Socket instances in the main namespace, depending on your usage
  const count2 = io.of("/").sockets.size;
  // console.log(count2);

  socket.emit("connectionStatus", `Connection under socket ID ${socket.id}`);

  socket.on("userJoins", (data) => {
    //console.log(data);
    io.emit(
      "userJoinResponse",
      `${data.username} is connected using socket ${data.socketID}`
    );
  });

  //room is the task id later
  socket.on("join-room", (room) => {
    // console.log(`${socket.id} join room: ${room}`);
    socket.join(room);
  });

  socket.on("send-message", (message, room) => {
    // console.log(socket.rooms);
    // console.log(message);
    //  console.log(`Message from Room: ${room}`);
    if (room === "" || room === undefined) {
      socket.broadcast.emit("recieve-message", message);
      socket.to("Room1").emit("some event", message);
      //   console.log(message);
    } else {
      // socket.to(room).emit("recieve-message", message);
      io.to(room).emit("recieve-message", message);
      // console.log("Emitting recieve-message event");
      //Message speichern
      // try {
      //   const updateChat = Chat.findByIdAndUpdate(
      //     message.author_id,
      //     { $push: { messages: message } },
      //     { new: true }
      //   );
      // } catch (error) {
      //   console.log(error);
      // }
    }
  });

  socket.on("disconnect", () => {
    // console.log("A user disconnected");
  });
});

io.engine.on("connection_error", (err) => {
  // console.log(err.req); // the request object
  //console.log(err.message); // the error "Session ID unknown"
});

instrument(io, {
  auth: false,
  mode: "development",
});

app.use(
  cors({
    origin: ["http://localhost:5173", "https://tax-max-rm6g.onrender.com"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

//ROUTES

app.use("/clients", clientsRouter);
app.use("/pros", prosRouter);
app.use("/tasks", tasksRouter);
app.use("/chats", chatRouter);

app.use(errorHandler);

httpServer.listen(PORT, () => {
  // console.log(`Server is running on Port: http://localhost:${PORT}`);
});
