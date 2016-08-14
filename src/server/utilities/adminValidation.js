/*jslint node: true */
'use strict';

module.exports = {
    checkIsAdmin: function (user) {
        if (!user) {
            return false;
        }

        if (user.accessLevel === 'administrator') {
            return true;
        }

        return false;
    }
};
