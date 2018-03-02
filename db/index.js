require('dotenv').config({ path: './.env.local' });
const mongoose = require('mongoose');
let db = null;

const isConnectionEstablished = () => db && db.host && db.port;

const connect = () => {
    if (isConnectionEstablished()) return;
    mongoose.connect(`mongodb:${process.env.DB_PATH}`);
    db = mongoose.connection;

    db.on('error', console.error.bind(console, 'DB Connection error:: '));
    db.once('open', () => {
        console.log('Mongoose connected !');
    });
};

module.exports = {
    getConnection() {
        return isConnectionEstablished() ? db : null;
    },
    connect
};
