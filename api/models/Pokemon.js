const mongoose = require("mongoose");
const { getCollectionName } = require("../../db/schema/pokemon");

const pokemonSchema = new mongoose.Schema({
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

module.exports = mongoose.model(getCollectionName(), pokemonSchema);
