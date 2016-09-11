/*jslint node: true */
/*jslint todo: true */
'use strict';

var Submission = require('mongoose').model('Submission'),
    ObjectId = require('mongodb').ObjectId,
    problems = require('./problems'),
    runner = require('../services/running');

module.exports = {
    create: function (submission, callback) {
        var newSubmission = {};
        newSubmission.sourceCode = submission.code;
        newSubmission.submitedOn = new Date();
        newSubmission.submiter = new ObjectId(submission.user._id);
        newSubmission.problem = new ObjectId(submission.problem);
        newSubmission.language = submission.language;
        newSubmission.sourceCodePath = 'none';
        newSubmission.points = 0;

        Submission.create(newSubmission, function (err, result) {
            var problem = problems.getOne(result.problem, function (err, problemResult) {
                var tests = problemResult.tests;
                runner.processSubmission(result._id, result.sourceCode, tests, consoleLogger);
            });
            callback(err, result);
        });
    },
    updatePoints: function (id, points, callback) {
        Submission.update({ "_id" : new ObjectId(id) }, {
            points: points
            }, function(err, affected, resp) {
            console.log(affected, resp);
            callback(err);
        });
    }
};

function consoleLogger(id, data) {
    var points = data.successed / data.tests * 100;
    module.exports.updatePoints(id, points, function (err) {
        if (!err) {
            console.log('yey');
        }
    })
}
