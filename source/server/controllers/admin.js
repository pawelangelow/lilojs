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
	Promise.all([
		contestService
			.listContest({
				pageSize: 25,
				order: 'desc',
				showAll: true
			}),
		problemService.getAllowedLanguages()
	]).then(values => {
		const [contests, allowedLanguages] = values;
		res.render(viewName, {
			contests,
			allowedLanguages
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
		.then(() => {
			req.session.success = 'Contest was created successfully! Here you can enter some problem to it.';
			res.redirect('/admin/addProblem');
		})
		.catch((err) => {
			req.session.error = err;
			res.redirect('/admin/addContest');
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
		.then(() => {
			req.session.success = 'Problem was created successfully! Here you can enter some test to it.';
			res.redirect('/admin/addTest');
		})
		.catch((err) => {
			req.session.error = err;
			res.redirect('/admin/addProblem');
		});
});

router.post('/addTest', onlyForAdmins, (req, res) => {
	const body = req.body;
	testService
		.addNewTest(body, req.user)
		.then(() => {
			// TODO: implement try solution
			req.session.success = 'Test was created successfully! <a href="/admin/runTest">Here you can try your solution</a> or enter another one.';
			res.redirect('/admin/addTest');
		})
		.catch((err) => {
			req.session.error = err;
			res.redirect('/admin/addTest');
		});
});
