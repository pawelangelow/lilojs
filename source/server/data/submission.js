'use strict';
const mongoose = require('mongoose');
const requiredMessage = '{PATH} is required';
const Schema = mongoose.Schema;

module.exports.init = function () {
	const submissionSchema = mongoose.Schema({
		submitedOn: { type: Date, required: requiredMessage },
		submiter: { type: Schema.Types.ObjectId, ref: 'User'},
		sourceCode: { type: String },
		sourceCodePath: { type: String },
		points: {type: Number, min: 0, max: 100, dafault: 0 },
		problem: { type: Schema.Types.ObjectId, ref: 'Problem'},
		language: { type: String, required: requiredMessage }
	});

	mongoose.model('Submission', submissionSchema);
};
