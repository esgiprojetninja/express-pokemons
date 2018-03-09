const Type = require("../models/Type");
const SELECT_ATTRIBUTES = "id title description color";

/** list types **/
module.exports.listAllTypes = async (req, res) => {
    try {
        const query = Type.find({}).select(SELECT_ATTRIBUTES).sort([["id", "ascending"]]);
        const types = await query.exec() || [];
        return res.json(types);
    } catch (error) {
        return res.status(500).send(error);
    }
};
