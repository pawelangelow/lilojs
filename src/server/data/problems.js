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
    },
    findByContest: function (contestId, callback) {
        if (!contestId) {
            callback('Error! Id must be provided!');
        }

        Problem
            .find({ "contest" : new ObjectId(contestId) })
            .exec(function (err, foundProblems) {
                if (err) {
                    callback(err);
                    return;
                }
                //TODO: Implement validation of the contest
                callback(err, foundProblems);
            });
    },
    getOne: function (id, callback) {
        if (!id) {
            callback('Error! Id must be provided!');
        }

        Problem
            .findOne({ "_id" : new ObjectId(id) })
            .exec(function (err, foundProblem) {
                if (err) {
                    callback(err);
                    return;
                }
                //TODO: Implement validation of the problem
                callback(err, foundProblem);
            });
    }
};
