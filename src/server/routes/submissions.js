/*jslint node: true */
/*jslint unparam: true*/
/*jslint todo: true */
'use strict';

var express = require("express"),
    router = express.Router(),
    controllers = require('../controllers');

module.exports = router;

router.get('/get/:id', controllers.submission.get);
