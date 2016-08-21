/*jslint node: true */
'use strict';

var path = require('path'),
    rootPath = path.normalize(__dirname + '/../../');

module.exports = {
    development: {
        rootPath: rootPath,
        db: 'mongodb://localhost:27017/lilojs',
        port: process.env.PORT || 3000
    },
    rootPath: rootPath
};
