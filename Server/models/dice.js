import mongoose from 'mongoose';

const diceSchema = new mongoose.Schema({
    throwCount: { type: Number  },
    values: { type: [Number] },
    holdStatus: { type: [Boolean] },
    player: { type: mongoose.Schema.Types.ObjectId, ref: 'Player' },
    game: { type: mongoose.Schema.Types.ObjectId, ref: 'Game' },
    ones: { value: { type: Number, default: 0 }, status: { type: Boolean, default: false }},
    twos: { value: { type: Number, default: 0 }, status: { type: Boolean, default: false }},
    threes: { value: { type: Number, default: 0 }, status: { type: Boolean, default: false }},
    fours: { value: { type: Number, default: 0 }, status: { type: Boolean, default: false }},
    fives: { value: { type: Number, default: 0 }, status: { type: Boolean, default: false }},
    sixes: { value: { type: Number, default: 0 }, status: { type: Boolean, default: false }},
    onePairs: { value: { type: Number, default: 0 }, status: { type: Boolean, default: false }},
    twoPairs: { value: { type: Number, default: 0 }, status: { type: Boolean, default: false }},
    threePairs: { value: { type: Number, default: 0 }, status: { type: Boolean, default: false }},
    fourPairs: { value: { type: Number, default: 0 }, status: { type: Boolean, default: false }},
    fullHouse: { value: { type: Number, default: 0 }, status: { type: Boolean, default: false }},
    smallStraight: { value: { type: Number, default: 0 }, status: { type: Boolean, default: false }},
    largeStraight: { value: { type: Number, default: 0 }, status: { type: Boolean, default: false }},
    chance: { value: { type: Number, default: 0 }, status: { type: Boolean, default: false }},
    yatzy: { value: { type: Number, default: 0 }, status: { type: Boolean, default: false }}
});


const Dice = mongoose.model("Dice", diceSchema, 'Dice');

export default Dice;