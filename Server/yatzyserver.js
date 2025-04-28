console.log("SERVER STARTED");

import express from "express";
import connectToDatabase from "./database/db.js";

const app = express();
const port = 10000;

app.get("/", (_req, res) => {
  console.log("HELLO YATZY");
  res.send("Hello World!");
});

app.get("/play", (_req, res) => {
  console.log("HELLO PLAY GAME");
  res.send("Hello Play Game!");
});

app.get("/users", async (_req, res) => {
  const db = await connectToDatabase();
  const users = await db.collection("users").find().toArray();
  console.log(users);
  res.send(users);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
