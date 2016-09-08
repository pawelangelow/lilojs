/*jslint node: true */
/*jslint todo: true */
'use strict';

var Submission = require('mongoose').model('Submission'),
    ObjectId = require('mongodb').ObjectId,
    problems = require('./problems');

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
            callback(err, result);
        });
    }
};
