const express = require("express");
const router = express.Router();

let pokemon = require("../controllers/pokemonController");

/**
 * @swagger
 *   definitions:
 *   Pokemon:
 *     type: object
 *     properties:
 *       name:
 *         type: string
 *       description:
 *         type: string
 *       id_parent:
 *         type: integer
 *       image:
 *         type: string
 *       id_national:
 *         type: integer
 *       type1:
 *         type: integer
 *       type2:
 *         type: integer
 */


/**
 * @swagger
 * /pokemons/:
 *   get:
 *     description: Returns pokemons
 *     produces:
 *      - application/json
 *     responses:
 *       200:
 *         description: Returns a list of pokemon.
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/Pokemon'
 */
router.get("/", pokemon.list_all_pokemons);

/**
 * @swagger
 * /pokemons/:
 *   post:
 *     description: Creates a new pokemon.
 *     produces:
 *      - application/json
 *     parameters:
 *      - name: pokemon
 *        description: The pokemon to create.
 *        in: body
 *        required: true
 *        type: string
 *        schema:
 *          '#/definitions/Pokemon'
 *     responses:
 *       200:
 *         description: Pokemon created.
 *         schema:
 *           type: object
 *           items:
 *             $ref: '#/definitions/Pokemon'
 */
router.post("/", pokemon.create_pokemon);

/**
 * @swagger
 * /pokemons/{id}:
 *   get:
 *     description: Returns a specific pokemon.
 *     produces:
 *      - application/json
 *     parameters:
 *      - name: id
 *        description: The id of the pokemon.
 *        in: path
 *        required: true
 *        type: number
 *     responses:
 *       200:
 *         description: Creates a new pokemon.
 *         schema:
 *           type: object
 *           items:
 *             $ref: '#/definitions/Pokemon'
 */
router.get("/:Id", pokemon.read_pokemon);

/**
 * @swagger
 * /pokemons/{id}:
 *   put:
 *     description: Updates a specific pokemon.
 *     produces:
 *      - application/json
 *     parameters:
 *      - name: id
 *        description: The id of the pokemon.
 *        in: path
 *        required: true
 *        type: integer
 *      - name: pokemon
 *        description: The pokemon to update.
 *        in: body
 *        required: true
 *        type: string
 *        schema:
 *          '#/definitions/Pokemon'
 *     responses:
 *       200:
 *         description: Pokemon updated.
 *         schema:
 *           type: object
 *           items:
 *             $ref: '#/definitions/Pokemon'
 */
router.put("/:Id", pokemon.update_pokemon);

/**
 * @swagger
 * /pokemons/{id}:
 *   delete:
 *     description: Delete a specific pokemon.
 *     produces:
 *      - application/json
 *     parameters:
 *      - name: id
 *        description: The id of the pokemon.
 *        in: path
 *        required: true
 *        type: integer
 *     responses:
 *       200:
 *         description: Pokemon deleted.
 *         schema:
 *           type: object
 *           items:
 *             $ref: '#/definitions/Pokemon'
 */
router.delete("/:Id", pokemon.delete_pokemon);

router.post("/signal", pokemon.set_location);

module.exports = router;