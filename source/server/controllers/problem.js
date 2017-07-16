'use strict';

const router = require('express').Router();
const pathResolver = require('../utilities').getViewName;

module.exports = router;

router.get('/:id/:title', (req, res) => {
	const id = req.params.id;
	const title = req.params.title;
	const viewPath = pathResolver(__filename, ['index']);

	res.render(viewPath, {
		id,
		title
	});
});
