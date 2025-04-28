import express from "express";
import dotenv from "dotenv";
import connectToDatabase from "./config/dbConfig.js";
import playerRoutes from "./routes/playerRoutes.js";

dotenv.config();

const app = express();

async function startServer() {
  try {
    await connectToDatabase();

    app.use(express.json());

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
