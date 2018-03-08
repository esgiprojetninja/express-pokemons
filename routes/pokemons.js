const express = require("express");

const pokemonsDb = require("../db/schema/pokemon");

const router = express.Router();

/**
 * @swagger
 * definitions:
 *   Pokemon:
 *     type: object
 *     properties:
 *       username:
 *         type: string
 *       password:
 *         type: string
 *         format: password
 */

/**
 * @swagger
 * /pokemons/:
 *   get:
 *     description: List all pokemons
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: La list of pokemons
 *         schema:
 *           type: array
 *           items:
 *             $ref: "#definitions/Pokemon"
 */
router.get("/", async (req, res) => {
    res.send({
        pokemons: await pokemonsDb.getAll()
    });
});

module.exports = router;
