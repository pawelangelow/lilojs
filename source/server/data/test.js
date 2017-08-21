'use strict';
const mongoose = require('mongoose');
const requiredMessage = '{PATH} is required';
const Schema = mongoose.Schema;

exports.init = function () {
	const testSchema = mongoose.Schema({
		title: { type: String },
		input: { type: String },
		inputPath: { type: String, required: requiredMessage },
		output: { type: String },
		outputPath: { type: String, required: requiredMessage },
		problem: { type: Schema.Types.ObjectId, ref: 'Problem'},
		creator: { type: Schema.Types.ObjectId, ref: 'User' },
		dateCreated: {type: Date, required: requiredMessage }
	});

	mongoose.model('Test', testSchema);
};
