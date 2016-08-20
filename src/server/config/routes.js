/*jslint node: true */
/*jslint unparam: true*/
/*jslint todo: true */
'use strict';

var routes = require('../routes');

module.exports = function (app) {
    app.use('/', routes);
};
