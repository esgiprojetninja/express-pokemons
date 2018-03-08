const mongoose = require("mongoose");
const { Schema } = mongoose;
const COLLECTION_NAME = "Pokemon";
const SEED_NUMBER = 10;
let COLLECTION = null;
const fs = require("fs");

const _emptyCollection = callback => {
    const name = `${COLLECTION_NAME.toLowerCase()}s`;
    mongoose.connection.db.listCollections({ name })
        .next((err, collinfo) => {
            if (err) {
                console.error(`Failed to delete ${COLLECTION_NAME} model`, err);
                return;
            }
            if (collinfo) {
                mongoose.connection.db.dropCollection(name, (err) => { 
                    if (err) {
                        console.error(`Failed to delete ${COLLECTION_NAME} model`, err);
                        return;
                    }
                    console.warn(`Removed ${COLLECTION_NAME} Collection`);
                    if (callback && typeof callback === "function") {
                        callback();
                    }
                    return;
                });
            } else {
                callback();
            }
        });
  
};

const _createCollection = () => {
    COLLECTION = mongoose.model(COLLECTION_NAME);
    console.warn(`Created ${COLLECTION_NAME} Collection`);
};

const seed = () => {

    JSON.parse(fs.readFileSync("pokemon_data.json", "utf8")).forEach((poke) => {
        const todo = new COLLECTION({ ...poke });
        todo.save();
    });

    console.warn(`Populated ${COLLECTION_NAME} Collection`);
};

module.exports = {
    reset() {
        if ( process.env.NODE_ENV === require("../../utils/consts").testEnv) {
            return;
        }
        _emptyCollection(() => {
            _createCollection();
            seed();
        });
    }
};
