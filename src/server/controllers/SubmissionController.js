/*jslint node: true */
/*jslint unparam: true*/
/*jslint todo: true */
/*jslint nomen: true*/
'use strict';

var CONTROLLER_NAME = 'sumbission',
    submissions = require('../data/submissions');

module.exports = {
    create: function (req, res) {
        var sumbission = {
                code: req.body.inputCode,
                user: req.user,
                problem: req.params.id,
                language: req.body.language
            };
        submissions.create(sumbission,
            function (err, contest) {
                if (err) {
                    var data = {
                        errorMessage: err
                    };
                    console.log(err);
                } else {
                    console.log('doide');
                }
            });
    }
};
