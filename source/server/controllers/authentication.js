'use strict';

const router = require('express').Router();
const passport = require('passport');

const pathResolver = require('../utilities').getViewName;

const userService = require('../services/user');
const pathPrefix = '/' + pathResolver(__filename, []);

module.exports = router;

// LOGIN
router.get('/login', (req, res) => {
	const viewName = pathResolver(__filename, ['login']);
	res.render(viewName);
});

router.post('/login', (req, res, next) => {
	passport.authenticate('local', function (err, user, info) {
		if (err) {
			return next(err);
		}

		if (!user) {
			req.session.error = info.message;
			return res.redirect(pathPrefix + '/login');
		}

		const oneHour = 3600000;
		req.session.cookie.expires = new Date(Date.now() + oneHour);
		req.session.cookie.maxAge = oneHour;
		req.logIn(user, function (err) {
			if (err) {
				return next(err);
			}
			req.session.success = 'Successful login!';
			return res.redirect('/');
		});
	})(req, res, next);
});

// LOGOUT
router.get('/logout', (req, res) => {
	req.logout();
	res.redirect('/');
});

// REGISTER
router.get('/register', (req, res) => {
	const viewName = pathResolver(__filename, ['register']);
	res.render(viewName);
});

router.post('/register', (req, res) => {
	const viewName = pathResolver(__filename, ['register']);
	const newUserData = req.body;

	if (newUserData.password !== newUserData.confirmPassword) {
		const model = Object.assign({}, newUserData);

		model.errorMessage = 'Passwords do not match!';
		res.render(viewName, model);
	} else if (newUserData.password.length <= 4) {
		const model = Object.assign({}, newUserData);

		model.errorMessage = 'Password should be more than 4 symbols!';
		res.render(viewName, model);
	} else {
		userService
			.registerUser(newUserData)
			.then(() => {
				// TODO: Make autologin
				req.session.success = 'Registration was successful!';
				res.redirect(pathPrefix + '/login');
			})
			.catch((err) => {
				const model = Object.assign({}, newUserData);

				err.unshift('There are errors!');
				model.errorMessage = err.join('<br \>');
				res.render(viewName, model);
			});
	}
});
