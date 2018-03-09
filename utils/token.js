const jwt = require("jsonwebtoken");

exports.checkToken = (req, res, next) => {
    if (!req.headers["authorization"]) {
        return res.status(403).send("Unauthorized");
    }
    const authHeaderArray = req.headers["authorization"].split(" ");
    if (authHeaderArray[0] !== "Bearer") {
        return res.status(403).send("Unauthorized");
    }

    const token = authHeaderArray[1];

    if (token) {
        try {
            jwt.verify(token, process.env.SECRET);
            next();
        } catch(err) {
            return res.status(403).send("Unauthorized");
        }
    } else {
        return res.status(403).send("Token not provided");
    }
};
