/*jslint node: true */
'use strict';
var mongoose = require('mongoose'),
    requiredMessage = '{PATH} is required',
    Schema = mongoose.Schema;

module.exports.init = function () {
    var problemSchema = mongoose.Schema({
        title: { type: String, required: requiredMessage },
        description: { type: String },
        descriptionPath: { type: String, required: requiredMessage },
        allowedLanguages: [{ type: String, required: requiredMessage }],
        tests: [{ type: Schema.Types.ObjectId, ref: 'Test'}],
        contest: {type: Schema.Types.ObjectId, ref: 'Contest'}
    });
    mongoose.model('Problem', problemSchema);
};
