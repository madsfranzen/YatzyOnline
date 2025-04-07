console.log("SERVER STARTED");

import express from "express";

const app = express();
const port = 10000;

app.get('/', (req, res) => {
  console.log("HELLO YATZY");
})


app.get('/play', (req, res) => {
  console.log("HELLO PLAY GAME");
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})