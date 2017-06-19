'use strict';

const fs = require('fs');

module.exports = function (app) {
	fs.readdirSync(__dirname).forEach(function(file) {
		const fileName = file.split('.')[0];
		if (fileName !== 'index') {
			require(`./${fileName}`).load(app);
		}
	});
};
