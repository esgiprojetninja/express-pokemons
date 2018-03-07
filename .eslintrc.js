module.exports = {
    "extends": "koa",
    "rules": {
        "indent": ["error", 4],
        "quotes": [2, "single", "avoid-escape"],
    },
    "plugins": ["jest"],
    "env": {
        "jest": true
    }
};
