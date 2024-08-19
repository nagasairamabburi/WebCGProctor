import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import examRoutes from "./routes/examRoutes.js";
import path from "path";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

dotenv.config();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));
// Routes
app.use("/api/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api", examRoutes);

// Server Setup
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
