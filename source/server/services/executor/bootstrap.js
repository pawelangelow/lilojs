'use strict';

const path = require('path');
const { fork } = require('child_process');
const numCPUs = require('os').cpus().length;

const workers = [];

for (let i = 0; i < (numCPUs - 1); i++) { // Should run CPUs - 1 ?
	let worker = workers[i];

	worker = fork(path.join(__dirname, 'forked'));

	worker.send(i);

	worker.on('exit', (errorCode) => {
		console.log(`Worker ${i} has exited with code ${errorCode}`);
	});
}
