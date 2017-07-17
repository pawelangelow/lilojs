/* eslint-disable no-console */
'use strict';

const mongoose = require('mongoose');
const getFilesFromDir = require('../utilities').getFilesFromDir;

module.exports = (dbConfig) => {
	mongoose.connect(dbConfig, {
		useMongoClient: true
	});
	const db = mongoose.connection;

	db.once('open', function (err) {
		if (err) {
			console.log('Database could not be opened: ' + err);
			return;
		}

		console.log('Database up and running...');
	});

	db.on('error', function (err) {
		console.log('Database error: ' + err);
	});

	getFilesFromDir(__dirname, (filename) => {
		require('./' + filename).init();
		console.log(filename + ' model was loaded.');
	});
};
