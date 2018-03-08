let mongoose = require('mongoose'),
Pokemon = require('../models/Pokemon');
attributesSelect = 'id_pokemon description name id_parent image id_national type1 type2';

/** list pokemons **/
exports.list_all_pokemons = function(req, res) {
    let query = Pokemon.find({}).select(attributesSelect).sort([['id_national', 'ascending']]);
    query.exec(function (err, pokemons) {
        if (err) return res.status(500).send(err);
        res.json(pokemons)
    })
};

/** display pokemon **/
exports.read_pokemon = function(req, res) {
    let query = Pokemon.find({id_national: req.params.Id}).select(attributesSelect);
    query.exec(function (err, pokemons) {
        if (err)
            res.send(err)
        res.json(pokemons)
    })
};

/** create pokemon **/
exports.create_pokemon = function(req, res) {
    let new_pokemon = new Pokemon(req.body);
    new_pokemon.save(function(err, pokemon) {
        if (err)
            res.send(err);
        res.json(pokemon);
    });
};

/** update pokemon **/
exports.update_pokemon = function(req, res) {
    Pokemon.findOneAndUpdate({id_national: req.params.Id}, req.body, {new: true}, function(err, pokemon) {
        if (err)
            res.send(err);
        res.json(pokemon);
    });
};

/** delete pokemon **/
exports.delete_pokemon = function(req, res) {
    Pokemon.remove({
        id_national: req.params.Id
    }, function(err, pokemon) {
        if (err)
            res.send(err);
        res.json({ message: 'Pokemon successfully deleted' });
    });
};