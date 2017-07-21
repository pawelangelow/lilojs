'use strict';

const encryption = require('../utilities/encryption');
const userData = require('mongoose').model('User');

// TODO: improve validation

function validateInputModel(input) {
	if (!input.username || input.username.length < 5) {
		return false;
	}

	if (!input.password || !input.confirmPassword) {
		return false;
	}

	if (!input.email) { // TODO: validate if this is real email
		return false;
	}

	if (!input.facultyNumber || !isNumber(input.facultyNumber)) {
		return false;
	}

	if (!input.administrativeGroup || !isNumber(input.administrativeGroup)) {
		return false;
	}

	return true;
}

exports.registerUser = (inputModel) => {
	if (!validateInputModel(inputModel)) {
		// TODO: send error messages in promise, to display them to the client
		return Promise.reject([]);
	}

	const model = inputModel;

	model.salt = encryption.generateSalt();
	model.hashPass = encryption.generateHashedPassword(model.salt, model.password);

	return userData
		.create(model)
		.then(() => {
			return true;
		})
		.catch((err) => {
			return [err];
		});
};

exports.loginUser = (username, password) => {
	return userData
		.findOne({ username: username })
		.exec()
		.then((user) => {
			if (!user) {
				throw new Error('Invalid user!');
			}

			if (!user.authenticate(password)) {
				throw new Error('Invalid password!');
			}

			return {
				_id: user._id,
				username: user.username
			};
		});
};

exports.getUserById = (id) => {
	return userData
		.findOne({_id: id})
		.exec()
		.then((user) => {
			return {
				_id: user._id,
				username: user.username
			};
		});
};

exports.isAdmin = (username) => {
	return userData
		.findOne({ username: username })
		.exec()
		.then((user) => {
			if (!user) {
				throw new Error('Invalid user!');
			}

			return user.isAdmin();
		});
};

function isNumber(n) {
	return !isNaN(parseFloat(n)) && isFinite(n);
}
