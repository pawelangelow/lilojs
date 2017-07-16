'use strict';

const utils = require('../utilities');

module.exports = function (app) {
	const files = [];

	utils.getFilesFromDir(__dirname, (fileName) => {
		files.push({
			name: fileName,
			priority: require(`./${fileName}`).priority
		});
	});

	files.sort((a, b) => a.priority - b.priority);

	files.forEach((file) => {
		require(`./${file.name}`).load(app);
	});
};

// TODO: add good tests for this
