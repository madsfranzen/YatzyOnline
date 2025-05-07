import mongoose from "mongoose"

const gameSchema = new mongoose.Schema({
	players: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Player' }],
	dices: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Dice' }],
})

const Game = mongoose.model("Game", gameSchema, 'Game');

export default Game;