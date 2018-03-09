const express = require("express");

const tokenUtils = require("../../utils/token");
const type = require("../controllers/typeController");

const router = express.Router();

router.use(tokenUtils.checkToken);

/**
 * @swagger
 *   definitions:
 *   Type:
 *     type: object
 *     properties:
 *       id:
 *         type: number
 *       title:
 *         type: string
 *       description:
 *         type: string
 *       color:
 *         type: string
 */

/**
 * @swagger
 * /types/:
 *   get:
 *     description: Returns types
 *     produces:
 *      - application/json
 *     responses:
 *       200:
 *         description: Returns a list of types.
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/Type'
 */
router.get("/", type.listAllTypes);

module.exports = router;
