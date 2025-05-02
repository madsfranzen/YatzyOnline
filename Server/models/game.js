import mongoose from "mongoose"
import Player from "./player.js";

const gameSchema = new mongoose.Schema({
	players: [{type: mongoose.Schema.Types.ObjectId, ref: 'Player'}],
})

const Game = mongoose.model("Game", gameSchema, 'Game');

export default Game;
