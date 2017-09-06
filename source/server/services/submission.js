'use strict';

const submissionData = require('mongoose').model('Submission');
const queue = require('mongoose').model('QueueEntry');

exports.addNewSubmission = (model, user) => {
	return new Promise((resolve, reject) => {
		//TODO: Model validation

		model.submiter = user;
		model.submitedOn = new Date();
		model.points = 0;
		model.problem = model.problemId;

		submissionData.create(model)
			.then((result) => {
				resolve(result);
				queue.create({
					submission: result._id,
					priority: 5
				});
			})
			.catch((err) => {
				reject(err);
			});
	});
};

exports.calculateResult = (problemId, userToCheck) => {
	return new Promise((resolve, reject) => {
		if (!userToCheck) {
			resolve(0);
		}

		submissionData
			.find({'submiter': userToCheck})
			.where('problem').equals(problemId)
			.sort({
				points: 'desc'
			})
			.exec()
			.then((result) => {
				if (result.length !== 0) {
					resolve(result[0].points);
				} else {
					resolve(0);
				}
			})
			.catch((err) => {
				reject(err);
			});
	});
};

exports.getSubmissionsByProblemIdAndUserId = (problemId, userId) => {
	return new Promise((resolve, reject) => {
		submissionData
			.find({'problem': problemId})
			.where('submiter').equals(userId)
			.sort({
				submitedOn: 'desc'
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

exports.getSubmissionById = (id) => {
	// TODO: Validation - example who can see this?
	return new Promise ((resolve, reject) => {
		submissionData
			.findById(id)
			.populate('problem')
			.exec()
			.then((result) => {
				resolve(result);
			})
			.reject((err) => {
				reject(err);
			});
	});
};

exports.updateSubmissionPointsById = (id, points) => {
	return new Promise ((resolve, reject) => {
		submissionData
			.findById(id)
			.exec()
			.then((result) => {
				result.points = points;
				result.save();
				resolve(true);
			})
			.reject((err) => {
				reject(err);
			});
	});
};
