console.log("SERVER STARTED");

import express from "express";

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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})