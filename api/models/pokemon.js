const mongoose = require("mongoose");

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
    types: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Type"
        }
    ]
});

module.exports = mongoose.model("Pokemon", pokemonSchema);
