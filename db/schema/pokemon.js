const mongoose = require("mongoose");
const { Schema } = mongoose;
const COLLECTION_NAME = "Pokemon";
const SEED_NUMBER = 10;
let COLLECTION = null;

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
    COLLECTION = mongoose.model(COLLECTION_NAME, new Schema({
        name: String,
        height: String,
        weight: String,
        description: String,
        color: String
    }));
    console.warn(`Created ${COLLECTION_NAME} Collection`);
};

const seed = () => {
    for (let index = 0; index < SEED_NUMBER; index++) {
        const todo = new COLLECTION({
            name: `Poulay-${index}`,
            height: `cheeinmass-height-${index}`,
            weight: `cheeinmass-weight-${index}`,
            description: `Me I just want-${index}`,
            color: `color-${index}`
        });
        todo.save();
    }
    console.warn(`Populated ${COLLECTION_NAME} Collection`);
};

module.exports = {
    reset() {
        _emptyCollection(() => {
            _createCollection();
            seed();
        });
    },
    async getAll() {
        try {
            const pokemons = await COLLECTION.find({});
            const mappedPokemons = pokemons.map(pokemon => pokemon.toJSON());
            return mappedPokemons;
        } catch(e) {
            return [];
        }
    }
};
