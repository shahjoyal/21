import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import { connectDB } from "../server/config/db.js";

import authRoutes from "../server/routes/authRoutes.js";
import productRoutes from "../server/routes/productRoutes.js";
import orderRoutes from "../server/routes/orderRoutes.js";
import paymentRoutes from "../server/routes/paymentRoutes.js";
import settingsRoutes from "../server/routes/settingsRoutes.js";

const app = express();

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

// Connect MongoDB
let dbPromise;

app.use(async (req, res, next) => {
  try {
    if (!dbPromise) {
      dbPromise = connectDB();
    }

    await dbPromise;
    next();
  } catch (error) {
    console.error("Database connection error:", error);
    res.status(500).json({
      message: "Database connection failed",
    });
  }
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/payment", paymentRoutes);

// Contains /settings and /slots
app.use("/api", settingsRoutes);

app.get("/api", (req, res) => {
  res.json({
    message: "21 Kalya Modak API is running",
  });
});

export default app;