'use strict';

const session = require('express-session');
const passport = require('passport');
const Strategy = require('passport-local').Strategy;

module.exports.priority = 2;

passport.use(new Strategy(getUser));

passport.serializeUser((user, cb) => {
	cb(null, user._id);
});

passport.deserializeUser(getById);

module.exports.load = (app) => {
	app.use(session({secret: 'some secret token', resave: true, saveUninitialized: true}));

	app.use(passport.initialize());
	app.use(passport.session());

	app.use((req, res, next) => {
		if (req.user) {
			app.locals.currentUser = req.user;
		} else {
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

		next();
	});
};

// TODO: get this from service
function getUser(username, password, cb) {
	if (username !== 'test') {
		return cb(null, false);
	}

	if (password !== '1234') {
		return cb(null, false);
	}

	return cb(null, {
		_id: '123456789a',
		username: 'test'
	});
}

function getById(id, cb) {
	if (id === '123456789a') {
		cb(null, {
			_id: '123456789a',
			username: 'test'
		});
	}
}
