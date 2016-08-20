/*jslint node: true */
'use strict';

var UsersController = require('./UsersController'),
    ContestController = require('./ContestController'),
    AdminController = require('./AdminController');

module.exports = {
    users: UsersController,
    admin: AdminController,
    contest: ContestController
};
