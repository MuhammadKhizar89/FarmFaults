import express from "express";
import cors from "cors";
import connectDB from "./db.js";
import dotenv from "dotenv";
import leaderboardRoute from "./routes/leaderboard.route.js"
const app = express();
const PORT = process.env.PORT || 5000;
import dashboardRoute from './routes/dashboard.route.js'
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
app.use("/api/dashboard", dashboardRoute);

app.use("/api/error-enum", (req, res) => {
    return res.status(200).send({ message: "Hello World" });
});
app.use("/api/leaderboard", leaderboardRoute);
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));