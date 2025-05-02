import mongoose from "mongoose";
import Player from "./player.js";
import Game from "./game.js";

const lobbySchema = new mongoose.Schema({
	lobbyName: {type: String, required: true},
	playerMax: {type: Number, required: true},
	players: [{type: mongoose.Schema.Types.ObjectId, ref: 'Player'}],
	status: Boolean
});

const Lobby = mongoose.model("Lobby", lobbySchema, 'Lobby');

export default Lobby;
