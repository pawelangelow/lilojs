/*jslint node: true */
'use strict';
var User = require('mongoose').model('User');

module.exports = {
    create: function (user, callback) {
        User.create(user, callback);
    }
};
