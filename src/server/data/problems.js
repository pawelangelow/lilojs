/*jslint node: true */
/*jslint todo: true */
'use strict';

var Problem = require('mongoose').model('Problem'),
    constants = require('../common/constants'),
    ObjectId = require('mongodb').ObjectId,
    contests = require('./contests');

module.exports = {
    create: function (problem, callback) {
        problem.descriptionPath = problem.fileName;
        problem.contest = new ObjectId(problem.contest);
        Problem.create(problem, function (err, result) {
            var resultObjectId = new ObjectId(result._id);

            contests.getOne(problem.contest, function (err, parent) {
                parent.problems.push(resultObjectId);
                parent.save();
                callback(err, result);
            });
        });
    }
};
