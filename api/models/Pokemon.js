const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const pokemonSchema = new mongoose.Schema({
    _id: Schema.Types.ObjectId,
    name: {
        type: String
    },
    description: {
        type: String
    },
    id_parent: {
        type: Number
    },
    image: {
        type: String
    },
    id_national: {
        type: Number
    },
    type1: {
        type: Number
    },
    type2: {
        type: Number
    }
});

module.exports = mongoose.model("Pokemon", pokemonSchema);
