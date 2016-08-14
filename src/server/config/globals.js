/*jslint node: true */
/*jslint unparam: true*/
/*jslint todo: true */
'use strict';

var contests = require('../data/contests');

module.exports = function (app) {
    contests.list({pageSize: 5}, function (err, data) {
        app.locals.menuContests = data;
    });
};
