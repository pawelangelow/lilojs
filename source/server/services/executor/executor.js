'use strict';

const dbService = require('../../data');
const EventEmitter = require('events');
const path = require('path');
const configuration = require('../../configuration');

class Executor extends EventEmitter {
	constructor(id) {
		dbService(configuration.dbString);
		super();
		this._id = id;

		this.addListener('pool', this.processSubmission);
	}

	processSubmission() {
		this.queueService
			.getQueueEntryAndDeleteIt()
			.then(entry => {
				if (!entry) {
					// Should I wait some time here?
					setTimeout(() => {
						this.emit('pool');
					}, 100);
					return;
				}

				const runner = require(path.join(__dirname, 'runners', entry.submission.language));
				runner
					.runCode(entry.submission.sourceCode)
					.then(result => {
						this.submissionService.updateSubmissionPointsById(entry.submission._id, result)
							.then(() => this.emit('pool'))
							.catch(() => this.emit('pool'));
					});
			});
	}

	start() {
		this.queueService = require('../queue');
		this.submissionService = require('../submission');
		this.emit('pool');
	}
}

module.exports = Executor;
