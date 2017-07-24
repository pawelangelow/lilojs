'use strict';

const router = require('express').Router();
const problemService = require('../services/problem');

const utils = require('../utilities');
const pathResolver = utils.getViewName;
const onlyForAdmins = utils.onlyForAdmin;
const categories = ['Exam', 'Homework'];

module.exports = router;

router.get('/', onlyForAdmins, (req, res) => {
	const viewName = pathResolver(__filename, ['index']);
	res.render(viewName, {
		buildVersion: utils.getBuildVersion()
	});
});

router.get('/addContest', onlyForAdmins, (req, res) => {
	const viewName = pathResolver(__filename, ['add-contest']);
	res.render(viewName, {
		categories
	});
});

router.get('/addProblem', onlyForAdmins, (req, res) => {
	const viewName = pathResolver(__filename, ['add-problem']);
	res.render(viewName, {
		contests: [{title: 'get this from service', _id: '123'}],
		allowedLanguages: ['C++', 'JS']
	});
});

router.get('/addTest', onlyForAdmins, (req, res) => {
	const viewName = pathResolver(__filename, ['add-test']);
	res.render(viewName, {
		contests: [{title: 'get this from service', _id: '123'}]
	});
});

router.get('/getProblems/:id', onlyForAdmins, (req, res) => {
	const contestId = req.params.id;
	problemService
		.getProblemsByContestId(contestId)
		.then((result) => {
			res.json(result);
		})
		.catch((err) => {
			res.end(err);
		});
});

router.post('/addProblem', onlyForAdmins, (req, res) => {
	const body = req.body;
	console.log(body);
});

router.post('/addTest', onlyForAdmins, (req, res) => {
	const body = req.body;
	console.log(body);
});
