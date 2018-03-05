require('dotenv').config({ path: './.env.local' });
const Koa = require('koa');
const Router = require('koa-router');
const Logger = require('koa-logger');
const Cors = require('koa-cors');
const Helmet = require('koa-helmet');
const BodyParser = require('koa-bodyparser');
const Respond = require('koa-respond');
const Database = require('./db');
const globals = require('./utils/consts');

const app = new Koa();
const router = new Router();

// Security middlewares
app.use(Helmet());
app.use(Cors({
    origin: true,
    'Access-Control-Allow-Methods': ['GET', 'PUT', 'POST', 'DELETE'],
    'Access-Control-Allow-Headers': ['Content-Type', 'Authorization']
}));

Database.connect();

// Parser middleware
app.use(BodyParser({
    enableTypes: ['json'],
    jsonLimit: '5mb',
    strict: true,
    onerror(err, ctx) {
        ctx.throw('Body parse error', 422, { err });
    }
}));

if (process.env.NODE_ENV === globals.devEnv) {
    app.use(Logger());
}

// Response middleware
app.use(Respond());

// API routes
require('./routes')(router);
app.use(router.routes());
app.use(router.allowedMethods());

app.listen(process.env.PORT || 3000);
