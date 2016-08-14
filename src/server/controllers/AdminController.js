/*jslint node: true */
/*jslint unparam: true*/
/*jslint todo: true */
/*jslint nomen: true*/
'use strict';

var CONTROLLER_NAME = 'admin',
    constants = require('../common/constants');

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

    },
    getAddProblem: function (req, res) {

    },
    postAddProblem: function (req, res) {

    },
    getAddTest: function (req, res) {

    },
    postAddTest: function (req, res) {

    },
};
