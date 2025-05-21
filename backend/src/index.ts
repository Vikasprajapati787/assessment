// src/index.ts
import express, { Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { AppDataSource } from "./data-source";
import authRoutes from "./routes/auth";
import softwareRoutes from "./routes/software";
import requestRoutes from "./routes/requests";

dotenv.config();

const app = express();
app.use(bodyParser.json());

// Initialize DB
AppDataSource.initialize()
  .then(() => {
    console.log("DB connected");
  })
  .catch((err: any) => {
    console.error("DB connection error:", err);
  });

// Route handlers
app.use("/api/auth", authRoutes);
app.use("/api/software", softwareRoutes);
app.use("/api/requests", requestRoutes);

// Global error handler
app.use(
  (err: any, req: Request, res: Response, next: NextFunction) => {
    console.error("Unhandled error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
