require("dotenv").config({ path: "./.env.local" });
const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");
const DataBase = require("./db");
const { devEnv } = require("./utils/consts");
const swaggerUi = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");

/* Swagger config */
const options = {
    swaggerDefinition: {
        info: {
            title: "Hello World", // Title (required)
            version: "1.0.0", // Version (required)
        },
    },
    apis: [
        "./routes/index.js",
        "./routes/pokemons.js"
    ], // Path to the API docs
};
// Initialize swagger-jsdoc -> returns validated swagger spec in json format
const swaggerSpec = swaggerJSDoc(options);
/* End Swagger config */

const app = express();
DataBase.connect();

if ( process.env.NODE_ENV === devEnv ) {
    app.use(logger("dev"));
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/", require("./routes/index"));
app.use("/pokemons", require("./routes/pokemons"));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

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
