/*jslint node: true */
/*jslint unparam: true*/
/*jslint todo: true */
'use strict';

var express = require("express"),
    router = express.Router(),
    path = require('path'),
    formidable = require('formidable'),
    fs = require('fs'),
    config = require('../config/config');

module.exports = router;

router.post('', function (req, res) {
    var form = new formidable.IncomingForm(),
        fileName;

    form.multiples = true;
    form.uploadDir = path.join(config.rootPath, '/server/resources/uploads');

    form.on('file', function (field, file) {
        fileName = makeid(35) + file.name.match(/\.[^\.]+$/)[0];
        fs.rename(file.path, path.join(form.uploadDir, fileName));
    });

    form.on('error', function (err) {
        console.log('An error has occured: \n' + err);
    });

    form.on('end', function () {
        res.end(fileName);
    });
    form.parse(req);
});

function makeid(length) {
    var text = "",
        possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
        i;

    for (i = 0; i < length; i += 1) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
}
