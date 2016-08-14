/*jslint node: true */
/*jslint unparam: true*/
/*jslint todo: true */
'use strict';

var auth = require('./auth'),
    controllers = require('../controllers'),
    adminValidation = require('../utilities/adminValidation'),
    checkIsAdminMiddleware;

module.exports = function (app) {
    app.get('/register', controllers.users.getRegister);
    app.post('/register', controllers.users.postRegister);

    app.get('/login', controllers.users.getLogin);
    app.post('/login', auth.login);
    app.get('/logout', auth.logout);

    app.get('/admin/', checkIsAdminMiddleware, controllers.admin.getDashboard);
    app.get('/admin/index', checkIsAdminMiddleware, controllers.admin.getDashboard);
    app.get('/admin/dashboard', checkIsAdminMiddleware, controllers.admin.getDashboard);

    app.get('/admin/addContest', checkIsAdminMiddleware, controllers.admin.getAddContest);
    app.post('/admin/addContest', checkIsAdminMiddleware, controllers.admin.postAddContest);

    app.get('/admin/addProblem', checkIsAdminMiddleware, controllers.admin.getAddProblem);
    app.post('/admin/addProblem', checkIsAdminMiddleware, controllers.admin.postAddProblem);

    app.get('/admin/addTest', checkIsAdminMiddleware, controllers.admin.getAddTest);
    app.post('/admin/addTest', checkIsAdminMiddleware, controllers.admin.postAddTest);

    app.get('/', function (req, res) {
        res.render('index');
    });

    app.get('*', function (req, res) {
        res.render('index');
    });
};

checkIsAdminMiddleware = function (req, res, next) {
    if (adminValidation.checkIsAdmin(req.user)) {
        next();
    } else {
        req.session.error = 'Not authorized!';
        res.redirect('/');
    }
};
