const fs = require("fs");
const { emptyCollection, createCollection } = require("../utils/collectionTools");
const COLLECTION_NAME = "Pokemon";
let COLLECTION = null;

const seed = () => {
    JSON.parse(fs.readFileSync("pokemon_data.json", "utf8")).forEach((poke) => {
        const todo = new COLLECTION({ ...poke });
        todo.save();
    });
    console.warn(`Populated ${COLLECTION_NAME} Collection`);
};

module.exports = {
    async reset() {
        if ( process.env.NODE_ENV === require("../../utils/consts").testEnv) {
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
