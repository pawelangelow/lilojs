/*jslint node: true */
/*jslint unparam: true*/
/*jslint todo: true */
'use strict';

const async = require('async');

var exec = require('child_process').exec;
var cmd = 'gcc sample-program.c -o program && ./program < input.txt';
var cmdParameters = 'gcc sample-program2.c -o program && ./program 2 3';

module.exports = {
    processSubmission: processSubmission
};

function processSubmission(code, tests, callbackResult) {
    var tasks = [];

      tasks.push(function (callback) {
        exec(cmdParameters, function(error, stdout, stderr) {
          if (!error) {
            console.log(stdout);
          } else {
            console.log(error);
            console.log("Sorry, no point for this test!");
          }
          callback();
        });
      });


      async.series(tasks, function _allDone(err) {
          callbackResult();
    });
}
