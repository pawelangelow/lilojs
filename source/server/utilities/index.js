const path = require('path');
const fs = require('fs');

module.exports.getViewName = (filename, extra) => {
	// TODO: Make sure this will work with single value for "extra"
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
