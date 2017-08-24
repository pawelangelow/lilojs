'use strict';

const router = require('express').Router();
const pathResolver = require('../utilities').getViewName;

const problems = require('../services/problem');

module.exports = router;

router.get('/:id', (req, res) => {
	const id = req.params.id;
	const viewPath = pathResolver(__filename, ['index']);

	problems
		.getProblemById(id)
		.then((result) => {
			res.render(viewPath, result);
		});
});
