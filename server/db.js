import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const mongoURI = process.env.MONGO_URI;
console.log(mongoURI);
const connectDB = async () => {
  try {
    console.log("object")
    await mongoose.connect(mongoURI);
    console.log(":) MongoDB connected");
  } catch (err) {
    console.error(":( Failed to connect to MONGODB");
    process.exit(1);
  }
};
export default connectDB;