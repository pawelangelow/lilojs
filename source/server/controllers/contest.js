'use strict';

const router = require('express').Router();
const pathResolver = require('../utilities').getViewName;
const contests = require('../services/contest');
const problems = require('../services/problem');

module.exports = router;

router.get('/all', (req, res) => {
	const viewPath = pathResolver(__filename, ['all']);
	// TODO: make all contests visible for administrator
	// TODO: add paging
	// TODO: add search, sorting, etc..
	contests
		.listContest({
			pageSize: 100
		})
		.then(contests => {
			res.render(viewPath, {
				contests
			});
		});
});

router.get('/:id/:title', singleContest);
router.get('/:id', singleContest);

function singleContest(req, res) {
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
}
