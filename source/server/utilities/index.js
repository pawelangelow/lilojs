const path = require('path');
const fs = require('fs');

module.exports.getViewName = (filename, extra) => {
	// TODO: Make sure this will work with single value for "extra"
	// TODO: Add tests
	if (!Array.isArray(extra)) {
		throw new Error('Array of path is required');
	}

	extra.unshift(path.basename(filename, '.js'));
	return path.join.apply(null, extra);
};

module.exports.getTestedModulePath = (testPath) => {
	const actualModule = testPath.replace(`${path.sep}tests${path.sep}`, path.sep);
	return actualModule;
};

module.exports.getFilesFromDir = (dirname, cb) => {
	fs.readdirSync(dirname).forEach(function(file) {
		const fileName = file.split('.')[0];
		if (fileName !== 'index') {
			cb(fileName);
		}
	});
};

module.exports.getBuildVersion = () => {
	const packageFile = require('../../package.json');
	return packageFile.version;
};

module.exports.onlyForLoggedIn = (req, res, next) => {
	if (req.user) {
		next();
	} else {
		res.redirect('/authentication/login');
	}
};

module.exports.onlyForAdmin = (req, res, next) => {
	if (req.user && req.user.access !== 'student') {
		next();
	} else if (req.user && req.user.access === 'student') {
		res.redirect('/');
	} else {
		res.redirect('/authentication/login');
	}
};

exports.generateRandomId = (length) => {
	let text = '';
	const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	let i;

	for (i = 0; i < length; i += 1) {
		text += possible.charAt(Math.floor(Math.random() * possible.length));
	}

	return text;
};

exports.createDirSync = (dirPath) => {
	const sep = path.sep;
	const initDir = path.isAbsolute(dirPath) ? sep : '';
	dirPath.split(sep).reduce((parentDir, childDir) => {
		const curDir = path.resolve(parentDir, childDir);
		if (!fs.existsSync(curDir)) {
			fs.mkdirSync(curDir);
		}

		return curDir;
	}, initDir);
};
