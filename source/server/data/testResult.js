'use strict';

const mongoose = require('mongoose');
const requiredMessage = '{PATH} is required';
const Schema = mongoose.Schema;

module.exports.init = function () {
	const testResultSchema = mongoose.Schema({
		createdOn: { type: Date, required: requiredMessage },
		submission: { type: Schema.Types.ObjectId, ref: 'Submission'},
		test: { type: Schema.Types.ObjectId, ref: 'Test'},
		result: { type: String, require: requiredMessage },
		actual: { type: String, require: requiredMessage },
		expected: { type: String, require: requiredMessage },
	});

	mongoose.model('TestResult', testResultSchema);
};
