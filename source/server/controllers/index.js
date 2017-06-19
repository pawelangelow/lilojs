const fs = require('fs');

module.exports = function (app) {
	fs.readdirSync(__dirname).forEach(function(file) {
		const fileName = file.split('.')[0];
		if (fileName !== 'index') {
			app.use(`/${fileName}`, require(`./${fileName}`));
		}
	});

	app.get('/', function(req, res) {
		res.render('index', { title: 'Express' });
	});

	app.get('*', function(req, res) {
		res.render('index', { title: 'Express' });
	});
};
