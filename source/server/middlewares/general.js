'use strict';

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

module.exports.priority = 1;

module.exports.load = (app) => {
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: false }));
	app.use(cookieParser());
};
