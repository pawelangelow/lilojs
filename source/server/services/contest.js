'use strict';

const contestData = require('mongoose').model('Contest');

exports.addNewContest = (model, user) => {
	return new Promise((resolve, reject) => {
		//TODO: Model validation

		if (exports.categories.indexOf(model.category) < 0) {
			reject('Invalid category!');
			return;
		}

		model.startDate = new Date(model.startDate);
		model.endDate = new Date(model.endDate);
		model.creator = user;
		model.dateCreated = new Date();

		contestData.create(model)
		.then((result) => {
			resolve(result);
		})
		.catch((err) => {
			reject(err);
		});
	});
};

exports.listContest = (options) => {
	return new Promise((resolve, reject) => {
		if (!options) {
			reject('Error! Options are not provided!');
		}

		const page = options.page || 1;
		const pageSize = options.pageSize || 10;

		contestData
			.find({})
			.sort({
				dateCreated: 'desc'
			})
			.limit(parseInt(pageSize, 10))
			.skip((page - 1) * pageSize)
			.exec()
			.then((result) => {
				resolve(result);
			})
			.catch((err) => {
				reject(err);
			});
	});
};

exports.getContestById = (id) => {
	return new Promise ((resolve, reject) => {
		contestData
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

exports.categories = ['Exam', 'Homework'];
