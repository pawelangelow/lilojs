/*jslint node: true */
/*jslint unparam: true*/
/*jslint todo: true */
/*jslint nomen: true*/
'use strict';

var CONTROLLER_NAME = 'contest',
    constants = require('../common/constants'),
    contests = require('../data/contests');

module.exports = {
    getAll: function (req, res) {
        var page = req.query.page,
            pageSize = req.query.pageSize,
            options = {};

        options.page = page;
        options.pageSize = pageSize;

        contests.list(options, function (err, data) {
            res.render(CONTROLLER_NAME + '/index', {
                data: data
            });
        });
    },
    getSpecific: function (req, res) {
        var id = req.params.id;
        contests.getOne(id, function (err, result) {
            //TODO: Validation
            if (result.isVisible) {
                res.render(CONTROLLER_NAME + '/contest', {
                    contest: result
                });
            } else {
                req.session.error = 'Sorry, but this contest is not available!';
                res.redirect('/contest/all');
            }
        });
    }
};
