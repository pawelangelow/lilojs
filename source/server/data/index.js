/* eslint-disable no-console */
'use strict';

const mongoose = require('mongoose');
const getFilesFromDir = require('../utilities').getFilesFromDir;

module.exports = (dbConfig, options = {}) => {
	options.skipMessages = options.skipMessages || false;
	const showMessages = !options.skipMessages;

	mongoose.Promise = Promise;

	mongoose.connect(dbConfig, {
		useMongoClient: true
	});
	const db = mongoose.connection;

	db.once('open', function (err) {
		if (err) {
			console.log('Database could not be opened: ' + err);
			return;
		}
		if (showMessages) {
			console.log('Database up and running...');
		}
	});

	db.on('error', function (err) {
		console.log('Database error: ' + err);
	});

	if (options.loadOnlySpecified) {
		options.loadOnlySpecified.forEach(fileName => {
			require('./' + fileName).init();
			if (showMessages) {
				console.log(fileName + ' model was loaded.');
			}
		});
	} else {
		getFilesFromDir(__dirname, (filename) => {
			require('./' + filename).init();
			if (showMessages) {
				console.log(filename + ' model was loaded.');
			}
		});
	}
};
