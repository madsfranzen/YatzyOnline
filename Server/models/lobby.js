import mongoose from "mongoose";

const lobbySchema = new mongoose.Schema({
	lobbyName: {type: String, required: true},
	playerCount: {type: Number, required: false, default: 0},
	playerMax: {type: Number, required: true},
	game: {type: mongoose.Schema.Types.ObjectId, ref: 'Game'},
});

const Lobby = mongoose.model("Lobby", lobbySchema, 'Lobby');

export default Lobby;

