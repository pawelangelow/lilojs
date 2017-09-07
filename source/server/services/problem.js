'use strict';

const path = require('path');

const problemData = require('mongoose').model('Problem');
const contestService = require('./contest');
const utils = require('../utilities');

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

exports.getProblemById = (id) => {
	return new Promise ((resolve, reject) => {
		problemData
			.findById(id)
			.exec()
			.then((result) => {
				resolve(result);
			})
			.reject((err) => {
				reject(err);
			});
	});
};

exports.getAllowedLanguages = () => {
	return new Promise ((resolve, reject) => {
		const runners = [];
		utils.getFilesFromDir(path.join(__dirname, 'executor', 'runners'), file => {
			runners.push(file);
		});

		if (runners.length === 0) {
			reject('There is no runners!');
		}

		resolve(runners);
	});
};
