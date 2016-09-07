/*jslint node: true */
/*jslint unparam: true*/
/*jslint todo: true */
/*jslint nomen: true*/
'use strict';

var CONTROLLER_NAME = 'problem',
    problems = require('../data/problems');

module.exports = {
    getSpecific: function (req, res) {
        var id = req.params.id;
        problems.getOne(id, function (err, result) {
            //TODO: Validation
            res.render(CONTROLLER_NAME + '/view', {
                problem: result
            });
        });
    }
};
