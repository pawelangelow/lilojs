'use strict';

exports.runCode = (code) => {
	return new Promise((resolve, reject) => {
		let sum = 0;
		for (let i = 0; i < 900719920; i++) {
			sum = i;
		}
		console.log(sum);
		resolve(90);
	});
};
