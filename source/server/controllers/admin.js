'use strict';

const router = require('express').Router();

const contestService = require('../services/contest');
const problemService = require('../services/problem');
const testService = require('../services/test');

const utils = require('../utilities');
const pathResolver = utils.getViewName;
const onlyForAdmins = utils.onlyForAdmin;
const categories = contestService.categories;

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
	contestService
		.listContest({
			pageSize: 25,
			order: 'desc',
			showAll: true
		})
		.then((contests) => {
			res.render(viewName, {
				contests: contests,
				allowedLanguages: ['C++', 'JS']
			});
		});
});

router.get('/addTest', onlyForAdmins, (req, res) => {
	const viewName = pathResolver(__filename, ['add-test']);
	contestService
		.listContest({
			pageSize: 25,
			order: 'desc',
			showAll: true
		})
		.then((contests) => {
			res.render(viewName, {
				contests: contests
			});
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

router.post('/addContest', onlyForAdmins, (req, res) => {
	const body = req.body;
	contestService
		.addNewContest(body, req.user)
		.then((result) => {
			// TODO: Think where should admin be redirected
			// req.session.success = '<a href="#">Here</a>';
			// res.redirect('/admin/addContest');
			console.log(result);
		})
		.catch((err) => {
			console.log(err);
		});
});

router.post('/addProblem', onlyForAdmins, (req, res) => {
	const body = req.body;
	const model = {
		title: body.title,
		description: body.description,
		descriptionPath: body.fileName,
		allowedLanguages: body.allowedLanguages
	};
	problemService
		.addNewProblem(model, body.contest)
		.then((result) => {
			console.log(result);
		})
		.catch((err) => {
			console.log(err);
		});
});

router.post('/addTest', onlyForAdmins, (req, res) => {
	const body = req.body;
	testService
		.addNewTest(body, req.user)
		.then((result) => {
			// TODO: Think where should admin be redirected
			// req.session.success = '<a href="#">Here</a>';
			// provide easy way to run the test on authors implementation
			console.log(result);
		})
		.catch((err) => {
			console.log(err);
		});
});
