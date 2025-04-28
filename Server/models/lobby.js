import mongoose from "mongoose";
import Player from "./player.js";
import Game from "./game.js";

const lobbySchema = new mongooseSchema({
	lobbyName: {type: String, required: true},
	playerMax: {type: Number, required: true},
	players: [Player],
	status: Boolean,
	game: Game,
});

const Lobby = mongoose.model("Lobby", lobbySchema);

export default Lobby;
