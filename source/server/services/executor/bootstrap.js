'use strict';

const path = require('path');
const { fork } = require('child_process');

const worker = fork(path.join(__dirname, 'scheduler'));

worker.on('exit', (errorCode) => {
	console.log(`Scheduler has exited with code ${errorCode}`);
});
