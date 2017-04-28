module.exports = {
    "env": {
        "node": true,
        "es6": true,
        "mocha": true
    },
    "extends": "eslint:recommended",
    "rules": {
        "indent": ["error", 2, { "SwitchCase": 1, "VariableDeclarator": { "var": 2, "let": 2, "const": 3 } }],
        "linebreak-style": ["error", "unix"],
        "quotes": ["error", "single", { "avoidEscape": true, "allowTemplateLiterals": true }],
        "semi": "off",
        "no-console": "off",
        "no-unused-vars": ["error", { "args": "none" }],
        "require-yield": "off",
    }
};
