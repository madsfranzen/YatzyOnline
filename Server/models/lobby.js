import mongoose from "mongoose";

const lobbySchema = new mongoose.Schema({
	lobbyName: {type: String, required: true},
	playerMax: {type: Number, required: true},
	players: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Player'}],
	game: {type: mongoose.Schema.Types.ObjectId, ref: 'Game'},
});

const Lobby = mongoose.model("Lobby", lobbySchema, 'Lobby');

export default Lobby;

