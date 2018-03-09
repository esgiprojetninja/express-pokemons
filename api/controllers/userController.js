const jwt = require("jsonwebtoken");
const _ = require("lodash");
const User = require("../models/User");
const attributesSelect = "id email name pokemons";

/**
 * List all users.
 * @param {*} req
 * @param {*} res
 * @returns {*} res
 */
exports.list_all_users = async function(req, res) {
    try {
        let query = User
            .find({})
            .select(attributesSelect)
            .sort([["_id", "ascending"]]);
        const users = await query.exec();
        return res.json(users);
    } catch (error) {
        return res.status(500).send(error);
    }
};

/**
 * Reads a specific user
 * @param {*} req
 * @param {*} res
 * @returns {*} res
 */
exports.read_user = async function(req, res) {
    try {
        let query = User
            .findOne({ _id: req.params.Id })
            .select(attributesSelect);
        const user = await query.exec();
        return res.json(user);
    } catch (error) {
        return res.status(500).send(error);
    }
};

/**
 * Validates & save a user.
 * @param {*} req
 * @param {*} res
 * @returns {*} res
 */
exports.create_user = async function(req, res) {
    const { email, password } = req.body;
    if (!email || !/(.+)@(.+){2,}\.(.+){2,}/.test(email)) {
        return res.status(400).send("Email must be valid");
    }
    if (!password || password.length < 9) {
        return res.status(401).send("Password should contain at least 8 characters");
    }
    try {
        let userToSave = new User(req.body);
        const user = await userToSave.save();
        return res.json(user);
    } catch (error) {
        return res.status(500).send(error);
    }
};

/**
 * Updates a specific user.
 * @param {*} req
 * @param {*} res
 * @returns {*} res
 */
exports.update_user = async function(req, res) {
    try {
        let query = User.findOneAndUpdate({ _id: req.params.Id }, req.body, { new: true });
        const user = await query.exec();
        return res.json(user);
    } catch (error) {
        return res.status(500).send(error);
    }
};

/**
 * Deletes a specific user.
 * @param {*} req
 * @param {*} res
 */
exports.delete_user = async function(req, res) {
    try {
        let query = User.remove({ _id: req.params.Id });
        await query.exec();
        return res.json(true);
    } catch (error) {
        return res.status(500).send(error);
    }
};


/**
 * Logs a user in.
 * @param {*} res
 * @param {*} res
 */
exports.log_user_in = async function(req, res) {
    const { email, password } = req.body;
    if (!email || email === "") {
        return res.status(401).send("Email is mandatory.");
    }
    try {
        let query = User.findOne({ email: req.body.email });
        const user = await query.exec();
        if (!user || password !== user.password) {
            return res.status(401).send("Couldn't authenticate.");
        }
        const token = jwt.sign({
            exp: 30000000000,
            data: user._id
        }, process.env.SECRET);
        return res.json({
            success: true,
            message: "Login success",
            token: token
        });
    } catch (error) {
        return res.status(500).send(error);
    }
};

exports.capture_pokemons = async function (req, res) {
    const { pokemons } = req.body;
    try {
        let userQuery = User.findById(req.session.userId);
        const user = await userQuery.exec();
        user.pokemons = _.merge(user.pokemons, pokemons).filter(p => p !== null);
        await user.save();
        res.json(user);
    } catch (error) {
        return res.status(500).send(error);
    }
};
