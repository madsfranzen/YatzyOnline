import express from "express";
import dotenv from "dotenv";
import connectToDatabase from "./config/dbConfig.js";
import playerRoutes from "./routes/playerRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import lobbyRoutes from "./routes/lobbyRoutes.js";
import logicRoutes from "./routes/logicRoutes.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import { authenticateToken } from "./middleware/auth.js";

dotenv.config();

const app = express();

async function startServer() {
  try {
    await connectToDatabase();

    app.use(express.json());
    app.use(cookieParser());

    app.use(
      cors({
        origin: [
          "http://localhost:3000",
          "https://yatzyonline-client.onrender.com",
          "https://yatzy-online.vercel.app/",
        ], // List of allowed origins
        credentials: true, // Allow credentials (cookies, auth tokens, etc.)
      }),
    );

    app.use("/api/auth", authRoutes);

    app.use("/api/players", playerRoutes);

    app.use("/api/lobbies", lobbyRoutes);

    app.use("/api/logic", authenticateToken, logicRoutes);

    const port = process.env.SERVER_PORT;
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error(error);
  }
}

startServer();
