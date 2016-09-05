/*jslint node: true */
/*jslint todo: true */
'use strict';

var Test = require('mongoose').model('Test'),
    ObjectId = require('mongodb').ObjectId,
    problems = require('./problems');

module.exports = {
    create: function (test, callback) {
        test.inputPath = test.fileName;
        test.outputPath = test.fileName2;
        test.problem = new ObjectId(test.problem);
        Test.create(test, function (err, result) {
            var resultObjectId = new ObjectId(test._id);

            problems.getOne(test.problem, function (err, parent) {
                parent.tests.push(resultObjectId);
                parent.save();
                callback(err, result);
            });
        });
    }
};
