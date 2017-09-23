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
		const jsDockerDir = path.resolve(__dirname, '..', '..', '..', 'docker', 'js');
		await exec(`docker build -t nodejs-runner ${jsDockerDir}`);

		// Execute the solution with the tests in the container
		try {
			const pointCoeff = 100 / tests.length;
			let points = 0;
			for (let i = 0; i < tests.length; i++) {
				const parametersFile = path.join(codeDir, utilities.generateRandomId(20) + '.txt');
				await utilities.createFileAt(tests[i].input, parametersFile);

				const { stdout } = await exec(`docker run -v ${codeDir}:/usr/src/app -i nodejs-runner node index.js $(cat ${parametersFile})`);

				if (stdout.trim() === tests[i].output) {
					points += pointCoeff;
				}
			}
			await utilities.truncateSolutionDir(codeDir, 'js');
			resolve(points);
		} catch (err) {
			resolve(0);
		}
	});
};
