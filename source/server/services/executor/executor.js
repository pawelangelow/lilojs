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
	}

	processSubmission(submissionId) {
		this.submissionService
			.getSubmissionById(submissionId)
			.then(submission => {
				if (!submission) {
					this.requestSubmission();
					return;
				}

				const runner = require(path.join(__dirname, 'runners', submission.language));
				runner
					.runCode(submission.sourceCode)
					.then(result => {
						this.submissionService.updateSubmissionPointsById(submission._id, result)
							.then(() => this.requestSubmission())
							.catch(() => this.requestSubmission());
					});
			});
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
