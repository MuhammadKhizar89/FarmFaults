import express from "express";
import cors from "cors";
import connectDB from "./db.js";
import dotenv from "dotenv";
const app = express();
const PORT = process.env.PORT || 5000;
dotenv.config();
connectDB();
app.use(express.json());
app.use(
  cors({
    origin: process.env.CLIENT_BASE_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    exposedHeaders: ["Authorization"]
  })
);
app.get("/", (req, res) => {
  return res.status(200).send({ message: "Hello World" });
});
app.use("/api/auth", (req, res) => {
    return res.status(200).send({ message: "Hello World" });
});
app.use("/api/error", (req, res) => {
    return res.status(200).send({ message: "Hello World" });
});
app.use("/api/dashboard", (req, res) => {
    return res.status(200).send({ message: "Hello World" });
});
app.use("/api/error-enum", (req, res) => {
    return res.status(200).send({ message: "Hello World" });
});
app.use("/api/leaderboard",  (req, res) => {
    return res.status(200).send({ message: "Hello World" });
});
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));