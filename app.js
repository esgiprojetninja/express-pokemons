require("dotenv").config({ path: "./.env.local" });
const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");
const DataBase = require("./db");
const { devEnv } = require("./utils/consts");

const app = express();
DataBase.connect();

if ( process.env.NODE_ENV === devEnv ) {
    app.use(logger("dev"));
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/", require("./routes/index"));
app.use("/pokemons", require("./routes/pokemons"));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    const err = new Error("Not Found");
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV === devEnv ? err : {};
    
    // render the error page
    res.status(err.status || 500);
    res.render("error");
});

module.exports = app;
