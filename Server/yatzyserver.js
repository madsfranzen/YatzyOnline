console.log("SERVER STARTED");

import express from "express";
import clientPromise from "./database/db.js";


const app = express();
const port = 10000;

app.get('/', (req, res) => {
  console.log("HELLO YATZY");
  res.send('Hello World!')
})

app.get('/play', (req, res) => {
  console.log("HELLO PLAY GAME");
  res.send('Hello Play Game!')
})

app.get('/users', (req, res) => {  
  console.log("REQUESTING USERS");
  const users = clientPromise.collection('inventory').find({});
  res.send(users);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})