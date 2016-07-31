/*jslint node: true */
/*jslint unparam: true*/
/*jslint todo: true */
/*jslint nomen: true*/
'use strict';

var encryption = require('../utilities/encryption'),
    users = require('../data/users'),
    CONTROLLER_NAME = 'users';

module.exports = {
    getRegister: function (req, res, next) {
        res.render(CONTROLLER_NAME + '/register');
    },
    postRegister: function (req, res, next) {
        var newUserData = req.body;

        if (newUserData.password !== newUserData.confirmPassword) {
            req.session.error = 'Passwords do not match!';
            res.redirect('/register');
        } else if (newUserData.password.length <= 4) {
            req.session.error = 'Password must be more than 4 symbols!';
            res.redirect('/register');
        } else {
            newUserData.salt = encryption.generateSalt();
            newUserData.hashPass = encryption.generateHashedPassword(newUserData.salt, newUserData.password);
            users.create(newUserData, function (err, user) {
                if (err) {
                    console.log('Failed to register new user: ' + err);
                    req.session.error = resolveErrorMessage(err);
                    res.redirect('/register');
                    return;
                }

                req.logIn(user, function (err) {
                    if (err) {
                        res.status(400);
                        return res.send({reason: err.toString()}); // TODO:
                    }
                    res.redirect('/');
                });
            });
        }
    },
    getLogin: function (req, res, next) {
        res.render(CONTROLLER_NAME + '/login');
    }
};

function resolveErrorMessage(error) {
    var outputMessage = '<ul>';
    if (error.errors) {
        Object.keys(error.errors).forEach(function (entry) {
            outputMessage += '<li>' + error.errors[entry].message + '</li>';
        });
    }
    outputMessage += '<ul>';
    return outputMessage;
}
