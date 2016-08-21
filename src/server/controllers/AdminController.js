/*jslint node: true */
/*jslint unparam: true*/
/*jslint todo: true */
/*jslint nomen: true*/
'use strict';

var CONTROLLER_NAME = 'admin',
    constants = require('../common/constants'),
    contests = require('../data/contests'),
    problems = require('../data/problems');

module.exports = {
    getDashboard: function (req, res) {
        res.render(CONTROLLER_NAME + '/index');
    },
    getAddContest: function (req, res) {
        res.render(CONTROLLER_NAME + '/addContest', {
            categories: constants.categories
        });
    },
    postAddContest: function (req, res) {
        var contest = req.body,
            user = req.user;

        contests.create(contest, user,
            function (err, contest) {
                if (err) {
                    var data = {
                        categories: constants.categories,
                        errorMessage: err
                    };
                    res.render(CONTROLLER_NAME + '/addContest', data);
                } else {
                    res.redirect('/admin/contest/' + contest._id);
                }
            });
    },
    getAddProblem: function (req, res) {
        var options = {};

        options.notActive = false;
        contests.list(options, function (err, data) {
            res.render(CONTROLLER_NAME + '/addProblem', {
                allowedLanguages: constants.allowedLanguages,
                contests: data.contests
            });
        });
    },
    postAddProblem: function (req, res) {
        var problem = req.body;

        problems.create(problem,
            function (err, problem) {
                if (err) {
                    var options = {};

                    options.notActive = false;
                    contests.list(options, function (err, data) {
                        res.render(CONTROLLER_NAME + '/addProblem', {
                            allowedLanguages: constants.allowedLanguages,
                            contests: data.contests,
                            errorMessage: err
                        });
                    });
                } else {
                    res.redirect('/admin/problem/' + problem._id);
                }
            });
    },
    getAddTest: function (req, res) {

    },
    postAddTest: function (req, res) {

    },
};
