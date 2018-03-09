const express = require("express");

const tokenUtils = require("../../utils/token");
const UserController = require("../controllers/userController");

const router = express.Router();

router.use(tokenUtils.checkToken);

/**
 * @swagger
 *   definitions:
 *   User:
 *     type: object
 *     properties:
 *       id:
 *         type: number
 *       email:
 *         type: string
 *       password:
 *         type: string
 *         format: password
 *       pokemons:
 *         type: array
 *         items:
 *           $ref: '#/definitions/Pokemon'
 */

/**
 * @swagger
 * /auth/:
 *   get:
 *     description: Returns users.
 *     produces:
 *      - application/json
 *     responses:
 *       200:
 *         description: A list of users.
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/User'
 */
router.get("/", UserController.list_all_users);

/**
 * @swagger
 * /auth/:
 *   post:
 *     description: Creates a new user.
 *     produces:
 *      - application/json
 *     parameters:
 *      - name: user
 *        description: The user to create.
 *        in: body
 *        required: true
 *        type: string
 *        schema:
 *          '#/definitions/User'
 *     responses:
 *       200:
 *         description: User created.
 *         schema:
 *           type: object
 *           items:
 *             $ref: '#/definitions/User'
 */
router.post("/", UserController.create_user);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     description: Returns a specific user.
 *     produces:
 *      - application/json
 *     parameters:
 *      - name: id
 *        description: The id of the user.
 *        in: path
 *        required: true
 *        type: number
 *     responses:
 *       200:
 *         description: Creates a new user.
 *         schema:
 *           type: object
 *           items:
 *             $ref: '#/definitions/User'
 */
router.get("/:Id", UserController.read_user);

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     description: Updates a specific user.
 *     produces:
 *      - application/json
 *     parameters:
 *      - name: id
 *        description: The id of the user.
 *        in: path
 *        required: true
 *        type: integer
 *      - name: user
 *        description: The user to update.
 *        in: body
 *        required: true
 *        type: string
 *        schema:
 *          '#/definitions/User'
 *     responses:
 *       200:
 *         description: User updated.
 *         schema:
 *           type: object
 *           items:
 *             $ref: '#/definitions/User'
 */
router.put("/:Id", UserController.update_user);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     description: Delete a specific user.
 *     produces:
 *      - application/json
 *     parameters:
 *      - name: id
 *        description: The id of the user.
 *        in: path
 *        required: true
 *        type: integer
 *     responses:
 *       200:
 *         description: User deleted.
 */
router.delete("/:Id", UserController.delete_user);

module.exports = router;
