import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";

dotenv.config();

mongoose
  .connect(process.env.MONGODB__URL)
  .then(() => {
    console.log("DB Connection Established.");
  })
  .catch((error) => {
    console.log(error);
  });

const app = express();

app.use(express.json());

app.listen(3000, () => {
  console.log(`Server Running On Port : 3000`);
});

// ------------ API ROUTES ---------------
app.use("/api/V1/user", userRoutes);

// Signup Route :
app.use("/api/v1/auth", authRoutes);

// Signin Route :
app.use("/api/v1/auth", authRoutes);

// ------------ MIDDLEWARES ---------------

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
