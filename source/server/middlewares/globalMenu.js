'use strict';

module.exports.priority = 3;

module.exports.load = (app) => {
	app.use((req,res,next) => {
		res.locals.menuItems = [{
			id: 1,
			title: 'Mock menu 1'
		}, {
			id: 2,
			title: 'Mock menu 2'
		}];
		next();
	});
};
