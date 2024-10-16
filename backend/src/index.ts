require("dotenv-safe").config();

import "reflect-metadata";
import express from "express";
import cors from "cors";
import authRoutes from "@/routes/authRoutes";
import recipeRoutes from "@/routes/recipeRoutes";
import userRoutes from "@/routes/userRoutes";
import DatabaseService from "@/services/DatabaseService";

const app = express();
app.use(express.json());
// Use the CORS middleware
app.use(
  cors({
    origin: "http://localhost:3000", // Allow requests from this origin
    methods: ["GET", "POST", "PUT", "DELETE"], // Allow these HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allow these headers
  })
);
app.use("/api", authRoutes);
app.use("/api", recipeRoutes);
app.use("/api", userRoutes);

const PORT = process.env.APP_PORT || 3002;

app.listen(PORT, async () => {
  await DatabaseService.initializeDatabase();
  console.log(`Server running on port ${PORT}`);
});
