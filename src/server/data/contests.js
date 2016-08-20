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
    },
    list: function (options, callback) {
        if (!options) {
            callback('Error! Options are not provided!');
        }

        var page = options.page || 1,
            pageSize = options.pageSize || constants.paging.contests,
            notActive = options.notActive || true;

        Contest
            .find({ isVisible: notActive })
            .sort({
                startDate: 'desc'
            })
            .limit(parseInt(pageSize, 10))
            .skip((page - 1) * pageSize)
            .exec(function (err, foundContests) {
                if (err) {
                    callback(err);
                    return;
                }
                Contest.count().exec(function (err, numberOfContests) {
                    var data = {
                        contests: foundContests,
                        currentPage: page,
                        pageSize: pageSize,
                        total: numberOfContests
                    };
                    callback(err, data);
                });
            });
    }
};
