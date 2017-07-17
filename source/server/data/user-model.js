'use strict';

const mongoose = require('mongoose');
const encryption = require('../utilities/encryption');
const requiredMessage = '{PATH} is required';

exports.init = () => {
	const userSchema = mongoose.Schema({
		// Core fields
		username: { type: String, required: requiredMessage, unique: true, minlength: 5, maxlength: 20 },
		salt: String,
		hashPass: String,
		firstName: { type: String, minlength: 3, maxlength: 20, required: requiredMessage},
		lastName: { type: String, minlength: 3, maxlength: 20, required: requiredMessage},
		email: { type: String, set: toLower, unique: true, required: requiredMessage},
		accessLevel: { type: String, default: 'student'},
		// Education fields
		facultyNumber: { type: String, required: requiredMessage, set: toLower, unique: true },
		administrativeGroup: { type: Number, min: 10, max: 1000 }
	});

	userSchema.method({
		authenticate: function (password) {
			if (encryption.generateHashedPassword(this.salt, password) === this.hashPass) {
				return true;
			}
			return false;
		}
	});

	mongoose.model('User', userSchema);
};

function toLower(v) {
	return v.toLowerCase();
}
