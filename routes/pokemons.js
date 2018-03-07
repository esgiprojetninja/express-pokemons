const express = require("express");

const pokemonsDb = require("../db/schema/pokemon");

const router = express.Router();

/* GET pokemons listing. */
router.get("/", async (req, res) => {
    res.send({
        pokemons: await pokemonsDb.getAll()
    });
});

module.exports = router;
