'use strict';

const router = require('express').Router();
const pathResolver = require('../utilities').getViewName;

module.exports = router;

router.get('/:id', (req, res) => {
	const id = req.params.id;
	const viewPath = pathResolver(__filename, ['index']);

	res.render(viewPath, {
		id
	});
});
