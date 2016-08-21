/*jslint node: true */
/*jslint unparam: true*/
/*jslint todo: true */
'use strict';


var async = require('async'),
    express = require("express"),
    router = express.Router(),
    app = express(),
    auth = require('../config/auth'),
    controllers = require('../controllers'),
    globals = require('../config/globals'),
    admin = require('./admin'),
    contest = require('./contest'),
    upload = require('./upload');

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

router.use('/admin', admin);
router.use('/contest', contest);
router.use('/upload', upload);

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
