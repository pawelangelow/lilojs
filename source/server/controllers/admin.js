'use strict';

const router = require('express').Router();

const utils = require('../utilities');
const pathResolver = utils.getViewName;
const onlyForAdmins = utils.onlyForAdmin;

module.exports = router;

router.get('/', onlyForAdmins, (req, res) => {
	const viewName = pathResolver(__filename, ['index']);
	res.render(viewName, {
		buildVersion: utils.getBuildVersion()
	});
});

router.get('/addContest', onlyForAdmins, (req, res) => {
	const viewName = pathResolver(__filename, ['add-contest']);
	res.render(viewName);
});

router.get('/addProblem', onlyForAdmins, (req, res) => {
	const viewName = pathResolver(__filename, ['add-problem']);
	res.render(viewName);
});

router.get('/addTest', onlyForAdmins, (req, res) => {
	const viewName = pathResolver(__filename, ['add-test']);
	res.render(viewName);
});
