/*jslint node: true */
'use strict';

var UsersController = require('./UsersController'),
    ContestController = require('./ContestController'),
    AdminController = require('./AdminController'),
    SubmissionController = require('./SubmissionController'),
    ProblemController = require('./ProblemController');

module.exports = {
    users: UsersController,
    admin: AdminController,
    contest: ContestController,
    problem: ProblemController,
    submission: SubmissionController
};
