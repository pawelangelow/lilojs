/*jslint node: true */
/*jslint unparam: true*/
/*jslint todo: true */
'use strict';

var express = require("express"),
    router = express.Router(),
    controllers = require('../controllers');

module.exports = router;

router.get('/:id', controllers.problem.getSpecific);
