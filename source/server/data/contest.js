'use strict';
const mongoose = require('mongoose');
const requiredMessage = '{PATH} is required';
const Schema = mongoose.Schema;

module.exports.init = function () {
	const contestSchema = mongoose.Schema({
		title: { type: String, required: requiredMessage },
		description: { type: String },
		category: { type: String, required: requiredMessage },
		startDate: { type: Date, required: requiredMessage },
		endDate: { type: Date, required: requiredMessage },
		canPractice: { type: Boolean, required: requiredMessage, default: true },
		dateCreated: {type: Date, required: requiredMessage },
		creator: { type: Schema.Types.ObjectId, ref: 'User' }
	});

	mongoose.model('Contest', contestSchema);
};
