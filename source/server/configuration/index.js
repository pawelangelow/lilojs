'use strict';

exports.sessionToken = 'some secret token';
exports.dbString = 'mongodb://localhost:27017/lilojs';

exports.registrationConstants = {
	passwordMinLength: 4
};

exports.executorsConstants = {
	executorsCount: require('os').cpus().length
};

exports.messages = {
	testResultMessages: {
		successful: 'SUCCESSFUL',
		unsuccessful: 'UNSUCCESSFUL'
	}
};
