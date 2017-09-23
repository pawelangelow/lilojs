'use strict';

const moment = require('moment');

const router = require('express').Router();
const utils = require('../utilities');
const onlyForLoggedIn = utils.onlyForLoggedIn;
const pathResolver = utils.getViewName;

const submissionService = require('../services/submission');
const testResult = require('../services/testResult');

module.exports = router;

router.get('/:id', onlyForLoggedIn, async (req, res) => {
	const id = req.params.id;
	const viewPath = pathResolver(__filename, ['index']);

	const testResults = await testResult.getTRBySubmissionId(id);
	const submission = await submissionService.getSubmissionById(id);
	const submissionCode = await utils.loadCodeFromFile(submission.sourceCode, submission.language);
	submission.sourceCode = submissionCode;

	res.render(viewPath, {
		id,
		submission,
		testResults,
		moment
	});
});
