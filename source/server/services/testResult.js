'use strict';

const testData = require('mongoose').model('TestResult');

exports.getTRBySubmissionId = (submissionId) => {
	return new Promise ((resolve, reject) => {
		testData
			.find({submission: submissionId})
			.populate('test')
			.exec()
			.then((result) => {
				resolve(result);
			})
			.reject((err) => {
				reject(err);
			});
	});
};

exports.addNewTestResult = (submissionId, testId) => {
	return new Promise((resolve, reject) => {
		const model = {};
		model.createdOn = new Date();
		model.submission = submissionId;
		model.test = testId;
		model.result = 'UNPROCESSED';

		//TODO: Model validation
		testData
			.create(model)
			.then((result) => {
				resolve(result);
			})
			.catch((err) => {
				reject(err);
			});
	});
};
