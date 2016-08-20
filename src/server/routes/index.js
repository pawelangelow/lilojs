/*jslint node: true */
/*jslint unparam: true*/
/*jslint todo: true */
'use strict';

var express = require("express"),
    router = express.Router(),
    async = require('async'),
    app = express(),
    admin = require('./admin'),
    auth = require('../config/auth'),
    controllers = require('../controllers'),
    globals = require('../config/globals');

module.exports = router;

router.use(function (req, res, next) { //TODO: check if this is the best way
    async.series([
        function (callback) {
            globals.getMenu(res, callback);
        },
        function (callback) {
            next();
            callback();
        }
    ]);
});

router.use(function (req, res, next) {
    console.log(res.locals.nekade);
    next();
});

router.use('/admin', admin);

router.get('/register', controllers.users.getRegister);
router.post('/register', controllers.users.postRegister);

router.get('/login', controllers.users.getLogin);
router.post('/login', auth.login);
router.get('/logout', auth.logout);

router.get('/', function (req, res) {
    res.render('index');
});

router.get('*', function (req, res) {
    res.render('index');
});
