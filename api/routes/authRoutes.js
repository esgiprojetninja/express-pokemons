const express = require("express");
const router = express.Router();
const UserController = require("../controllers/userController");

/**
 * @swagger
 * /users/login:
 *   delete:
 *     description: Logs a user in.
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
 *         description: token.
 */
router.post("/login", UserController.log_user_in);

/**
 * @swagger
 * /users/:
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

module.exports = router;