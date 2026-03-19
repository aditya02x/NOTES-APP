import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./src/routes/auth.route.js";
import noteRoutes from './src/routes/note.route.js'


dotenv.config();

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// routes
app.use("/api/auth", authRoutes);
app.use("/api/notes",noteRoutes)


// port
const PORT = process.env.PORT || 5000;

// DB + server start
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅...MongoDB connected");
    app.listen(PORT, () => {
      console.log(`✅...Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });