let mongoose = require("mongoose");

let typeSchema = new mongoose.Schema({
    id_type: {
        type: Number
    },
    name: {
        type: String
    },
    color: {
        type: String
    }
});

typeSchema.virtual("pokemons", {
    ref: "Pokemon",
    localField: "id_type",
    foreignField: "types"
});

module.exports = mongoose.model("Type", typeSchema);
