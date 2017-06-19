'use strict';

const fs = require('fs');

module.exports = function (app) {
	const files = [];
	fs.readdirSync(__dirname).forEach(function(file) {
		const fileName = file.split('.')[0];
		if (fileName !== 'index') {
			files.push({
				name: fileName,
				priority: require(`./${fileName}`).priority
			});
		}
	});

	files.sort((a, b) => a.priority - b.priority);

	files.forEach((file) => {
		require(`./${file.name}`).load(app);
	});
};

// TODO: add good tests for this
