'use strict';

const router = require('express').Router();

const pathResolver = require('../utilities').getViewName;

module.exports = router;

router.get('/', (req, res) => {
	const viewName = pathResolver(__filename, ['overview']);
	res.render(viewName);
});
