'use strict';

let express = require('express');
let router = express.Router();

module.exports = router;

router.get('/', function (req, res) {
	res.end('It works on /test');
});
