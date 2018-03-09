const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema({
    longitude: {
        type: Number
    },
    latitude: {
        type: Number
    },
    id_pokemon: {
        type: Number
    },
    date_created: {
        type : Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Location", locationSchema);
