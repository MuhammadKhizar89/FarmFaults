import express from "express";
import cors from "cors";
import connectDB from "./db.js";
import dotenv from "dotenv";
import leaderboardRoute from "./routes/leaderboard.route.js"
import errorEnumRouter from "./routes/errorEnum.route.js";
import errorRouter from "./routes/errorReport.route.js";
import authRouter from "./routes/auth.route.js";
import dashboardRouter from "./routes/dashboard.route.js";
import cookieParser from "cookie-parser";
const app = express();
const PORT = process.env.PORT || 5000;
dotenv.config();
connectDB();
app.use(cookieParser());
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

app.use("/api/auth", authRouter);
app.use("/api/error", errorRouter);
app.use("/api/error-enum", errorEnumRouter);
app.use("/api/leaderboard", leaderboardRoute);
app.use("/api/dashboard",dashboardRouter);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal server error";
  res.status(statusCode).send({
    success: false,
    message,
  });
});
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));