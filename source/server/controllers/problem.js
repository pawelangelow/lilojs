'use strict';

const moment = require('moment');

const router = require('express').Router();
const utils = require('../utilities');
const pathResolver = utils.getViewName;
const pathPrefix = '/' + pathResolver(__filename, []);
const onlyForLoggedIn = utils.onlyForLoggedIn;

const problems = require('../services/problem');
const submissions = require('../services/submission');

module.exports = router;

router.get('/:id', onlyForLoggedIn, async (req, res) => {
	const id = req.params.id;
	const viewPath = pathResolver(__filename, ['index']);

	const problem = await problems.getProblemById(id);
	const score = await submissions.calculateResult(id, req.user);
	const userSUbmissions = await submissions.getSubmissionsByProblemIdAndUserId(id, req.user);

	res.render(viewPath, {
		problem,
		score,
		submissions: userSUbmissions,
		moment
	});
});

router.post('/:id', onlyForLoggedIn, (req, res) => {
	const id = req.params.id;
	const model = req.body;
	model.sourceCode = model.code;
	model.problemId = id;

	submissions
		.addNewSubmission(model, req.user)
		.then((result) => {
			req.session.success = 'Submission was successfully saved.';
			res.redirect(pathPrefix + `/${id}`);
		})
		.catch((err) => {
			console.log(err);
		});
});
