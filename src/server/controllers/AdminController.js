/*jslint node: true */
/*jslint unparam: true*/
/*jslint todo: true */
/*jslint nomen: true*/
'use strict';

var CONTROLLER_NAME = 'admin',
    constants = require('../common/constants'),
    contests = require('../data/contests');

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
            function (err, event) {
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
        var contest = req.body;
    },
    getAddTest: function (req, res) {

    },
    postAddTest: function (req, res) {

    },
};
