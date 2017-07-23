'use strict';

const fs = require('fs');
const path = require('path');
const formidable = require('formidable');
const utils = require('../utilities');
const uploadDir = path.join(__dirname, '..', '..', '..', 'resources', 'upload');

utils.createDirSync(uploadDir);

exports.uploadFile = (req) => {
	return new Promise((resolve, reject) => {
		const form = new formidable.IncomingForm();
		let fileName;

		form.multiples = true;
		form.uploadDir = uploadDir;

		form.on('file', function (field, file) {
			fileName = utils.generateRandomId(32) + file.name.match(/\.[^\.]+$/)[0];
			fs.rename(file.path, path.join(form.uploadDir, fileName));
		});

		form.on('error', function (err) {
			reject(err);
		});

		form.on('end', function () {
			console.log(fileName);
			resolve(fileName);
		});
		form.parse(req);
	});
};
