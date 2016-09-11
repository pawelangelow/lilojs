/*jslint node: true */
/*jslint unparam: true*/
/*jslint todo: true */
'use strict';

var async = require('async');
var fs = require('fs');
var path = require('path');
var exec = require('child_process').exec;

module.exports = {
    processSubmission: processSubmission
};

function processSubmission(id, code, tests, callbackResult) {

    var tasks = [],
        pathToFolder = path.normalize(__dirname + '/../../server/resources/submissions'),
        executableName = makeid(35),
        programName = path.normalize(pathToFolder + '/' + executableName),
        result = {tests: 0, successed: 0, failed: 0};

    tasks.push(function (callback) {
        fs.writeFile(programName + '.c', code, { flag: 'w' }, function (err) {
            if (err) {
                return console.log(err);
            }
            callback();
        });
    });

    tasks.push(function (callback) {
        var cmdParameters = 'gcc ' + programName + '.c -o ' + programName;

        exec(cmdParameters, function (error, stdout, stderr) {
            if (!error) {
                console.log(stdout);
            } else {
                console.log(error);
            }
            callback();
        });
    });

    tests.forEach(function (test){
        tasks.push(function (callback) {
            var cmdParameters = 'cd ' + pathToFolder + ' && ./' + executableName + ' ' + test.input,
                localResult,
                i;

            exec(cmdParameters, function (error, stdout, stderr) {
                if (!error) {
                    localResult = stdout.match(/[^\r\n]+/g);
                    if (matchTest(test.output, localResult)) {
                        result.successed++;
                    } else {
                        result.failed++;
                    }
                    result.tests++;
                } else {
                    console.log(error);
                }
                callback();
            });
        });
    });

    async.series(tasks, function _allDone(err) {
        callbackResult(id, result);
    });
}

function makeid(length) {
    var text = "",
        possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
        i;

    for (i = 0; i < length; i += 1) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
}

function matchTest(real, expected) {
    for (var i = 0; i < expected.length; i++) {
        if (expected[i] !== real[i]) {
            return false;
        }
    }
    return true;
}
