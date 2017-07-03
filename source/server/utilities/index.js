const path = require('path');

module.exports.getViewName = (filename, extra) => {
	// TODO: Make sure this will work with single value for "extra"
	if (!Array.isArray(extra)) {
		throw new Error('Array of path is required');
	}

	extra.unshift(path.basename(filename, '.js'));
	return path.join.apply(null, extra);
};
