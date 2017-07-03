'use strict';

const router = require('express').Router();
const path = require('path');
const passport = require('passport');

module.exports = router;

router.get('/login', (req, res) => {
	res.render(path.join('authentication', 'login')); // TODO: think of better way
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
