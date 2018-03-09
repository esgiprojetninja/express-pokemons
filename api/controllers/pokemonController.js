const Pokemon = require("../models/Pokemon");
const Location = require("../models/Location");
const attributesSelect = "id_pokemon description name id_parent image id_national type1 type2";

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
        const pokemon = await new_pokemon.save();
        return res.json(pokemon);
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
        await query.exec();
        return res.json(true);
    } catch (error) {
        return res.status(500).send(error);
    }
};

/** know if pokemon can have a parent **/
exports.can_have_parent = async function(req, res) {
    try {
        let query = Pokemon.findOne({ id_parent: req.params.Id }).select("id_parent");
        let pokemon = await query.exec();
        if (pokemon) { // Si le pokemon a un parent
            return res.json("false");
        }
        query = Pokemon.findOne({ id_national: req.params.Id }).select("id_parent");
        let secondPokemon = await query.exec();
        if(secondPokemon.id_parent != null) { // S'il existe un pokemon avant celui ci
            query = Pokemon.findOne({ id_national: secondPokemon.id_parent }).select("id_parent");
            let thirdPokemon = await query.exec();
            if(thirdPokemon.id_parent != null ){ // S'il existe un deuxieme pokemon avant celui ci
                return res.json("false");
            }
        }
        return res.json("true");
    } catch (error) {
        return res.status(500).send(error);
    }
};

/** get all pokemon which can evolve **/
exports.get_dispo_for_evolve = async function(req, res) {
    try {
        const queryFindById = Pokemon.findOne({ id_national: req.params.Id }).select(attributesSelect);
        const pokemonFindById = await queryFindById.exec();
        const queryAllPokemons = Pokemon.find({}).select("id_national name id_parent").sort([["id_national", "ascending"]]);
        const allPokemons = await queryAllPokemons.exec();
        const possibleParentsToAll = [];
        allPokemons.forEach(pokemon => {
            // checker s'il n'a pas de parent
            if(pokemon.id_parent) {
                return;
            }

            // checker si il a un parent
            if (pokemon.id_parent) {
                const parentPokemon = allPokemons.find(poke => poke.id_national === pokemon.id_parent);
                if(parentPokemon.id_parent) {
                    return;
                }
            }
            // check si l'id recu a des enfants
            // oui: 

        });
        return res.json(possibleParentsToAll);
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

/** list marked pokemons **/
exports.list_marked_pokemons = () => ([]);
