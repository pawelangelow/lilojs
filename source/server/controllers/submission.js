'use strict';

const moment = require('moment');

const router = require('express').Router();
const pathResolver = require('../utilities').getViewName;

const submission = require('../services/submission');
const testResult = require('../services/testResult');

module.exports = router;

router.get('/:id', (req, res) => {
	const id = req.params.id;
	const viewPath = pathResolver(__filename, ['index']);

	Promise.all([
		testResult.getTRBySubmissionId(id),
		submission.getSubmissionById(id)
	]).then(values => {
		const [testResults, submission] = values;
		res.render(viewPath, {
			id,
			submission,
			testResults,
			moment
		});
	});
});
