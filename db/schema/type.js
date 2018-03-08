const mongoose = require("mongoose");
const fs = require("fs");
const { emptyCollection, createCollection } = require("../utils/collectionTools");
const { Schema } = mongoose;
const COLLECTION_NAME = "Type";
let COLLECTION = null;

const seed = () => {
    JSON.parse(fs.readFileSync("type_data.json", "utf8")).forEach((poke, index) => {
        const todo = new COLLECTION({ ...poke, id: index+1 });
        todo.save();
    });
    console.warn(`Populated ${COLLECTION_NAME} Collection`);
};

module.exports = {
    async reset() {
        if (process.env.NODE_ENV === require("../../utils/consts").testEnv) {
            return;
        }
        await emptyCollection(COLLECTION_NAME);
        COLLECTION = createCollection(COLLECTION_NAME);
        seed();
    },
    getCollectionName() {
        return COLLECTION_NAME;
    }
};
