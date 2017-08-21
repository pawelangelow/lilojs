'use strict';

const problemData = require('mongoose').model('Problem');
const contestService = require('../services/contest');

exports.addNewProblem = (model, contestId) => {
	if (!model.descriptionPath) {
		model.descriptionPath = 'empty';
	}

	model.dateCreated = new Date();

	return new Promise((resolve, reject) => {
		//TODO: Model validation
		contestService
			.getContestById(contestId)
			.then((contest) => {
				model.contestType = contest.category;
				model.contest = contest._id;
			})
			.then(() => {
				problemData
					.create(model)
					.then((result) => {
						resolve(result);
					})
					.catch((err) => {
						reject(err);
					});
			});
	});
};

exports.getProblemsByContestId = (id) => {
	return new Promise((resolve, reject) => {
		problemData
			.find({'contest': id})
			.sort({
				dateCreated: 'desc'
			})
			.exec()
			.then((result) => {
				resolve(result);
			})
			.catch((err) => {
				reject(err);
			});
	});
};
