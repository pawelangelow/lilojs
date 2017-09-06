'use strict';

exports.runCode = (code) => {
	return new Promise((resolve, reject) => {
		console.log(code);
		resolve(90);
	});
};
