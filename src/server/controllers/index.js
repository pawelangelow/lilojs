/*jslint node: true */
'use strict';

var UsersController = require('./UsersController'),
    AdminController = require('./AdminController');

module.exports = {
    users: UsersController,
    admin: AdminController,
};
