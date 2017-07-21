'use strict';

const router = require('express').Router();

const utils = require('../utilities');
const pathResolver = utils.getViewName;

module.exports = router;

router.get('/', (req, res) => {
	const viewName = pathResolver(__filename, ['index']);
	res.render(viewName, {
		buildVersion: utils.getBuildVersion()
	});
});

router.get('/addContest', (req, res) => {
	const viewName = pathResolver(__filename, ['add-contest']);
	res.render(viewName);
});

router.get('/addProblem', (req, res) => {
	const viewName = pathResolver(__filename, ['add-problem']);
	res.render(viewName);
});

router.get('/addTest', (req, res) => {
	const viewName = pathResolver(__filename, ['add-test']);
	res.render(viewName);
});
