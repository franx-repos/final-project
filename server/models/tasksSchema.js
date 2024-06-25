import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  content: {
    title: {
      type: String,
      required: true,
    },
    create_date: {
      type: Date,
      default: Date.now,
    },
    finish_date: {
      type: Date,
    },
    deadline: {
      type: Date,
    },
    payment: {
      type: Boolean,
      default: false,
    },
    price: {
      type: Number,
    },
    task_type: {
      type: [String],
    },
    industry: {
      type: [String],
    },
    description: {
      type: String,
    },
    status: {
      type: String,
      default: "OPEN",
    },
    assigned_to: {
      type: mongoose.Schema.ObjectId,
      ref: "Pro",
    },
    created_by: {
      type: mongoose.Schema.ObjectId,
      ref: "Client",
    },
  },
  documents: [
    {
      documentstitle: {
        type: String,
      },
      url: {
        type: String,
      },
      public_id: {
        type: String,
      },
      icon: {
        type: String,
      },
    },
  ],
});

export default mongoose.model("Task", taskSchema);
