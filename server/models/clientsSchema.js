import mongoose from "mongoose";

const clientSchema = new mongoose.Schema({
  sowo_id: {
    type: String,
    required: [true, "sowo_id is required"],
    unique: true,
    trim: true,
  },
  name: {
    type: String,
    required: [true, "name is required"],
  },
  house: {
    type: String,
    required: [true, "house is required"],
  },
  timeOfArrival: {
    type: Date,
  },

  // image_url: {
  //   type: String,
  // },
  // tags: {
  //   type: [String],
  //   default: "NEW",
  // },
});

export default mongoose.model("Client", clientSchema);
