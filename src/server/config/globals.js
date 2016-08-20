/*jslint node: true */
/*jslint unparam: true*/
/*jslint todo: true */
'use strict';

var contests = require('../data/contests');

module.exports = {
    getMenu: function (res, callback) {
        contests.list({pageSize: 5}, function (err, data) {
            res.locals.menuItems = data;
            callback();
        });
    }
};
