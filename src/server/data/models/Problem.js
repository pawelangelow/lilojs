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
        weight: {type: Number },
        allowedLanguages: [{ type: String, required: requiredMessage }],
        tests: [{ type: Schema.Types.ObjectID, ref: 'Test'}]
    });
    mongoose.model('Problem', problemSchema);
};
