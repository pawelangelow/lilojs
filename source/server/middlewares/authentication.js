'use strict';

const session = require('express-session');
const passport = require('passport');
const Strategy = require('passport-local').Strategy;
const userService = require('../services/user');

const configuration = require('../configuration');

module.exports.priority = 2;

passport.use(new Strategy(getUser));

passport.serializeUser((user, cb) => {
	cb(null, user._id);
});

passport.deserializeUser(getById);

module.exports.load = (app) => {
	app.use(session({secret: configuration.sessionToken, resave: true, saveUninitialized: true}));

	app.use(passport.initialize());
	app.use(passport.session());

	app.use((req, res, next) => {
		if (req.user) {
			app.locals.currentUser = req.user;
			if (req.user.access !== 'student') {
				app.locals.isAdmin = true;
			}
		} else {
			app.locals.isAdmin = undefined;
			app.locals.currentUser = undefined;
		}

		next();
	});

	app.use((req, res, next) => {
		if (req.session.error) {
			const msg = req.session.error;
			req.session.error = undefined;
			app.locals.errorMessage = msg;
		} else {
			app.locals.errorMessage = undefined;
		}

		if (req.session.success) {
			const msg = req.session.success;
			req.session.success = undefined;
			app.locals.successMessage = msg;
		} else {
			app.locals.successMessage = undefined;
		}

		next();
	});
};

function getUser(username, password, cb) {
	userService
		.loginUser(username, password)
		.then((result) => {
			return cb(null, result);
		})
		.catch((err) => {
			return cb(null, false, { message: err.message });
		});
}

function getById(id, cb) {
	userService
		.getUserById(id)
		.then((result) => {
			return cb(null, result);
		})
		.catch(() => {
			return cb(null, false);
		});
}
