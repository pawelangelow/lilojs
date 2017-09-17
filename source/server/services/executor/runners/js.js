'use strict';

const path = require('path');
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const utilities = require('../../../utilities');

exports.runCode = (codeDir, tests) => {
	return new Promise(async function (resolve){
		// const jsDockerDir = path.resolve(__dirname, '..', '..', '..', 'docker', 'js');
		// execSync(`docker build -t nodejs-runner ${jsDockerDir}`);
		// console.log(`docker build -t nodejs-runner ${jsDockerDir}`);
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
			resolve(points);
		} catch (err) {
			resolve(0);
		}
	});
};
