console.log("SERVER STARTED");

import express from "express";
import connectToDatabase from "./database/db.js";
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const app = express();
const port = 10000;

// These two lines simulate __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Pug setup
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (_req, res) => {
  res.render('lobbies', { title: 'Home Page' });
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
