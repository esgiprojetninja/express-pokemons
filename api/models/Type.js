const mongoose = require("mongoose");
const { getCollectionName } = require("../../db/schema/type");

const typeSchema = new mongoose.Schema({
    id: {
        type: Number
    },
    title: {
        type: String
    },
    description: {
        type: String
    },
    color: {
        type: String
    },
});

module.exports = mongoose.model(getCollectionName(), typeSchema);
