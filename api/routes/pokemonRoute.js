const express = require("express");
const router = express.Router();

let pokemon = require("../controllers/pokemonController");

router.get("/", pokemon.list_all_pokemons);
router.post("/", pokemon.create_pokemon);

router.get("/:Id", pokemon.read_pokemon);
router.put("/:Id", pokemon.update_pokemon);
router.delete("/:Id", pokemon.delete_pokemon);

router.post("/signal", pokemon.set_location);

module.exports = router;