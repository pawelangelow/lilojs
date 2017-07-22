'use strict';

const router = require('express').Router();

const utils = require('../utilities');
const pathResolver = utils.getViewName;
const userService = require('../services/user');
const onlyForLoggedIn = utils.onlyForLoggedIn;
const pathPrefix = '/' + pathResolver(__filename, []);

module.exports = router;

router.get('/', onlyForLoggedIn, (req, res) => {
	const viewName = pathResolver(__filename, ['overview']);

	userService.getFullUserById(req.user._id).then((user) => {
		res.render(viewName, {
			user
		});
	});
});

router.post('/', onlyForLoggedIn, (req, res) => {
	const currentUser = req.user;
	const updatedData = req.body;
	if (updatedData.password === '') {
		delete updatedData.password;
		delete updatedData.confirmPassword;
	}

	const viewName = pathResolver(__filename, ['overview']);

	if (updatedData.password && updatedData.confirmPassword && updatedData.password !== updatedData.confirmPassword) {
		const model = Object.assign({}, updatedData);

		res.render(viewName, {
			user: model,
			errorMessage: 'Passwords do not match!',
			start: 'credentials'
		});
	} else if (updatedData.password && updatedData.password.length <= 4) {
		// TODO: Extract magic numbers to constants
		const model = Object.assign({}, updatedData);

		res.render(viewName, {
			user: model,
			errorMessage: 'Password should be more than 4 symbols!',
			start: 'credentials'
		});
	} else {
		userService
			.updateData(updatedData, currentUser._id)
			.then(() => {
				req.session.success = 'Data was updated successfully!';
				res.redirect(pathPrefix);
			})
			.catch((err) => {
				err.unshift('There are errors!');
				res.render(viewName, {
					user: updatedData,
					errorMessage: err.join('<br \>'),
					start: 'credentials'
				});
			});
	}
});
