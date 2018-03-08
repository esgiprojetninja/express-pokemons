const express = require("express");
const router = express.Router();

let pokemon = require('../controllers/pokemonController');

router.get('/pokemons', pokemon.list_all_pokemons);
router.post('/pokemons', pokemon.create_pokemon);

router.get('/pokemons/:Id', pokemon.read_pokemon);
router.put('/pokemons/:Id', pokemon.update_pokemon);
router.delete('/pokemons/:Id', pokemon.delete_pokemon);

module.exports = router;