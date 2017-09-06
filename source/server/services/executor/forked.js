'use strict';

const Executor = require('./executor');

process.on('message', (msg) => {
	new Executor(msg).start();
});
