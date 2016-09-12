/*jslint node: true */
/*jslint unparam: true*/
/*jslint todo: true */
/*jslint nomen: true*/
'use strict';

var CONTROLLER_NAME = 'sumbission',
    submissions = require('../data/submissions'),
    problems = require('../data/problems');

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
                    problems.getOne(sumbission.problem, function (err, result) {
                        //TODO: Validation
                        res.render('problem' + '/view', {
                            problem: result
                        });
                    });
                }
            });
    },
    get: function (req, res) {
        var id = req.params.id,
            user = req.user;
        if (user && id) {
            submissions.list({}, id, user, function (err, data) {
                res.json(data);
            });
        } else {
            res.end("No results!");
        }
    }
};
