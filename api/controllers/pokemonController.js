let mongoose = require('mongoose'),
Pokemon = mongoose.model('Pokemon'),
attributesSelect = 'id_pokemon description name id_parent image id_national type1 type2';

/** list pokemons **/
exports.list_all_pokemons = function(req, res) {
    let query = Pokemon.find({}).select(attributesSelect).sort([['id_national', 'ascending']]);
    query.exec(function (err, pokemons) {
        if (err) return res.status(500).send(err);
        res.json(pokemons)
    })
};