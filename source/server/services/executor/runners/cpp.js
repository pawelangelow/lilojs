'use strict';

const path = require('path');
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const utilities = require('../../../utilities');
const { messages } = require('../../../configuration');

exports.runCode = (codeDir, tests, testResults) => {
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
				let testResultStatus = messages.testResultMessages.unsuccessful;
				const currentTest = tests[i];
				const parametersFile = path.join(codeDir, utilities.generateRandomId(20) + '.txt');
				await utilities.createFileAt(currentTest.input, parametersFile);

				const { stdout } = await exec(`docker run -v ${codeDir}:/usr/src/app -i cpp-runner ./a.out $(cat ${parametersFile})`);
				const actual = stdout.trim();
				const expected = currentTest.output.trim();
				if (actual === expected) {
					points += pointCoeff;
					testResultStatus = messages.testResultMessages.successful;
				}
				const trData = {
					status: testResultStatus,
					actual,
					expected
				};

				testResults.service.addNewTestResult(testResults.submissionId, currentTest._id, trData);
			}
			await utilities.truncateSolutionDir(codeDir, 'cpp');
			resolve(points);
		} catch (err) {
			resolve(0);
		}
	});
};
