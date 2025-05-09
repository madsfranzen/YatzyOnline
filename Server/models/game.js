import mongoose, { mongo } from "mongoose";

const gameSchema = new mongoose.Schema({
  lobby: { type: mongoose.Schema.Types.ObjectId, ref: "Lobby" },
  players: [
    {
      player: { type: mongoose.Schema.Types.ObjectId, ref: "Player" },
		isTurn: {type : Boolean, default: false},
      scoreboard: {
        ones: {
          value: { type: Number, default: 0 },
          status: { type: Boolean, default: false },
        },
        twos: {
          value: { type: Number, default: 0 },
          status: { type: Boolean, default: false },
        },
        threes: {
          value: { type: Number, default: 0 },
          status: { type: Boolean, default: false },
        },
        fours: {
          value: { type: Number, default: 0 },
          status: { type: Boolean, default: false },
        },
        fives: {
          value: { type: Number, default: 0 },
          status: { type: Boolean, default: false },
        },
        sixes: {
          value: { type: Number, default: 0 },
          status: { type: Boolean, default: false },
        },
        onePairs: {
          value: { type: Number, default: 0 },
          status: { type: Boolean, default: false },
        },
        twoPairs: {
          value: { type: Number, default: 0 },
          status: { type: Boolean, default: false },
        },
        threePairs: {
          value: { type: Number, default: 0 },
          status: { type: Boolean, default: false },
        },
        fourPairs: {
          value: { type: Number, default: 0 },
          status: { type: Boolean, default: false },
        },
        fullHouse: {
          value: { type: Number, default: 0 },
          status: { type: Boolean, default: false },
        },
        smallStraight: {
          value: { type: Number, default: 0 },
          status: { type: Boolean, default: false },
        },
        largeStraight: {
          value: { type: Number, default: 0 },
          status: { type: Boolean, default: false },
        },
        chance: {
          value: { type: Number, default: 0 },
          status: { type: Boolean, default: false },
        },
        yatzy: {
          value: { type: Number, default: 0 },
          status: { type: Boolean, default: false },
        },
        bonus: {
          value: { type: Number, default: 0 },
          status: { type: Boolean, default: true },
        },
        total: {
          value: { type: Number, default: 0 },
          status: { type: Boolean, default: true },
        },
        totalScore: {
          value: { type: Number, default: 0 },
          status: { type: Boolean, default: true },
        },
      },
    },
  ],
  throwCount: {type: Number, default: 0},
});

const Game = mongoose.model("Game", gameSchema, "Game");

export default Game;
