const express = require("express");
const router = express.Router();

/* GET pokemons listing. */
router.get("/", (req, res) => {
    res.send([
        {}
    ]);
});

module.exports = router;
