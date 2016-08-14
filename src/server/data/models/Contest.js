/*jslint node: true */
'use strict';
var mongoose = require('mongoose'),
    requiredMessage = '{PATH} is required',
    Schema = mongoose.Schema;

module.exports.init = function () {
    var contestSchema = mongoose.Schema({
        title: { type: String, required: requiredMessage },
        description: { type: String },
        category: { type: String, required: requiredMessage },
        startDate: { type: Date, required: requiredMessage },
        endDate: { type: Date, required: requiredMessage },
        canPractice: { type: Boolean, required: requiredMessage, default: true },
        isVisible: { type: Boolean, required: requiredMessage, default: false },
        creator: { type: Schema.Types.ObjectID, ref: 'User' },
        problems: [{ type: Schema.Types.ObjectID, ref: 'Problem' }]
    });
    mongoose.model('Contest', contestSchema);
};
