//Schema um unabhängig von dem Client, Task, Pro Chat zu testen
import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
  client_name: {
    type: String,
  },

  pro_name: {
    type: String,
  },

  task_name: {
    type: String,
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

export default mongoose.model("TestChat", chatSchema);
