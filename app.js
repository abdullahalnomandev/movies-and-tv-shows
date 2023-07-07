import "colors";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import globalErrorHandler from "./controllers/errorController.js";
import MovieRouter from "./routes/movieRoutes.js";
import UserRoute from "./routes/userRoutes.js";
import AppError from "./utils/appError.js";
mongoose.set("strictQuery", true);
dotenv.config();
const app = express();

// Middleware
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes

app.use("/api/v1/movie", MovieRouter);
app.use("/api/v1/user", UserRoute);

// Error Handler
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});
app.use(globalErrorHandler);

console.log(process.env.CONNECTION_URL);
// Connection
const connection = async () => {
  try {
    await mongoose.connect(process.env.CONNECTION_URL, {
      useNewUrlParser: true
    });
  } catch (error) {
    console.log("err", error.red);
  }
};

app.listen(5000 || process.env.PORT, () => {
  connection();
  console.log("connected successfully".yellow.bold);
});
