/*jslint node: true */
/*jslint unparam: true*/
/*jslint todo: true */
'use strict';

var mongoose = require('mongoose'),
    UserModel = require('../data/models/User'),
    ContestModel = require('../data/models/Contest'),
    ProblemModel = require('../data/models/Problem'),
    SubmissionModel = require('../data/models/Submission'),
    TestModel = require('../data/models/Test');

module.exports = function (config) {
    mongoose.connect(config.db);
    var db = mongoose.connection;

    db.once('open', function (err) {
        if (err) {
            console.log('Database could not be opened: ' + err);
            return;
        }

        console.log('Database up and running...');
    });

    db.on('error', function (err) {
        console.log('Database error: ' + err);
    });

    UserModel.init();
    ContestModel.init();
    ProblemModel.init();
    SubmissionModel.init();
    TestModel.init();
};
