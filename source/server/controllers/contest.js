'use strict';

const router = require('express').Router();
const pathResolver = require('../utilities').getViewName;
const contests = require('../services/contest');
const problems = require('../services/problem');

module.exports = router;

router.get('/:id/:title', (req, res) => {
	const id = req.params.id;
	const viewPath = pathResolver(__filename, ['single']);

	Promise.all([
		contests.getContestById(id),
		problems.getProblemsByContestId(id)
	]).then(values => {
		const [info, problems] = values;
		res.render(viewPath, {
			contest: info,
			problems
		});
	});
});

router.get('/all', (req, res) => {
	const viewPath = pathResolver(__filename, ['all']);

	res.render(viewPath);
});
