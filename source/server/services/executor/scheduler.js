'use strict';

const dbService = require('../../data');
const configuration = require('../../configuration');
const path = require('path');
const { fork } = require('child_process');

class Scheduler {
	constructor() {
		dbService(configuration.dbString, {
			loadOnlySpecified: ['queue', 'submission'],
			skipMessages: true
		});

		this._workers = [];
		this._availableWorkers = [];
		this.queueService = require('../queue');
	}

	start() {
		for (let i = 0; i < configuration.executorsConstants.executorsCount; i++) {
			this._availableWorkers[i] = true;

			this._workers[i] = fork(path.join(__dirname, 'executor'));

			this._workers[i].on('message', (msg) => {
				if (msg === 'request') {
					console.log(`Worker ${i} has finished work.`);
					this._availableWorkers[i] = true;
				}
			});

			this._workers[i].on('exit', (errorCode) => {
				console.log(`Worker ${i} has exited with code ${errorCode}`);
			});
		}
		this.work();
	}

	work() {
		setInterval(async () => {
			const availableWorker = this._availableWorkers.indexOf(true);
			if (availableWorker !== -1) {
				this._availableWorkers[availableWorker] = false;
				const entry = await this.queueService.pop();
				if (entry) {
					console.log(`Worker ${availableWorker} is going to work`);
					this._workers[availableWorker].send(entry.submission);
				} else {
					this._availableWorkers[availableWorker] = true;
				}
			}
		}, 1000);
	}
}

new Scheduler().start();
