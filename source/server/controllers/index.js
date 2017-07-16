'use strict';

const utils = require('../utilities');

module.exports = function (app) {
	utils.getFilesFromDir(__dirname, (fileName) => {
		app.use(`/${fileName}`, require(`./${fileName}`));
	});

	app.get('/', function(req, res) {
		res.render('index', { title: 'Express' });
	});

	app.get('*', function(req, res) {
		res.render('index', { title: 'Express' });
	});
};
