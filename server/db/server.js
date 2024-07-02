import mongoose from "mongoose";

const connectDB = async () => {
  console.log(process.env.MONGO_URI);
  try {
    await mongoose.connect(process.env.MONGO_URI, { family: 4 });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Connection error:", error.stack);
  }
};
connectDB();
