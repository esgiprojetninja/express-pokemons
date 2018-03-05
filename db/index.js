require('dotenv').config({ path: './.env.local' });
const mongoose = require('mongoose');
const globals = require('../utils/consts');
const todos = require('./schema/todo');

const isConnectionEstablished = () => mongoose.connection && mongoose.connection.host && mongoose.connection.port;

const connect = () => {
    if (isConnectionEstablished()) return;
    mongoose.connect(`mongodb:${process.env.DB_PATH}`, {
        autoReconnect: true
    });
    const db = mongoose.connection;

    db.on('error', console.error.bind(console, 'DB Connection error:: '));
    db.once('open', () => {
        console.log('Mongoose connected !');
        if (process.env.NODE_ENV === globals.devEnv) {
            todos.reset();
        }
    });
};

module.exports = {
    connect
};
