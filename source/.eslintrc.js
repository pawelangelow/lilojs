module.exports = {
	"parserOptions": {
        "ecmaVersion": 2017
    },
    "env": {
        "browser": true,
        "es6": true,
        "node": true
    },
    "extends": "eslint:recommended",
    "rules": {
        "indent": [
            "error",
            "tab",
			{"SwitchCase": 1}
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "always"
        ],
		"no-console": [2],
		"no-fallthrough": [0],
		"no-loop-func": [1],
		"no-mixed-spaces-and-tabs": [
			2,
			"smart-tabs"
		],
		"no-multiple-empty-lines": [
			2,
			{ "max": 1 }
		],
		"no-process-exit": [0],
		"no-shadow": [0],
		"no-underscore-dangle": [0],
		"no-var": [2],
		"camelcase": [
			2,
			{ "properties": "always" }
		],
		"consistent-this": [
			1,
			"self"
		],
		"curly": [
			2,
			"all"
		],
		"keyword-spacing": [2],
		"new-cap": [1],
		"prefer-const": [2],
		"require-yield": [1],
		"space-infix-ops": [2]
    }
};
