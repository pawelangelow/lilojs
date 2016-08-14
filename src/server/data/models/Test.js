/*jslint node: true */
'use strict';
var mongoose = require('mongoose'),
    requiredMessage = '{PATH} is required',
    Schema = mongoose.Schema;

module.exports.init = function () {
    var testSchema = mongoose.Schema({
        title: { type: String },
        input: { type: String },
        inputPath: { type: String },
        output: { type: String },
        outputPath: { type: String },
        problem: { type: Schema.Types.ObjectId, ref: 'Problem'}
    });
    mongoose.model('Test', testSchema);
};
