/*jslint node: true */
/*jslint unparam: true*/
/*jslint todo: true */
'use strict';

var express = require("express"),
    router = express.Router(),
    controllers = require('../controllers'),
    adminValidation = require('../utilities/adminValidation');

module.exports = router;

router.use(function (req, res, next) {
    if (adminValidation.checkIsAdmin(req.user)) {
        next();
    } else {
        req.session.error = 'Not authorized!';
        res.redirect('/');
    }
});

router.get('/', controllers.admin.getDashboard);
router.get('/index', controllers.admin.getDashboard);
router.get('/dashboard', controllers.admin.getDashboard);

router.get('/addContest', controllers.admin.getAddContest);
router.post('/addContest', controllers.admin.postAddContest);

router.get('/addProblem', controllers.admin.getAddProblem);
router.post('/addProblem', controllers.admin.postAddProblem);

router.get('/addTest', controllers.admin.getAddTest);
router.post('/addTest', controllers.admin.postAddTest);

router.get('/getProblems/:id', controllers.admin.getProblems);
