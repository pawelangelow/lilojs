/*jslint node: true */
'use strict';

var mongoose = require('mongoose'),
    encryption = require('../../utilities/encryption'),
    requiredMessage = '{PATH} is required',
    defaultAvatar = 'https://ninjageisha.files.wordpress.com/2012/08/ninja-tadaa.jpg';

module.exports.init = function () {
    var userSchema = mongoose.Schema({
        username: { type: String, required: requiredMessage, unique: true },
        salt: String,
        hashPass: String,
        firstName: { type: String, required: requiredMessage},
        lastName: { type: String, required: requiredMessage},
        phoneNumber: String,
        email: { type: String, required: requiredMessage},
        initiatives: [{
            initiative: String,
            season: String
        }],
        avatar: { type: String, 'default': defaultAvatar }
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
