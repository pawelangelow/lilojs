'use strict';
const mongoose = require('mongoose');
const requiredMessage = '{PATH} is required';
const Schema = mongoose.Schema;

module.exports.init = function () {
	const problemSchema = mongoose.Schema({
		title: { type: String, required: requiredMessage },
		description: { type: String },
		descriptionPath: { type: String, required: requiredMessage },
		allowedLanguages: [{ type: String, required: requiredMessage }],
		dateCreated: {type: Date, required: requiredMessage },
		contestType: { type: String, required: requiredMessage },
		contest: {type: Schema.Types.ObjectId, ref: 'Contest'}
	});

	mongoose.model('Problem', problemSchema);
};
