'use strict';

const contestService = require('../services/contest');

exports.priority = 3;

// TODO: Cache
exports.load = (app) => {
	app.use((req,res,next) => {
		res.locals.menuItems = [];
		contestService
			.listContest({pageSize: 15, order: 'desc'})
			.then((contests) => {
				contests.forEach((contest) => {
					res.locals.menuItems.push({
						id: contest._id,
						title: contest.title
					});
				});
				next();
			});
	});
};
