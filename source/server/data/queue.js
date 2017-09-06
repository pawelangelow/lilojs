'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports.init = function () {
	const queueSchema = mongoose.Schema({
		submission: { type: Schema.Types.ObjectId, ref: 'Submission' },
		priority: { type: Number, index: true }
	});

	mongoose.model('QueueEntry', queueSchema);
};
