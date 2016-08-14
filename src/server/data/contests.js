/*jslint node: true */
'use strict';

var Contest = require('mongoose').model('Contest'),
    constants = require('../common/constants');

module.exports = {
    create: function (contest, user, callback) {
        if (constants.categories.indexOf(contest.category) < 0) {
            callback('Invalid category!');
            return;
        }

        contest.startDate = new Date(contest.startDate);
        contest.endDate = new Date(contest.endDate);
        contest.creator = user;

        Contest.create(contest, callback);
    }
};
