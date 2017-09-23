'use strict';

const path = require('path');
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const utilities = require('../../../utilities');

exports.runCode = (codeDir, tests) => {
	// TODO: Extract base logic to some class
	return new Promise(async (resolve) => {
		// Builds the docker image needed to run container
		// If it is already build, the command runs very fast
		const builder = path.resolve(__dirname, '..', '..', '..', 'docker', 'cpp', 'builder');
		await exec(`docker build -t cpp-builder ${builder}`);

		const runner = path.resolve(__dirname, '..', '..', '..', 'docker', 'cpp', 'runner');
		await exec(`docker build -t cpp-runner ${runner}`);

		// Build solution
		try {
			await exec(`docker run -v ${codeDir}:/usr/src/app -i cpp-builder gcc index.cpp`);
		} catch (err) {
			resolve(0);
		}

		// Execute the solution with the tests in the container
		try {
			const pointCoeff = 100 / tests.length;
			let points = 0;
			for (let i = 0; i < tests.length; i++) {
				const parametersFile = path.join(codeDir, utilities.generateRandomId(20) + '.txt');
				await utilities.createFileAt(tests[i].input, parametersFile);

				const { stdout } = await exec(`docker run -v ${codeDir}:/usr/src/app -i cpp-runner ./a.out $(cat ${parametersFile})`);

				if (stdout.trim() === tests[i].output.trim()) {
					points += pointCoeff;
				}
			}
			await utilities.truncateSolutionDir(codeDir, 'cpp');
			resolve(points);
		} catch (err) {
			resolve(0);
		}
	});
};
