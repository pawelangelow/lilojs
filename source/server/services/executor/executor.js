'use strict';

const path = require('path');

const dbService = require('../../data');
const configuration = require('../../configuration');

class Executor {
	constructor() {
		dbService(configuration.dbString, {
			skipMessages: true
		});
		this.submissionService = require('../submission');
		this.testService = require('../test');
	}

	async processSubmission(submissionId) {
		const submission = await this.submissionService.getSubmissionById(submissionId);
		const tests = await this.testService.getTestsByProblemId(submission.problem._id);
		if (tests.length === 0) {
			//TODO: log this somewhere
			console.log('There are no tests...');
			this.requestSubmission();
			return;
		}
		const runner = require(path.join(__dirname, 'runners', submission.language));
		const result = await runner.runCode(submission.sourceCode, tests);

		await this.submissionService.updateSubmissionPointsById(submission._id, result);
		this.requestSubmission();
	}

	requestSubmission(timeout = 100) {
		setTimeout(function() {
			process.send('request');
		}, timeout);
	}
}

const executor = new Executor();

process.on('message', (submissionId) => {
	executor.processSubmission(submissionId);
});
