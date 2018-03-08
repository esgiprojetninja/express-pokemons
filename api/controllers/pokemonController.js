let mongoose = require("mongoose"),
    Pokemon = require("../models/Pokemon"),
    Location = require("../models/Location");
attributesSelect = "id_pokemon description name id_parent image id_national type1 type2";

/** list pokemons **/
exports.list_all_pokemons = async function(req, res) {
    try {
        let query = Pokemon.find({}).select(attributesSelect).sort([["id_national", "ascending"]]);
        const pokemons = await query.exec();
        return res.json(pokemons);
    } catch (error) {
        return res.status(500).send(error);
    }    
};

/** display pokemon **/
exports.read_pokemon = async function(req, res) {
    try {
        let query = Pokemon.find({ id_national: req.params.Id }).select(attributesSelect);
        const pokemons = await query.exec();
        return res.json(pokemons);
    } catch (error) {
        return res.status(500).send(error);
    }    
};

/** create pokemon **/
exports.create_pokemon = async function(req, res) {
    try {
        let new_pokemon = new Pokemon(req.body);
        const pokemons = await new_pokemon.save();
        return res.json(pokemons);
    } catch (error) {
        return res.status(500).send(error);
    }  
};

/** update pokemon **/
exports.update_pokemon = async function(req, res) {
    try {
        let query = Pokemon.findOneAndUpdate({ id_national: req.params.Id }, req.body, { new: true });
        const pokemons = await query.exec();
        return res.json(pokemons);
    } catch (error) {
        return res.status(500).send(error);
    } 
};

/** delete pokemon **/
exports.delete_pokemon = async function(req, res) {
    try {
        let query = Pokemon.remove({ id_national: req.params.Id });
        const pokemons = await query.exec();
        return res.json(pokemons);
    } catch (error) {
        return res.status(500).send(error);
    }
};

/** add a location **/
exports.set_location = async function(req, res) {
    try {
        let new_location = new Location(req.body);
        const location = await new_location.save();
        return res.json(location);
    } catch (error) {
        return res.status(500).send(error);
    }  
};

/** list pokemons **/
exports.get_marked = async function(req, res) {
    let datetime = new Date();
    try {
        let query = Location.find({ where:{ $and:[{ date_created: { $lte: this.datetime } },{ date_created: { $gte: this.datetime } }] }, include: [Pokemon] }).select(attributesSelect);
        const pokemons = await query.exec();
        return res.json(pokemons);
    } catch (error) {
        return res.status(500).send(error);
    }    
};