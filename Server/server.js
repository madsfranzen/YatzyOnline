import express from "express";
import dotenv from "dotenv";
import connectToDatabase from "./config/dbConfig.js";
import playerRoutes from "./routes/playerRoutes.js";
import session from "express-session";
import { CheckSession } from "./middleware/auth.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();
const cors = require("cors");

async function startServer() {
  try {
    await connectToDatabase();

    app.use(express.json());
    app.use(cors());

    app.use(
      session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
      }),
    );

    app.use(CheckSession);

    app.use("/auth", authRoutes);

    app.use("/api/players", playerRoutes);

    const port = process.env.SERVER_PORT;
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error(error);
  }
}

startServer();
