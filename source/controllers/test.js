'use strict';

const express = require('express');
const router = express.Router();

module.exports = router;

router.get('/', function (req, res) {
	res.end('It works on /test');
});
