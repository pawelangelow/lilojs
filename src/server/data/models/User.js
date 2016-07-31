/*jslint node: true */
'use strict';

var mongoose = require('mongoose'),
    encryption = require('../../utilities/encryption'),
    requiredMessage = '{PATH} is required';

module.exports.init = function () {
    var userSchema = mongoose.Schema({
        // Core fields
        username: { type: String, required: requiredMessage, unique: true, minlength: 5, maxlength: 20 },
        salt: String,
        hashPass: String,
        firstName: { type: String, minlength: 3, maxlength: 20, required: requiredMessage},
        lastName: { type: String, minlength: 3, maxlength: 20, required: requiredMessage},
        email: { type: String, set: toLower, unique: true, required: requiredMessage},
        accessLevel: { type: String, default: 'student'},
        // Education fields
        facultyNumber: { type: String, required: requiredMessage, set: toLower, unique: true },
        administrativeGroup: { type: Number, min: 10, max: 1000 },
        currentCourse: {type: Number, min: 1, max: 6 },
        courses: [{
            name: { type: String, required: requiredMessage},
            year: { type: String, required: requiredMessage},
            points: {type: Number, min: 0, max: 100 }
        }]
    });

    userSchema.method({
        authenticate: function (password) {
            if (encryption.generateHashedPassword(this.salt, password) === this.hashPass) {
                return true;
            }
            return false;
        }
    });

    mongoose.model('User', userSchema);
};

function toLower(v) {
    return v.toLowerCase();
}
