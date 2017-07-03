'use strict';

const router = require('express').Router();
const passport = require('passport');

const pathResolver = require('../utilities').getViewName;

module.exports = router;

router.get('/login', (req, res) => {
	const viewName = pathResolver(__filename, ['login']);
	res.render(viewName);
});

router.post('/login',
	passport.authenticate('local', { failureRedirect: '/authentication/login' }),
	function(req, res) {
		const oneHour = 3600000;
		req.session.cookie.expires = new Date(Date.now() + oneHour);
		req.session.cookie.maxAge = oneHour;
		res.redirect('/');
	});

router.get('/logout', (req, res) => {
	req.logout();
	res.redirect('/');
});
