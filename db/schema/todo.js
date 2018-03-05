const mongoose = require('mongoose');
const { Schema } = mongoose;
const COLLECTION_NAME = 'Todo';
const SEED_NUMBER = 10;
let COLLECTION = null;

const _emptyCollection = callback => {
    mongoose.connection.db.dropCollection('todos', (err, result) => {
        if (err) {
            console.log('Failed to delete Todo model', err);
            return;
        }
        console.log(`Removed ${COLLECTION_NAME} Collection`);
        if (callback && typeof callback === 'function') {
            callback();
        }
    });
};

const _createCollection = () => {
    COLLECTION = mongoose.model(COLLECTION_NAME, new Schema({
        title: String,
        author: String,
        description: String,
        status: String
    }));
    console.log(`Created ${COLLECTION_NAME} Collection`);
};

const seed = () => {
    COLLECTION.deleteMany({});
    for (let index = 0; index < SEED_NUMBER; index++) {
        const todo = new COLLECTION({
            title: `Poulay-${index}`,
            author: `cheeinmass-${index}`,
            description: `Me I just want-${index}`,
            status: index % 2 === 0 ? 'done' : 'todo'
        });
        todo.save();
    };
    console.log(`Populated ${COLLECTION_NAME} Collection`);
};

module.exports = {
    reset() {
        _emptyCollection(() => {
            _createCollection();
            seed();
        });
    }
};
