'use strict';

const testData = require('mongoose').model('Test');

exports.addNewTest = (model, user) => {
	return new Promise((resolve, reject) => {
		//TODO: Model validation

		model.creator = user;
		model.dateCreated = new Date();

		if (!model.inputPath) {
			model.inputPath = 'empty';
		}

		if (!model.outputPath) {
			model.outputPath = 'empty';
		}

		testData.create(model)
			.then((result) => {
				resolve(result);
			})
			.catch((err) => {
				reject(err);
			});
	});
};

