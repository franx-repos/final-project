import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
  client_id: {
    type: mongoose.Schema.ObjectId,
    ref: "Client",
  },

  pro_id: {
    type: mongoose.Schema.ObjectId,
    ref: "Pro",
  },

  task_id: {
    type: mongoose.Schema.ObjectId,
    ref: "Task",
  },

  messages: [
    {
      author_id: {
        type: String,
      },
      text: {
        type: String,
      },
      timestamp: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

export default mongoose.model("Chat", chatSchema);
